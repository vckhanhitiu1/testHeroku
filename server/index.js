const express = require('express');
const passport = require('passport');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/key');
require('./models/User'); // the require model must be put befor passport service define because the models is used inside the service.
require('./services/passport');

mongoose.connect(keys.mongoURI)
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    res.send({
        hi: 'there'
    });
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 5000;
app.listen(PORT);