import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('https://pure-journey-93406.herokuapp.com/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
    },[])

    return (
        <div>
            <h1>Our doctors</h1>
            <Container>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 12, sm: 12, md: 12 }}>
                    {
                        doctors.map(doctor => <Doctor key={doctor._id}
                            doctor={doctor}
                        
                        ></Doctor>)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Doctors;