const express = require('express');
const app = express();
const env = require('dotenv').config();
const router = require('./routes/contactRoutes');
const router2 = require('./routes/userRoutes');
const errors = require('./middleware/errorHandler');
const connectDb = require('./config/db');
app.use(express.json());
connectDb();
app.use('/v1', router);
app.use('/v1/user', router2);
app.use(errors);

app.listen(process.env.PORT, () => {
  console.log('server started');
});
