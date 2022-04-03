const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
let RedisStore = require('connect-redis')(session);

const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_PORT,
  REDIS_URL,
  SESSION_SECRET
} = require('./config/config');

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;
const app = express();

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connect to database success.'))
  .catch((e) => console.log(e));

app.enable('trust proxy');

app.use(cors());

const ONE_DAY = 1000 * 60 * 60 * 24;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      saveUninitialized: false,
      resave: false,
      httpOnly: true,
      maxAge: ONE_DAY
    }
  })
);

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.send('<h2>Hi there!!!</h2>');
  console.log('it ran!');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app listening on port ${port}`));
