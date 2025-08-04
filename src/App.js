//to get this started, change to directory and run "npm run start"
//stuff that needs to get done: you need to throw error if there is no defined birthday. DONE
//when the birthday is set, you can set the man starsign. then when you have that defined and the day
//you can generate a horoscope.
//also need to catch: if the horoscope is too far in the future, error.
import React from 'react';
import {useState} from 'react';

import SeedRandom from 'seedrandom';

import SentenceData from './HoroscopeSentences.json' with { type: 'json' };
import StarsignData from './Starsigns.json' with { type: 'json' };

import Genie from './Genie.js';

//import InsanoMusic from "./Sound/InsanoMusic";

import Button from '@mui/material/Button';
import DateInput from './DateInput.js';
import GetCurrentDate from './GetCurrentDate.js';

import './App.css';

function App() {
  const minsentences = 4;
  const maxsentences = 8;
  
  const [spindir, setSpindir] = useState('App-logo');

  const makeGenieSpin = () => {
    var tempspindir = Math.random();
    var mynum = tempspindir
    if (tempspindir < 0.5) {
      tempspindir = 'Cw';
    } else {
      tempspindir = 'Ccw';
    }
    setSpindir(mynum+" "+tempspindir);
    
  }

  function returnCurrentDate() {
    const curdate = new Date().toISOString().split("T")[0];
    return(
      curdate
    );
  }

  const [starsign, setStarsignText] = useState();
  const onBirthdayDateChange = (event) => {
    //set the starsign.

    const base = event.target.value
    let day = base.split("-")[2];
    const month = base.split("-")[1];
    const year = base.split("-")[0];
    //check if the year is out of range, if so throw an error.
    //first check the month
    //then check the days
    const datetocheck = date
    const curday  = datetocheck.split("-")[2];
    const curmonth = datetocheck.split("-")[1];
    const curyear = datetocheck.split("-")[0];

    if (year > curyear) {
      alert("Birthday out of range!");
      setStarsignText(undefined);
      return;
    } else if (year === curyear) {
      if (month > curmonth) {
        alert("Birthday out of range!");
        setStarsignText(undefined);
        return;
      } else if (month === curmonth) {
        if (day > curday) {
          setStarsignText(undefined);
          alert("Birthday out of range!");
          return;
        }
      }
    }
    
    console.log(month)

    day = Number(day)

    //dates for starsigns:
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

    switch (month) {
      case "01":
        if (day < 20) {
          setStarsignText("Whiskey");
          break;
        } else {
          setStarsignText("Steak");
          break;
        }
      case "02":
        if (day < 19) {
          setStarsignText("Steak");
          break;
        } else {
          setStarsignText("Beer");
          break;
        }
      case "03":
        if (day < 21) {
          setStarsignText("Beer");
          break;
        } else {
          setStarsignText("Gun");
          break;
        }
      case "04":
        if (day < 20) {
          setStarsignText("Gun");
          break;
        } else {
          setStarsignText("Bicep");
          break;
        }
      case "05":
        if (day < 21) {
          setStarsignText("Bicep");
          break;
        } else {
          setStarsignText("Babe");
          break;
        }
      case "06":
        if (day < 21) {
          setStarsignText("Babe");
          break;
        } else {
          setStarsignText("Truck");
          break;
        }
      case "07":
        if (day < 23) {
          setStarsignText("Truck");
          break;
        } else {
          setStarsignText("Grill");
          break;
        }
      case "08":
        if (day < 23) {
          setStarsignText("Grill");
          break;
        } else {
          setStarsignText("Burger");
          break;
        }
      case "09":
        if (day < 23) {
          setStarsignText("Burger");
          break;
        } else {
          setStarsignText("Money");
          break;
        }
      case "10":
        if (day < 23) {
          setStarsignText("Money");
          break;
        } else {
          setStarsignText("Tire Iron");
          break;
        }
      case "11":
        if (day < 22) {
          setStarsignText("Tire Iron");
          break;
        } else {
          setStarsignText("Beard");
          break;
        }
      case "12":
        if (day < 22) {
          setStarsignText("Beard");
          break;
        } else {
          setStarsignText("Whiskey");
          break;
        }
    }
      //const date = new Date()
      //const today = Intl.DateTimeFormat("en-US").format(date)

      //console.log(day + "-" + month);
  }
  
  const [date, setDateText] = useState(returnCurrentDate());
  const onHoroscopeDateChange = (event) => {
    const date = event.target.value;
    setDateText(date);
  }

  const [horoscope, setHoroscope] = React.useState("Your horoscope awaits...");
	const myOnClick = () => {
    generateHoroscope();
    makeGenieSpin();
  
  function generateHoroscope() {{
    const horoscopeString = () => {

      if (starsign === undefined) {
        alert("Please input your birthday!")
        return (
          "Your horoscope awaits..."
        );
      }

      const datestr = date.toString();
      const rng = SeedRandom(datestr+starsign)();

      var rawnumsentences = Math.trunc((rng*10));

      var paragraph = "";
      
      if (rawnumsentences < minsentences) {
        rawnumsentences = minsentences;
      }
      else if (rawnumsentences > maxsentences) {
        rawnumsentences = maxsentences;
      }
      
      var randint = SeedRandom(datestr+starsign);//consider simplifying and just using rng for everything instead of randint.
      var sentencelistsize = SentenceData.length;
      
      //need to make a deep copy in order to make this reproducible--otherwise every time you call, you shuffle a potentially already shuffled array!
      var shufflearray = SentenceData.slice();

      //standard shuffling algorithm (durstenfield shuffle using the new es6/ecmascript 2015 formatting).
      //see here: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      for (let i = sentencelistsize - 1; i > 0; i--) {
        var j = Math.floor(randint() * (i + 1));
        [shufflearray[i], shufflearray[j]] = [shufflearray[j], shufflearray[i]];
      }

      for(let sentencebyid = 0; sentencebyid < rawnumsentences; sentencebyid++) {
        var cursentence = shufflearray[sentencebyid];
        if (typeof(cursentence) === 'string') {

          //do nothing.
        } else {

          var sentencekeys = Object.entries(cursentence[1]);
          var numvarstoreplace = sentencekeys.length;

          var outsentence = cursentence[0];

          for(let sentencevarbyid = 0; sentencevarbyid < numvarstoreplace; sentencevarbyid++) {
            
            var sentencevars = sentencekeys[sentencevarbyid][1];
            var sentencevarmaxnum = sentencevars.length;

            var sentencevarindex=Math.abs(randint.int32()) % sentencevarmaxnum;

            outsentence = outsentence.replaceAll(sentencekeys[sentencevarbyid][0], sentencekeys[sentencevarbyid][1][sentencevarindex]);
          }
          cursentence = outsentence;
        }
        paragraph = paragraph + cursentence + " ";
      }

    return(paragraph);
    
    }

    setHoroscope(horoscopeString());
  
  }}
  
  }

  return (
    <div className="App">
      <header className="App-header"><i><strong>FINALLY!</strong></i> A HOROSCOPE... <i>FOR MEN!</i>
        <Genie key={spindir} spindir={spindir}/>
        
        <p style={{zIndex:3, color:'red'}}>
        {horoscope}
        </p>

        <p>
        Your starsign is: {starsign}
        </p>
        <p>{StarsignData[starsign]}</p>

        <p>
        (The current date is:&nbsp;<GetCurrentDate/>)
        </p>
        
        <Button variant="contained" onClick={myOnClick}>
        Submit... to&nbsp;<i>men</i>...
        </Button>
      <small>Your Birthday</small>
      <DateInput onMyChange={onBirthdayDateChange}/>
      <small>Horoscope Date</small>
      <DateInput onMyChange={onHoroscopeDateChange} date={date}/>
      </header>
    </div>
  );
}

export default App;
