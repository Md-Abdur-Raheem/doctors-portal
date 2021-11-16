import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://pure-journey-93406.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Doctors added successfully')
                }
            })
            .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h1>Add a doctor</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: "50%" }}
                    onChange={e=>setName(e.target.value)}
                    label="Name"
                    type="text"
                    required
                    variant="standard" />
                <br/>
                <TextField
                    sx={{ width: "50%" }}
                    onChange={e=>setEmail(e.target.value)}
                    label="Email"
                    type="email"
                    required
                    variant="standard" />
                <br /><br/>
                <Input
                    accept="image/png, image/jpg"
                    onChange={e => setImage(e.target.files[0])}
                    type="file" />
                <br/><br/>
                <Button
                    variant="contained" 
                    type="submit">
                    Add Doctor
                </Button>
            </form>
        </div>
    );
};

export default AddDoctor;