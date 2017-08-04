const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      Scraper = require ('images-scraper'),
      google = new Scraper.Google();

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/image', (req, res) => {
  console.log(req.body)
})

app.listen(process.env.PORT || 8181, process.env.IP, function(){
	console.log('Server running')
});