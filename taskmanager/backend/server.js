  const http = require('http');
  const dotenv = require('dotenv');
  const app = require('./app');
  const cron = require('node-cron');
const axios = require('axios');
  const connectDB = require('./config/db');

  dotenv.config();

  const PORT = process.env.PORT || 5000;

  const startCron = () => {
  cron.schedule('*/14 * * * *', async () => {
    try {
      console.log('Running 14-minute cron job...');

      await axios.get(`${process.env.BASE_URL}/api/health`);

      console.log('Health check successful');
    } catch (error) {
      console.error('Cron failed:', error.message);
    }
  });
};

  const startServer = async () => {
    await connectDB();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
    startCron(); 
  };

  startServer();


  