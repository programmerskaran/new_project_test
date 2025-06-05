const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello From the server side', app: 'Natorus'
    });
});
app.post('/', (req, res) => {
    res.send(
        'You can Post to this output...'
    );
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);

})