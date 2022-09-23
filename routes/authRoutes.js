const passport = require('passport')
const keys = require('../config/keys')

module.exports = (app) =>{

    app.get('/auth/google',passport.authenticate('google',  {
          scope: ['profile', 'email'],
          /* session: false */
        })
      );

    app.get('/auth/google/callback', passport.authenticate('google', /* {session: false} */), (req, res)=>{
        //console.log('google callback is called')
        res.redirect('/api/current_user')
        //res.send('ok')
    })

    app.get('/api/logout', (req, res, next)=>{
      req.logout((err)=>{
        if(err) { return next(err)}
        res.redirect('/')
      });
      //res.redirect('/')
    })
    
    app.get('/api/current_user',(req, res)=>{
      if(!req.user){
        res.send("Please login")
      }
      //data extracted from cookie
      //res.send(res.session)
      res.send(req.user)
    })



}