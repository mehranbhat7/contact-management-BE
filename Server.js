const express = require('express');
const app = express();
const env = require('dotenv').config();
const cors = require('cors');
const router = require('./routes/contactRoutes');
const router2 = require('./routes/userRoutes');
const errors = require('./middleware/errorHandler');
const connectDb = require('./config/db');
app.use(express.json());
connectDb();
app.use(
  cors({
    origin: 'http://localhost:4081', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use('/v1', router);
app.use('/v1/user', router2);
app.use(errors);

app.listen(process.env.PORT, () => {
  console.log('server started');
});
