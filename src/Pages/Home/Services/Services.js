import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png'
import cavity from '../../../images/cavity.png'
import whitening from '../../../images/whitening.png'




const services = [
    {
        name: 'Floride treatment',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, nobis itaque rem expedita impedit molestias quae iusto nemo mollitia natus?',
        img: fluoride
    },
    {
        name: 'Cavity filling',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, nobis itaque rem expedita impedit molestias quae iusto nemo mollitia natus?',
        img: cavity
    },
    {
        name: 'Floride treatment',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, nobis itaque rem expedita impedit molestias quae iusto nemo mollitia natus?',
        img: whitening
    },
]



const Services = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ color: '#18d2b1', m: 2 }} variant="h6" component="div">OUR SERVICES</Typography>
                
                <Typography sx={{ fontWeight: 'bold', mb: 8 }} variant="h4">Services we provide</Typography>
                
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    {
                        services.map((service, index) => <Grid item xs={4} sm={3} md={4} key={index}><Service service = {service}></Service></Grid>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;