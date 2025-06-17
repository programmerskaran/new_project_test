const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);



app.use((req, res, next) => {
    console.log('Hello From The Middleware ☺');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requesttime: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const postTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
}


const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const patchTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour Here.......>'
        }
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null

    });
};



const getAllusers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not defined yet'
    });
};
const postUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not defined yet'
    });
};
const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not defined yet'
    });
};
const patchUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not defined yet'
    });
};
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This Route is Not defined yet'
    });
};





// app.get('/api/v1/tours', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//             tours
//         }
//     });
// });

// app.get('/api/v1/tours/:id', (req, res) => {
//     console.log(req.params);
//     const id = req.params.id * 1;
//     const tour = tours.find(el => el.id === id);
//     if (!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour
//         }
//     });
// });

// app.post('/api/v1/tours', (req, res) => {
//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({ id: newId }, req.body);
//     tours.push(newTour);
//     fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         err => {
//             res.status(201).json({
//                 status: 'success',
//                 data: {
//                     tour: newTour
//                 }
//             });
//         }
//     );
// });

// app.patch('/api/v1/tours/:id', (req, res) => {
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         });
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour: '<Updated tour Here.......>'
//         }
//     });
// });


// app.delete('/api/v1/tours/:id', (req, res) => {
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid Id'
//         });
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null

//     });
// });




// ROUTES
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(postTour)




app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(patchTour)
    .delete(deleteTour)



app.route('/api/v1/users')
    .get(getAllusers)
    .post(postUser)



app.route('/api/v1/users/:id')
    .get(getUser)
    .patch(patchUser)
    .delete(deleteUser)


// SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);

})