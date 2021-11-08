import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png'
import appointment_bg from '../../../images/appointment-bg.png'
import { Button, Typography } from '@mui/material';

const appointmentBanner = {
    background: `url(${appointment_bg})`,
    backgroundColor: 'rgba(45,58,74, .9)',
    backgroundBlendMode: 'darken',
    // height: 600,
    marginTop: '200px',
    marginBottom: '200px'
}


const AppointmentBanner = () => {
    return (
        <Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <img style={{width:794, marginTop:-210}} src={doctor} alt="" />
                </Grid>
                <Grid item xs={6} md={6}  sx={{ display: 'flex', justifyContent: 'flex-start', textAlign:'start', alignItems:'center'  }}>
                    <Box>
                        <Typography mb={3} sx={{ color: '#18d2b1' }} variant="h6">
                            APPOINTMENT
                        </Typography>
                        <Typography mb={3} sx={{ color: '#fff' }} variant="h4">
                            Make an appoitment today
                        </Typography>
                        <Typography mb={3} sx={{ color: '#fff', fontSize: 16, fontWeight:400 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequuntur perspiciatis fugit exercitationem quos, aliquid amet incidunt officiis odio cum culpa, quia rerum molestiae veniam dicta vero, ipsam itaque non!
                        </Typography>
                        <Button style={{backgroundColor:'#18d2b1'}} variant="contained">Learn More</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppointmentBanner;