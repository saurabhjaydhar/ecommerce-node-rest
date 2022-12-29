const { app, getScrapData } = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/.env' });
const connectDB = require('./config/database');
const gkRouter = require('./routes/gkRoute');
// const getScrapData = require('./app');

// connectDB();
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Congrats!',
  });
});
app.listen(process.env.PORT, () => {
  console.log(
    `server start listening on port http://localhost:${process.env.PORT}/`,
  );
});
