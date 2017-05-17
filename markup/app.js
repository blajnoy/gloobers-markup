var express = require('express');
var path = require('path');
var testData = require('./jsons/myfile')
var app = express();
app.use(express.static('./public'));



app.post('/test', function(req, res) {
    res.send(testData);
});

app.use(function(req, res) {   
    res.sendFile(path.join(__dirname + `/public${req.path}.html`));
})



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});