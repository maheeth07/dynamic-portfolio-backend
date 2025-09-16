
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

mongoose.connect(process.env.MONGOURI)
  .then(() => {
    console.log(" MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error(" MongoDB connection failed", err);
  });
