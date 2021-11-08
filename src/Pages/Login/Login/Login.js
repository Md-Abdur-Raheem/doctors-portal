import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import login from '../../../images/login.png'
import { Alert, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Box } from '@mui/system';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, logIn, loading, error, googleSignIn } = useAuth();
    const location = useLocation();
    const history = useHistory();
    
    const handleOnChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        
    }
    const handleLoginSubmit = e => {
        logIn(loginData?.email, loginData?.password, location, history);
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
                        sx={{ padding: "50px", height: "350" }}>
                        <Typography
                            sx={{ fontWeight: 700, color: "#18d2b1" }}
                            variant="h5" >Login
                        </Typography>
                        <form
                            onSubmit={handleLoginSubmit}
                            style={{ textAlign: "start" }} >
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
                            <NavLink
                                to="/register"
                                style={{textDecoration:"none"}}>
                                <Button
                                    style={{color:"red"}}
                                    variant="text">
                                   Forgot Password?
                                    </Button>
                            </NavLink>
                            <br /><br />
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ backgroundColor: '#18d2b1', marginLeft: "44%" }}
                                >Log In
                            </Button>
                            </form>
                            <br />
                            <NavLink
                                style={{textDecoration:"none"}}
                                to="/register">
                                <Button
                                    variant="text">
                                    New User?
                                    </Button>
                            </NavLink>
                            <br />
                            <p>--------------------------------</p>
                            <Button
                                onClick={()=>googleSignIn(location, history)}
                                variant="text"
                            >
                                Login with google
                            </Button>
                            {
                            user?.email && <Alert severity="success">Logged in succseefully</Alert>
                         }
                        {
                            error && <Alert severity="error">{ error }</Alert>
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

export default Login;