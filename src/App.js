import React, { useCallback } from 'react';
import { useState } from 'react';

import SentenceData from './HoroscopeSentences.json' with { type: 'json' };
import StarsignData from './Starsigns.json' with { type: 'json' };

import Genie from './Genie.js';

import Button from '@mui/material/Button';
import DateInput from './DateInput.js';
import GetCurrentDate from './GetCurrentDate.js';
import { getCurrentDate } from "./utils.js";

import {DEFAULT_STARSIGN} from "./utils.js";

import './App.css';

const DEFAULT_HOROSCOPE = "Your horoscope awaits...";
const DEFAULT_PREPEND_STARSIGN = "Your starsign is: ";

function App() {

  const [spindir, setSpindir] = useState('App-logo');
  const [date, setDateText] = useState(getCurrentDate());
  const [starsign, setStarsignText] = useState(DEFAULT_STARSIGN);
  const [horoscope, setHoroscope] = React.useState(DEFAULT_HOROSCOPE);

  const makeGenieSpin = useCallback(() => {
    var tempspindir = Math.random();
    var mynum = tempspindir;
    if (tempspindir < 0.5) {
      tempspindir = 'Cw';
    } else {
      tempspindir = 'Ccw';
    }
    setSpindir(mynum + " " + tempspindir);

  }, [setSpindir]);

  const onBirthdayDateChange = useCallback((event) => {
    const base = event.target.value;
    var [year, month, day] = base.split("-");
    const datetocheck = date;
    const base_as_date = new Date(base);
    const date_to_check_as_date = new Date(datetocheck);

    if (base_as_date > date_to_check_as_date) {
      setHoroscope(DEFAULT_HOROSCOPE);
      setStarsignText(DEFAULT_STARSIGN);
      alert("Birthday out of range!");
      
      return;
    }

    day = Number.parseInt(day);

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
    "12": (day) => day < 22 ? "Beard" : "Whisky",
    };
    const starSignGetter = starSigns[month];
    if(starSignGetter) {
       const starSign = starSignGetter(day);
       setStarsignText(starSign);
    }
    else {
      console.error("ERROR: month = " + toString(month) + ", day = " + toString(day));
    }
  }, [date, setStarsignText]);

  const onHoroscopeDateChange = useCallback((event) => {
    const cur_set_date = event.target.value;
    setDateText(cur_set_date);
  }, [setDateText]);


  const myOnClick = useCallback(() => {
    setHoroscope(generateHoroscope(starsign, date));
    makeGenieSpin();

  }, [date, makeGenieSpin, starsign]);

  return (
    <div className="App">
      <header className="App-header"><i><strong>FINALLY!</strong></i> A HOROSCOPE... <i>FOR MEN!</i>
        <Genie key={spindir} spindir={spindir} />

        <p style={{ zIndex: 3, color: 'red' }}>
          {horoscope}
        </p>

        <p>
          {starsign}
        </p>
        <p>{StarsignData[starsign]}</p>

        <p>
          (The current date is:&nbsp;<GetCurrentDate />)
        </p>

        <Button variant="contained" onClick={myOnClick}>
          Submit... to&nbsp;<i>men</i>...
        </Button>
        <small>Your Birthday</small>
        <DateInput onChange={onBirthdayDateChange} />
        <small>Horoscope Date</small>
        <DateInput onChange={onHoroscopeDateChange} date={date} />
      </header>
    </div>
  );
}

export default App;