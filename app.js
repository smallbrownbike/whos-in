const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      Scraper = require ('images-scraper'),
      NB = require('nodebrainz'),
      nb = new NB({userAgent:'my-awesome-app/0.0.1 ( http://my-awesome-app.com )'}),
      bing = new Scraper.Bing();






app.use(cors())
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/members', (req, res) => {
  var group = req.body.group;
  nb.search('artist', {artist: group}, function(err, response){
    nb.artist(response.artists[0].id, {inc:'artist-rels'}, function(err, response){
      var currentMembers = []
      var pastMembers = []
      var members = []
      var count = 0;
      response.relations.forEach((rel) => {
        var name = rel.artist.name;
        bing.list({
          keyword: name + ' ' + group,
          num: 1
        })
        .then((image) => {
          if(rel.ended){
            pastMembers.push({
              name: name,
              begin: rel.begin,
              end: rel.end,
              instrument: rel.attributes,
              image: image[0].url ? image[0].url : null
            })
          } else {
            currentMembers.push({
              name: name,
              begin: rel.begin,
              end: rel.end,
              instrument: rel.attributes,
              image: image[0].url ? image[0].url : null
            })
          }
          count += 1;
          if(count === response.relations.length){
            members.push(currentMembers, pastMembers)
            res.json(members)
          }
        }).catch((err) => {
            console.log('err',err);
        })
      })
    })
  });
})

app.listen(process.env.PORT || 8181, process.env.IP, function(){
	console.log('Server running')
});