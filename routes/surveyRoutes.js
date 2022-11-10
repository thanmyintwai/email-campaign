
const _ = require('lodash');
const { Path } = require('path-parser');
//url involves in NodeJS
const { URL } = require('url')
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) =>{

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
      });

    app.post('/api/surveys/webhook', (req, res)=>{
        //console.log(req.body)
        //res.send({})
        //const events = _.map(req.body, (event) =>{
        /* const events = _.map(req.body, ({email, url}) =>{
            //const pathname = new URL(event.url).pathname
            const pathname = new URL(url).pathname
            const p = new Path('/api/surveys/:surveyId/:choice');
            //console.log(p.test(pathname))
            //either object or null (if there is no match)
            const match = p.test(pathname)
            //only match is not null
            if(match){
                //return match //{ surveyId: '6340c220258ccb322d8f1428', choice: 'yes' }
                //return { email: event.email, ...match }
                return { email, ...match }
            }
        })
        //remove undefined element from an array 
        const compactEvents = _.compact(events)
        //remove duplicate element which has similar email and suveryId
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')
        console.log(uniqueEvents) */
        //-------------------------------------------
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
            {
                _id: surveyId,
                recipients: {
                $elemMatch: { email: email, responded: false }
                }
            },
            {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }
            ).exec();
        })
        .value();
            res.send({})

    })
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res)=>{
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            //seperated by comma and space
            recipients: recipients.split(',').map(email => (
                    { email: email.trim() }
                )),
            _user: req.user.id,
            dateSent: Date.now()
          });
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{

            await mailer.send()
            //update the survey model
            await survey.save()
            req.user.credits -= 1;
            //update the user model
            const user = await req.user.save()

            res.send(user)

        } catch(error){
            res.status(402).send(error)
        }



    })

    app.get('/api/surveys', requireLogin, async (req, res) => {
        //we don't need list of recipients
        const surveys = await Survey.find({ _user: req.user.id }).select({
          recipients: false
        });
    
        res.send(surveys);
      });

}