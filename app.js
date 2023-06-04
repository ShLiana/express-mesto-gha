const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { ERROR_STATUS } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '647c3bdae95c5841bd784da9',
  };
  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.all('*/', (req, res) => {
  res.status(ERROR_STATUS.NOT_FOUND).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
