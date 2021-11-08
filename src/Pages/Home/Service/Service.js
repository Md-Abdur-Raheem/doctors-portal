import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const Service = (props) => {
    const { name, description, img } = props.service;
    return (
        <Card sx={{ maxWidth: 1, border:0, boxShadow:0, borderRadius: 0 }}>
            <CardMedia
                component="img"
                style={{width:'auto', height:"80", margin: "0 auto"}}
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <Typography
                    sx={{ color: 'text.secondary' }}
                    gutterBottom
                    variant="h5"
                    component="div">
                        {name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary">        
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Service;