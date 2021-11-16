import { Grid } from '@mui/material';
import React from 'react';

const Doctor = ({ doctor }) => {
    const {name, image} = doctor;
    return (
        <Grid item xs={12} sm={6} md={4}>
            <img style={{width: 200, height: 200, objectFit: "cover"}} src={`data:image/png;base64,${image}`} alt=""></img>
            <h2>{name }</h2>
        </Grid>
    );
};

export default Doctor;