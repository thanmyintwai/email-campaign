const passport = require('passport')
const keys = require('../config/keys')
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    //amount is in cent --> 500 means 5 dollar
    app.post('/api/stripe',requireLogin, async (req, res) => {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
      });

      //console.log(charge)
      //updaing to the user model 
      //can access user model in req thanks to passport 
      req.user.credits += 5;
      //actually save into the model or DB 
      const user = await req.user.save();
  
      res.send(user);
    });
  };