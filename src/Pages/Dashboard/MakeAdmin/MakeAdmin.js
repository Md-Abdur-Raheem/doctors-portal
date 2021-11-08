import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
        console.log(email);
    }

    const handleAdminSubmit = e => {
        e.preventDefault();
        const user = { email };
        fetch('https://pure-journey-93406.herokuapp.com/users/admin', {
            method: "PUT",
            headers: {
                'authorization' : `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    setEmail('');
                }
            })
       
    }
    return (
        <div>
            <h2>Make me an admin</h2>
            {
                success && <Alert severity="success">Made Admin successfully</Alert>
            }
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    onBlur={handleOnBlur}
                    sx={{width: "50%"}}
                    type="email"
                    label="Email"
                    variant="standard" />
                <br/><br/>
                <Button
                    style={{ backgroundColor: '#18d2b1' }}
                    type="submit"
                    variant="contained">
                    Make Admin
                </Button>
            </form>
        </div>
    );
};

export default MakeAdmin;