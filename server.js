var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var jugador = fs.readFileSync('./leaderboard.json');
var jsonString = JSON.parse(jugador);

app.get('/users/:id', function(req,res){
var id = req.params.id;
 for (var i = 0; i < jsonString.length; i++) {
   if(id == jsonString[i].id){
     var stats = {
       "name": jsonString[i].name,
       "score":jsonString[i].score
     };
       res.send(JSON.stringify(stats));

   }
 }

});

var newscore;
app.post('/users/:id', function(req,res){
  var id = req.params.id;
  newscore = req.body.score;
  var newjson= jsonString;

  for (var i = 0; i < jsonString.length; i++) {
    if(id == jsonString[i].id){
      newjson[i].score = newscore;
    }
   }
   fs.writeFileSync('leaderboard.json', JSON.stringify(newjson));
   res.send("el nuevo puntaje fue salvado");
});

app.get('/leaderboard/:id', function(req,res){
   var id = req.params.id;
   for (var i = 0; i < jsonString.length; i++) {
     if(id == jsonString[i].id){
       var position={
         "position":jsonString[i].position
       }

         res.send(JSON.stringify(position));
     }
   }

});

app.get('/leaderboard', function (req, res){
  var pageSize = req.query.pageSize;
  var page = req.query.page;
  if(pageSize == 1){
  res.send(jsonString);
  }
if(pageSize ==2 && page ==1){
    res.send(JSON.stringify(jsonString[0]) + " " + JSON.stringify(jsonString[1])+ " " + JSON.stringify(jsonString[3]))
  }else {
    if(pageSize ==2 && page == 2){
      res.send(JSON.stringify(jsonString[3])+ " " + JSON.stringify(jsonString[4]));
    }
  }
  if(pageSize > 2){
    res.send("No hay mas jugadores")
  }
});
app.listen(process.env.PORT||3000, function(){

});
