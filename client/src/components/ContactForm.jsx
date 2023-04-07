import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const URL = 'http://localhost:8500/api/contact';

const ContactForm = () => {
    const [contactInfo, setContactInfo] = useState({
        username: '',
        email: '',
        phone: '',
        message: ''
    });
    const [show, setShow] = useState(false);
    const [variant, setVariant] = useState("");
    const [toastMsg, setToastMsg] = useState("");

    const handleChange = (e) => {
        setContactInfo(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(URL, contactInfo);

        if (!res.data || res.data.statusCode === 401) {
            setVariant('danger');
            setToastMsg('Oh snap! You got an error!');
            setShow(true);
        } else {
            setVariant('success');
            setToastMsg('Contact Info Sent Successfully!');
            setShow(true);

            setContactInfo({
                username: '',
                email: '',
                phone: '',
                message: ''
            });
        }
    };

    const { username, email, phone, message } = contactInfo;

    return (
        <>
            {show && (
                <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{toastMsg}</Alert.Heading>
                </Alert>
            )}
            <div className='container mt-3'>
                <h1 className='text-center'>
                    Contact Info
                </h1>

                <div className='d-flex justify-content-center'>
                    <Form className='mt-3 col-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text" placeholder="enter username"
                                name="username" value={username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email" placeholder="enter email"
                                name="email" value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel" placeholder="enter phone number"
                                name="phone" value={phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                name="message" value={message}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ContactForm;