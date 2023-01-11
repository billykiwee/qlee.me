const express = require('express');
const app = express();

app.get('/secret', async (req, res) => {
  const intent = // ... Fetch or create the PaymentIntent
  res.json({client_secret: intent.client_secret});
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});

(async () => {
    const response = await fetch('/secret');
    const {client_secret: clientSecret} = await response.json();
    // Render the form using the clientSecret
  })();