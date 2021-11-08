import React from 'react';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import Grid from '@mui/material/Grid';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

const HeroBanner = () => {
    const bannerBg = {
        background: `url(${bg})`,
    }
    const verticalCenter = {
        display: 'flex',
        alignItems: 'center',
        height : 450
    }
    return (
        <Container sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={2}>
                <Grid
                    style={{ ...verticalCenter, textAlign: 'left', bannerBg }}
                    item xs={12}
                    md={5}>
                    <Box>
                        <Typography
                            variant="h3">
                            Your new smile <br /> starts here
                        </Typography>
                        <br/>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eos nemo obcaecati consequuntur praesentium sunt cumque iure sed facilis. In dolore ipsum vitae temporibus vero, esse omnis nam vel nesciunt.
                        </Typography>
                        <br/>
                        <Button
                            style={{ backgroundColor: "#18d2b1" }}
                            variant="contained">
                            GET APPOINTMENT</Button>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={7}
                    style={verticalCenter}>
                    <img
                        style={{ width: 550 }}
                        src={chair}
                        alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeroBanner;