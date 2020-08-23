var aiml = require('aiml')
var express = require('express');
var engine;
var app = express();
app.use(express.static(__dirname + '/public'));

var filenames = ['aimls/hindi.aiml'];

aiml.parseFiles(filenames, function (err, topics) {
  engine = new aiml.AiEngine('Default', topics, {
    name: 'Buddy'
  });
});

app.get('/query/:id', function (req, res) {
  console.log(req.params.id);
  var response = engine.reply({
    name: 'You'
  }, req.params.id, function (err, response) {
    console.log(response);
    res.send(response);
  });
});

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

var port = 3000;
server = app.listen(port);
console.log('Server listening on port 3000 in %s mode', app.settings.env);