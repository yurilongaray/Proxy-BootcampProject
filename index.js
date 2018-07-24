const express = require('express')
const path = require('path')
const request = require('request')
const PORT = process.env.PORT || 5000

const app = express()

app.use(function(_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app
  .get('/events', (req, res) => {
    const URL = 'https://api.meetup.com/find/upcoming_events'

    request.get({ url: URL, qs: req.query, json: true }, (err, _, body) => {
      err ? res.json(err) : res.json(body)
    })
  })

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
