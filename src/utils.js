
import SentenceData from './HoroscopeSentences.json' with { type: 'json' };
import StarsignData from './Starsigns.json' with { type: 'json' };

import SeedRandom from 'seedrandom';

export const DEFAULT_STARSIGN = "Your Starsign is unclear...";

const MIN_SENTENCES = 2;
const MAX_SENTENCES = 4;

export const getCurrentDate = () => {
  const curdate = new Date().toISOString().split("T")[0];
  return (
    curdate
  );
}

export const generateHoroscope = (starsignParam, date) => {
  if (starsignParam === DEFAULT_STARSIGN) {
    alert("Please input your birthday!");
    return (
      DEFAULT_HOROSCOPE
    );
  }

  const datestr = date.toString();
  const rng = SeedRandom(datestr + starsignParam);

  var paragraph = "";

  const rawnumsentences = Math.trunc(rng() * (MAX_SENTENCES - MIN_SENTENCES) + MIN_SENTENCES);

  var randint = SeedRandom(datestr + starsignParam);//consider simplifying and just using rng for everything instead of randint.

  //need to make a deep copy in order to make this reproducible--otherwise every time you call, you shuffle a potentially already shuffled array!
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
  }

  return paragraph;

}