const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors())

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/forgot-password-update', async (req, res) => {
  try {
    const { newpasshash } = req.body;
    if (!newpasshash) 
      return res.status(400).send('Hash is undefined');

    //console.log(`Hash updated pass backend: ${newpasshash}`);
    return res.status(200).json({message: 'Hash updated pass backend: ', hash: `${newpasshash}` })

  }
  catch(error) {
    return res.status(500).json({message: "Error updating password backend", error: error.message});
  }
});

app.listen(3001, () => { // Make sure this port is not conflicting
  console.log('Server is running on port 3001');
});
