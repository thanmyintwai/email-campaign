const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const billingRoutes = require('./routes/billingRoutes')
const keys = require('./config/keys');
const session = require('express-session')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./services/passport')

mongoose.connect(keys.mongoURI)
const app = express()



app.use(bodyParser.json())

//
/* app.use(
    session({
      secret: keys.cookieKey,
      resave: true,
      cookie: {maxAge: 30 * 24 * 60 * 60 * 1000},
      name: 'emily.sessionID'
    })
  ); */

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

//let's tell passport to use cookie as authentication
//check if req.session.passport.user exists, if it does it will call the passport session
app.use(passport.initialize())
app.use(passport.session())

/* passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},(accessToken, refreshToken, profile, done) =>{
    console.log('access token', accessToken)
    console.log('profile', profile)
})
) */

app.get('/', (req, res)=>{
    res.send({'bye':  'tady'})
})

//const authRoutes = require('./routes/authRoutes')
//authRoutes(app)
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if(process.env.NODE_ENV === 'production'){
   // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'))

  //Express will server up the index.html file
  //if it doens't recognise the route (like /api/sruvey)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}

const PORT = process.env.PORT || 5000
app.listen(PORT)