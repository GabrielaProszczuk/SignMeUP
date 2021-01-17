const express = require('epress');
const path = require('path');
const app = express();
app.use(express.static(_dirname + '/disc/sign-me-up/'));
app.get('/*', function(req, res){
    res.sendFile(path.join(_dirname+
        '/dist/sign-me-up/index.html'));});
app.listen(process.env.PORT || 8080);