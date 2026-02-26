  const express = require('express');
  const morgan = require('morgan');
  const cookieParser = require('cookie-parser');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const routes = require('./routes');
  const { notFound, errorHandler } = require('./middleware/errorMiddleware');

  dotenv.config();

  const app = express();

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

  app.use(
    cors({
      origin: clientUrl,
      credentials: true
    })
  );
  
  console.log("Allowed CORS Origin:", clientUrl);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' });
  });

  app.use('/api', routes);

  app.use(notFound);
  app.use(errorHandler);

  module.exports = app;
