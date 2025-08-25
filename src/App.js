import React, { useCallback } from 'react';
import { useState } from 'react';

import SeedRandom from 'seedrandom';

import SentenceData from './HoroscopeSentences.json' with { type: 'json' };
import StarsignData from './Starsigns.json' with { type: 'json' };

import Genie from './Genie.js';

import GetCurrentDate from './GetCurrentDate.js';

import DEFAULT_BACKGROUND from "./Images/SignBlank.webp";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './App.css';

const MIN_SENTENCES = 4;
const MAX_SENTENCES = 8;

const DEFAULT_HOROSCOPE = "Your horoscope awaits...";
const DEFAULT_PREPEND_STARSIGN = "Your starsign is: ";
const DEFAULT_STARSIGN = "unclear...";

const getCurrentDate = () => {
  const curdate = new Date().toISOString().split("T")[0];
  return (
    curdate
  );
}

function App() {

  const [spindir, setSpindir] = useState('App-logo');
  const [starsign, setStarsignText] = useState(DEFAULT_STARSIGN);
  const [horoscope, setHoroscope] = React.useState(DEFAULT_HOROSCOPE);
  const [starsignpic, setStarsignPic] = React.useState(null);
  const [starsignoverlaypic, setStarsignOverlayPic] = React.useState(null);

  const makeGenieSpin = useCallback(() => {
    var tempspindir = Math.random();
    var mynum = tempspindir;
    if (tempspindir < 0.5) {
      tempspindir = 'Cw';
    } else {
      tempspindir = 'Ccw';
    }
    setSpindir(tempspindir);

  }, [setSpindir]);

  const changeStarsignImage = useCallback((cursign) => {
    const local_path = "HoroscopeForMen/Images/"
    const out_name = local_path+cursign+"Sign.webp";
    const out_overlay_name = local_path+cursign+"SignStars.webp"
    setStarsignPic(out_name);
    setStarsignOverlayPic(out_overlay_name);
  }, )

  const myOnClick = useCallback((cursign) => {
    const generateHoroscope = () => {

        const datestr = getCurrentDate().toString();

        const rng = SeedRandom(datestr + cursign);

        var paragraph = "";

        const rawnumsentences = Math.trunc(rng() * (MAX_SENTENCES - MIN_SENTENCES) + MIN_SENTENCES);

        var randint = SeedRandom(datestr + cursign);

        var shufflearray = SentenceData.slice();

        //standard shuffling algorithm (durstenfield shuffle using the new es6/ecmascript 2015 formatting).
        //see here: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        
        for (let i = SentenceData.length - 1; i > 0; i--) {
          var j = Math.floor(randint() * (i + 1));
          [shufflearray[i], shufflearray[j]] = [shufflearray[j], shufflearray[i]];
        }

        for (let sentencebyid = 0; sentencebyid < rawnumsentences; sentencebyid++) {
          var cursentence = shufflearray[sentencebyid];
          if (typeof (cursentence) === 'string') {
            //do nothing.
          } else {

            var sentencekeys = Object.entries(cursentence[1]);
            var numvarstoreplace = sentencekeys.length;

            var outsentence = cursentence[0];

            for (let sentencevarbyid = 0; sentencevarbyid < numvarstoreplace; sentencevarbyid++) {

              var sentencevars = sentencekeys[sentencevarbyid][1];
              var sentencevarmaxnum = sentencevars.length;

              var sentencevarindex = Math.abs(randint.int32()) % sentencevarmaxnum;

              outsentence = outsentence.replaceAll(sentencekeys[sentencevarbyid][0], sentencekeys[sentencevarbyid][1][sentencevarindex]);
            }
            cursentence = outsentence;
          }
          paragraph = paragraph + cursentence + " ";

        setHoroscope(paragraph);
      }
    }

    generateHoroscope();
    makeGenieSpin();

  });

  const onBirthdayDateChange = useCallback((value) => {
    const month = value.format('MM');
    var day = value.format('DD');

    day = parseInt(day);

    // starsigns:
    // Steak, Beer, Gun, 
    // Bicep, Bikini Babe, Truck, 
    // Grill, Burger, Money,
    // Tire Iron, Beard, Whiskey

    // Aquarius ♒️: (January 20 – February 18)==steak
    // Pisces ♓️: (February 19 – March 20)==beer
    // Aries ♈️: (March 21 – April 19)==gun
    // Taurus ♉️: (April 20 – May 20)==bicep
    // Gemini ♊️: (May 21 – June 20)==bikini babe
    // Cancer ♋️: (June 21 – July 22)==truck
    // Leo ♌️: (July 23 – August 22)==grill
    // Virgo ♍️: (August 23 – September 22)==burger
    // Libra ♎️: (September 23 – October 22)==money
    // Scorpio ♏️: (October 23 – November 21)==tire iron
    // Sagittarius ♐️: (November 22 – December 21)==beard
    // Capricorn ♑️: (December 22 – January 19)==whiskey
//there's an even better way to do this: you can cast the month to a number and use the index on an array.
    const starSigns = {
    "01": (day) => day < 20 ? "Whiskey" : "Steak",
    "02": (day) => day < 19 ? "Steak" : "Beer",
    "03": (day) => day < 21 ? "Beer" : "Gun",
    "04": (day) => day < 20 ? "Gun" : "Bicep",
    "05": (day) => day < 21 ? "Bicep" : "Babe",
    "06": (day) => day < 21 ? "Babe" : "Truck",
    "07": (day) => day < 23 ? "Truck" : "Grill",
    "08": (day) => day < 23 ? "Grill" : "Burger",
    "09": (day) => day < 23 ? "Burger" : "Money",
    "10": (day) => day < 23 ? "Money" : "Tire Iron",
    "11": (day) => day < 22 ? "Tire Iron" : "Beard",
    "12": (day) => day < 22 ? "Beard" : "Whiskey",
    };
    const starSignGetter = starSigns[month];
    if(starSignGetter) {
       const starSign = starSignGetter(day);
       setStarsignText(starSign);
       changeStarsignImage(starSign);
       myOnClick(starSign);
    }
    else {
      console.error("ERROR: month = " + toString(month) + ", day = " + toString(day));
    }
  }, [setStarsignText, changeStarsignImage, myOnClick]);

  return (
  <div className="Body" style={{backgroundImage: "url(" + DEFAULT_BACKGROUND + ")"}}>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div className="App">
      <header className="App-header"><i><strong>FINALLY!</strong></i> A HOROSCOPE... <i>FOR MEN!</i>
        <Genie key={spindir} spindir={spindir}/>

        <img alt='Your starsign: ' className="UnderlayStarsignImage" src={starsignpic}></img>
        <img alt ='Starsign blurred' className="OverlayStarsignImage" src={starsignoverlaypic}></img>

        <p>
          (The current date is:&nbsp;<GetCurrentDate />)
        </p>

        <p>
          {horoscope}
        </p>

        <p>
          {DEFAULT_PREPEND_STARSIGN}{starsign}
        </p>
        <p>{StarsignData[starsign]}</p>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{
              calendarHeader: {
                format: 'MMMM'
              },}}
          defaultValue={dayjs('2000-01-01')}
          openTo='month' format = "M/D" color='primary' label="Please Enter Your Birthday." views={['month', 'day']} onAccept={(value) => onBirthdayDateChange(value)} />
        </LocalizationProvider>

      </header>
    </div>
  </div>
  );
}

export default App;