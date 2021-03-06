const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
var PORT = 8080

app = express();
app.use(serveStatic(path.join(__dirname,'dist')));

app.listen(process.env.PORT || PORT);