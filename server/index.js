const express = require('express');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
require('dotenv').config();

const restaurantRouter = require('./routers/restaurantRouter');
const userRouter = require('./routers/userRouter');
const favoriteRouter = require('./routers/favoriteRouter');
const categoryRouter = require('./routers/categoryRouter');
const customRouter = require('./routers/customRouter');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/storage/restaurant', express.static('storage/restaurant'));
app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/favorite', favoriteRouter);
app.use('/category', categoryRouter);
app.use('/custom', customRouter);

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(listEndpoints(app));
});

module.exports = server;