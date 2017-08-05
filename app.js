const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      Top = require('./models/top'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      Scraper = require ('images-scraper'),
      NB = require('nodebrainz'),
      nb = new NB({userAgent:'my-awesome-app/0.0.1 ( http://my-awesome-app.com )'}),
      bing = new Scraper.Bing();

mongoose.connect(process.env.MONGO);
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/members', (req, res) => {
  var group = req.body.group.toLowerCase();
  nb.search('artist', {artist: group}, function(err, response){
    if(response.artists.length > 0){
      var mbid = response.artists[0].id;
      nb.artist(mbid, {inc:'artist-rels'}, function(err, response){
        if(response.type === 'Person'){
            nb.artist(mbid, {inc:'url-rels'}, function(err, response){
            if(response.relations){
              var links = []
              response.relations.forEach((link) => {
                if(link.type === 'bandcamp' || link.type === 'social network' || link.type === 'wikipedia'){
                  links.push(link.url.resource)
                }
              })
            }
            bing.list({
              keyword: group,
              num: 1
            })
            .then((image) => {
              res.json([
                {
                  person: true,
                  name: response.name,
                  image: image[0].url,
                  born: response['life-span'].begin,
                  country: response.country,
                  area: response.begin_area.name,
                  gender: response.gender,
                  links: links,
                  instrument: []
                }
              ])
            })
          })
        } else {
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
              } else if(!response['life-span'].ended) {
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
        }
      })
    } else {
      res.json({error: 'Couldn\'t find the members of ' + group})
    }
  });
  Top.find({}, (err, result) => {
    if(result.length < 1000){
      Top.findOne({group: group}, (err, top) => {
        if(err){
          console.error(err)
        } else if(!top) {
          var newTop = new Top({
            group: group,
            count: 1
          })
          newTop.save()
        } else if(top){
          top.count += 1
          top.save()
        }
      })
    }
  })
})

app.listen(process.env.PORT || 8181, process.env.IP, function(){
	console.log('Server running')
});