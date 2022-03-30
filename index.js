const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER
} = require('./config/config');

const postRouter = require('./routes/postRoutes');

const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connect to database success.'))
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h2>Hi there!!!</h2>');
});

app.use('/api/v1/posts', postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on port ${port}`));
