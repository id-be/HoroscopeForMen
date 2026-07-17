import { generateHoroscope, getCurrentDate} from "./src/utils.js";
import { BskyAgent, RichText } from '@atproto/api';
import { CronJob } from 'cron';
import * as process from 'process';
import { setTimeout } from 'node:timers/promises';

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
})

var starDateRanges = {
    "Steak": "January 20 – February 18",
    "Beer": "February 19 – March 20",
    "Gun": "March 21 – April 19",
    "Bicep": "April 20 – May 20",
    "Babe": "May 21 – June 20",
    "Truck": "June 21 – July 22",
    "Grill": "July 23 – August 22",
    "Burger": "August 23 – September 22",
    "Money": "September 23 – October 22",
    "Tire Iron": "October 23 – November 21",
    "Beard": "November 22 – December 21",
    "Whiskey": "December 22 – January 19",
}

await agent.login({ identifier: process.env.BLUESKY_USERNAME, password: process.env.BLUESKY_PASSWORD});

async function main() {
    for(const starsign in starDateRanges){
        const horoscope = `Sign of the ${starsign} (${starDateRanges[starsign]})\n\n${generateHoroscope(starsign, getCurrentDate())}\n\n#horoscope`.substring(0, 300);
        const rt = new RichText({text: horoscope});
        await rt.detectFacets(agent); 
        await agent.post({
            $type: 'app.bsky.feed.post',
            text: rt.text,
            facets: rt.facets,
            createdAt: new Date().toISOString(),
        });
        await setTimeout(30 * 60 * 1000);
    }
}

// Run this on a cron job
// const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
// const scheduleExpression = '0 8 * * *'; // Run once every three hours in prod

// const job = new CronJob(scheduleExpression, main);

// job.start();

main();