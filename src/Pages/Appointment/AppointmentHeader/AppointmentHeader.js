import React from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import chair from '../../../images/chair.png';
import Calendar from '../../Shared/Calendar/Calendar';

const AppointmentHeader = ({date,setDate}) => {
    return (
        <Container
            sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}
                columns={{ xs: 12, md: 16 }}>
                <Grid
                    item
                    xs={12}
                    md={8}>
                    <Calendar
                        date={date}
                        setDate={setDate}>
                    </Calendar>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}>
                    <img src={chair}
                        width="100%"
                        alt="" />
                </Grid>
            </Grid>
      </Container>
    );
};

export default AppointmentHeader;