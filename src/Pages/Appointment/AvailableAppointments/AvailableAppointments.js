import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, Button, Container, Typography } from '@mui/material';
import AppointModal from '../AppointModal/AppointModal';

const timeSlots = [
    {
        id: 1,
        serviceName: 'Teeth Orthodontics',
        time: '08.00 AM - 09.00 AM',
        space: 10
    },
    {
        id: 2,
        serviceName: 'Cosmetic Dentisty',
        time: '08.00 AM - 09.00 AM',
        space: 8
    },
    {
        id: 3,
        serviceName: 'Teeth cleaning',
        time: '08.00 AM - 09.00 AM',
        space: 10
    },
    {
        id: 4,
        serviceName: 'Cavity Protection',
        time: '08.00 AM - 09.00 AM',
        space: 10
    },
    {
        id: 5,
        serviceName: 'Oral Surgery',
        time: '08.00 AM - 09.00 AM',
        space: 10
    },
    {
        id: 6,
        serviceName: 'Padiatric Dental',
        time: '08.00 AM - 09.00 AM',
        space: 10
    }
]

const AvailableAppointments = ({ date }) => {
    const [slot, setSlot] = useState({})
    const [open, setOpen] = React.useState(false);
    const [appointmentSuccess, setAppointSuccess] = useState(false);

    const handleOpen = (id) => {
        setOpen(true)
        const filtered = timeSlots.find(slots => slots.id === id);
        setSlot(filtered)
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <Box sx={{ my:10}}>
                <h1
                    style={{ color: '#18d2b1' }}>
                    Available appointments on {date.toDateString()}
                </h1>
                <Container sx={{ flexGrow: 1 }}>
                {
                        appointmentSuccess && <Alert
                            style={{marginBottom: '20px'}}
                            severity="success">Your appointment fixed successfully</Alert>
                }
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 9 }}>
                    {
                        timeSlots.map((slot, index) => (
                            <Grid
                                item
                                xs={2}
                                sm={4}
                                md={3}
                                key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{ p: 4 }}>
                                    <Typography
                                        style={{ color: '#18d2b1', fontWeight:700 }}
                                        variant="h5">
                                        {slot.serviceName}
                                    </Typography>
                                    <Typography
                                        variant="h6">
                                        {slot.time}
                                    </Typography>
                                    <Typography
                                        variant="body1">
                                        {slot.space}
                                        spaces availavle
                                    </Typography>
                                    <br /><br />
                                    <Button
                                        onClick={() => handleOpen(slot.id)}
                                        style={{ backgroundColor: "#18d2b1" }}
                                        variant="contained">
                                        <Typography
                                            variant="button"
                                            display="block"
                                            gutterBottom>
                                            Book Appointment
                                        </Typography>
                                        </Button>
                                </Paper>
                                </Grid>
                        ))
                    }
                    </Grid>
                </Container>
            </Box>
            <AppointModal
                date={date}
                slot={slot}
                open={open}
                handleClose={handleClose}
                setOpen={setOpen}
                setAppointSuccess={setAppointSuccess}
        ></AppointModal>
        </>
    );
};

export default AvailableAppointments;