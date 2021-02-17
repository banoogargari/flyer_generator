const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.use(cors());

app.get('/event', async (request, response) => {
    const url = request.query.url;

    if (url) {

        let data = await fetch(url)
        .then(r => r.text())
        .then(html => {
            
            let $ = cheerio.load(html);
            
            let title = $('meta[property="og:title"]').attr('content');
            let image = $('meta[property="og:image"]').attr('content');
            
            let start_datetime = $('meta[property="event:start_time"]').attr('content');
            let start_datetime_parts = start_datetime.split('T');
            let start_date = start_datetime_parts[0];
            let start_time = start_datetime_parts[1];
            start_time = start_time.replace('+00:00', '');

            let end_datetime = $('meta[property="event:end_time"]').attr('content');
            let end_datetime_parts = end_datetime.split('T');
            let end_date = end_datetime_parts[0];
            let end_time = end_datetime_parts[1];
            end_time = end_time.replace('+00:00', '');

            return {
                title,
                image,
                start_date,
                start_time,
                end_date,
                end_time
            };
        });
        response.send(data);
        
    } else {
        
        response.send(null);

    }
});

app.listen(port, () => {
    let url = 'https://eventbrite.co.uk/e/131463864959';
    console.log(`Listening at http://lvh.me:3000 or http://localhost:${port}`);
    console.log(`Sample Usages:`);
    console.log(`http://lvh.me:3000/event?url=${url}`);
});
