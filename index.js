const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const apiProxy = httpProxy.createProxyServer();
const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Colossal Backend is listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, './public')));  

const Reservations = 'http://18.222.48.218';
const Reviews = 'http://18.220.138.231:3000';
// const Carousel = 'http://localhost:5000';


// Reservations
app.all('/reservations', (req, res) => {
  console.log('redirecting to Reservations Server');
  apiProxy.web(req, res, { target: Reservations });
});

app.all('/reservations/:restaurantId/:partySize', (req, res) => {
    console.log('redirecting to Reservations Server');
    apiProxy.web(req, res, { target: Reservations });
});

// Reviews
app.all('/restaurants/:restaurantId/reviews', (req, res) => {
  console.log('redirecting to server 2');
  apiProxy.web(req, res, { target: Reviews });
});
