import React, { useState } from 'react'
import axios from 'axios';

const URL = 'http://localhost:8500/api/contact';

const Contact = () => {
    const [contactInfo, setContactInfo] = useState({});

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
        console.log(res.data);
    };


    return (
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Send Your Contact Information</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" name='username' onChange={handleChange} />
                <input type="message" name='message' onChange={handleChange} />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    )
}

export default Contact;