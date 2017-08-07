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

app.post('/api/top', (req, res) => {
  Top.find({}, (err, top) => {
    if(err){
      console.error(err)
    } else {
      top.sort((a, b) => {
        return b.count - a.count
      })
      res.json({
        top: top
      })
    }
  })
})
app.post('/api/members', (req, res) => {
  var group = req.body.group.toLowerCase();
  nb.search('artist', {artist: group}, function(err, response){
    if(response.artists.length > 0){
      var mbid = response.artists[0].id;
      nb.artist(mbid, {inc:'artist-rels'}, function(err, response){
        if(response.type === 'Person') {
          var person =[]
          var members = []
          bing.list({
            keyword: group,
            num: 1
          })
          .then((image) => {            
            person.push({
              name: response.name,
              begin: response['life-span'].begin,
              end: response['life-span'].end,
              instrument: [response.disambiguation],
              image: image[0].url ? image[0].url : null
            })
            if(response['life-span'].ended){
              members.push([], person)
            } else {
              members.push(person, [])
            }
            res.json(members)
          })
        } else if(response.relations.length > 0){
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
              var obj = {
                name: name,
                begin: rel.begin,
                end: rel.end,
                instrument: rel.attributes,
                image: image[0].url ? image[0].url : null
              }
              if(rel.type === 'member of band'){
                if(rel.ended){
                  pastMembers.push(obj)
                } else if(!response['life-span'].ended) {
                  currentMembers.push(obj)
                } else if(response['life-span'].ended && rel.type){
                  pastMembers.push(obj)
                }
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
        } else {
          res.json({error: 'Couldn\'t find the members of ' + group})
        }
      })
    } else {
      res.json({error: 'Couldn\'t find the members of ' + group})
    }
  });
  if(group){
    Top.find({}, (err, result) => {
      if(result.length < 1000){
        Top.findOne({group: group}, (err, top) => {
          if(err){
            console.error(err)
          } else if(!top) {
            var newTop = new Top({
              group: group,
              count: 1,
              created: Date.now()
            })
            newTop.save()
          } else if(top){
            top.count += 1
            top.save()
          }
        })
      }
    })
  }
})

app.listen(process.env.PORT || 8181, process.env.IP, function(){
	console.log('Server running')
});