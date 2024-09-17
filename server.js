const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(bodyParser.json());

app.post('/api/create-payment-intent', async (req, res) => {
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

app.listen(3001, () => { // Make sure this port is not conflicting
  console.log('Server is running on port 3001');
});
