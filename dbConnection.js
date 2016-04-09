var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});