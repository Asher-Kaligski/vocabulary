const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(__dirname + '/dist/vocabulary'));
 
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/dist/vocabulary/index.html'));
})


app.listen(process.env.PORT || 8080);
