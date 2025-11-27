const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./src/config/db');
const itemRoutes = require('./src/routes/item.routes');
const errorHandler = require('./src/utils/errorHandler');

dotenv.config();

const app = express();
const PORT = 5050;

app.use(cors({
  origin: "*",
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/items', itemRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get('/uAlive', (req, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() })
);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});



