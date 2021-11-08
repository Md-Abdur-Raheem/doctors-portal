import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import login from '../../../images/login.png'
import { Alert, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Box } from '@mui/system';

const Register = () => {
    const { user, registerUser, loading, error } = useAuth();
    const [loginData, setLoginData] = useState({});
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();
    
    const handleOnChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        
    }
    const handleRegisterSubmit = e => {
        if (loginData?.password !== loginData?.password2) {
            setPasswordError("Password didn't match");
            e.preventDefault();
            return;
            
        }
        else {
            const name = loginData?.name;
            const email = loginData?.email;
            const password = loginData?.password;
            registerUser(name, email, password, history);
        }
        e.preventDefault();

    }
    return (
        <Container sx={{ width: '100%', height: "100vh"}}>
            {
                !loading &&
                <Grid
                container
                rowSpacing={1}
                columns={{ xs: 12, md: 12 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <Grid
                    item xs={12}
                    md={6}>
                    <Paper
                        elevation={2}
                        sx={{ padding: "50px", height: "500" }}>
                        <Typography
                            sx={{ fontWeight: 700, color: "#18d2b1" }}
                            variant="h5" >Register
                        </Typography>
                        <form
                            onSubmit={handleRegisterSubmit}
                            style={{ textAlign: "start" }} >
                            <TextField
                                sx={{ width: "80%" }}
                                id="standard-basic"
                                label="Your Name"
                                type="text"
                                variant="standard"
                                name="name"
                                onChange={handleOnChange}
                            />
                            <br /><br />
                            <TextField
                                sx={{ width: "80%" }}
                                id="standard-basic"
                                label="Your Email"
                                type="email"
                                variant="standard"
                                name="email"
                                onChange={handleOnChange}
                            />
                            <br /><br />
                            <TextField
                                sx={{ width: "80%" }}
                                id="standard-basic"
                                label="Password"
                                type="password"
                                variant="standard"
                                name="password"
                                onChange={handleOnChange}
                            />
                            <br /><br />
                            <TextField
                                sx={{ width: "80%" }}
                                id="standard-basic"
                                label="Re type your password"
                                type="password"
                                variant="standard"
                                name="password2"
                                onChange={handleOnChange}
                            />
                            <br /><br />
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: '#18d2b1', marginLeft: "40%" }}
                                >Register
                            </Button>
                        </form>
                        <br />
                        <NavLink
                            style={{textDecoration:"none"}}
                            to="/login">
                            <Button
                                variant="text">
                                Already Registered?
                            </Button>
                        </NavLink>
                        {
                            user?.email && <Alert severity="success">Your account created successfully</Alert>
                        }
                        {
                            error && <Alert severity="error">{ error }</Alert>
                        }
                        {
                            passwordError && <Alert severity="error">{ passwordError }</Alert>
                        }    
                    </Paper>
                </Grid>
                <Grid
                    item xs={12}
                    md={6}>
                    <img
                        style={{ width: "100%" }}
                        src={login}
                        alt="" />
                </Grid>
            </Grid>
            }
            {
                loading &&
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "25%" }}>
                        <CircularProgress />
                    </Box>
            }
         </Container>
    );
};

export default Register;