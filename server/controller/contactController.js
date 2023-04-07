const nodemailer = require('nodemailer');

const mailController = (req, res) => {
    const {
        username, email, phone, message
    } = req.body;

    const sendMsg = `
        <div>
            <span>Username: ${username}</span><br />
            <span>Email: ${email}</span><br />
            <span>Phone: ${phone}</span><br />
            <p>Message: ${message}</p>
        </div>
    `

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.TO,
        subject: 'Contact Details',
        html: sendMsg
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(201).send({statusCode: 401, error});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201).send({statusCode: 201, info});
        }
    });
}


module.exports = mailController;