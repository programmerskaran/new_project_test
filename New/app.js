const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

//MIDDLEWARES 
app.use(morgan('dev'));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello From the server side', app: 'Natorus'
//     });
// });
// app.post('/', (req, res) => {
//     res.send(
//         'You can Post to this output...'
//     );
// });



//ROUTES HANDLER




app.use((req, res, next) => {
    console.log('Hello From The Middleware ☺');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});





// ROUTES

// const tourRouter = express.Router();
// const userRouter = express.Router();







app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;