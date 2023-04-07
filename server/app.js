require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const contactRoute = require('./router/contactRoute');


const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.use('/api/contact', contactRoute);


app.get('/', (req, res) => {
    res.send('Welcome To Nodemailer');
});

app.listen(process.env.PORT, () => {
    console.log("Server is connected");
});

