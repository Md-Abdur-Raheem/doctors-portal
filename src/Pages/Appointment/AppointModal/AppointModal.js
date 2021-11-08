import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  


const AppointModal = ({ open, handleClose, slot, date, setOpen,setAppointSuccess }) => {
  const { serviceName, time } = slot;
  const { user } = useAuth();

  const initialInfo = {patientName: user.displayName, email: user.email, phone: ''}
  const [appointInfo, setAppointInfo] = useState(initialInfo);

  const handleOnBlur = event => {
      const field = event.target.name;
      const value = event.target.value;
      const newAppointInfo = { ...appointInfo };
      newAppointInfo[field] = value;
      const newAppointment = { serviceName, time, date: date.toDateString(), ...newAppointInfo };
      setAppointInfo(newAppointment);
    }

  const handleSubmit = event => {
    fetch('https://pure-journey-93406.herokuapp.com/appointments', {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(appointInfo)
    })
      .then(res => res.json())
      .then(data => {
        if (data?.insertedId) {
          setAppointSuccess(true);
          setOpen(false)
        }
      })
      setAppointInfo(initialInfo);
      event.preventDefault();
  }
  
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2">
              {slot.serviceName}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                    disabled
                    sx={{width:'90%', mb:2}}
                    id="outlined-size-small"
                    defaultValue={slot.time}
                    size="small"
                />        
                    <TextField
                    onBlur={handleOnBlur}
                    name="patientName"
                    placeholder="Patient's Name"
                    sx={{width:'90%', mb:2}}
                    id="outlined-size-small"
                    defaultValue={user.displayName}
                    size="small"
                />        
                    <TextField
                    onBlur={handleOnBlur}
                    name="email"
                    placeholder="Email address"
                    sx={{width:'90%', mb:2}}
                    id="outlined-size-small"
                    defaultValue={user.email}
                    size="small"
                />        
                    <TextField
                    onBlur={handleOnBlur}
                    name="phone"
                    required
                    sx={{width:'90%', mb:2}}
                    id="outlined-size-small"
                    placeholder="Phone number"
                    size="small"
                />        
                    <TextField
                    disabled
                    sx={{width:'90%', mb:2}}
                    id="outlined-size-small"
                    defaultValue={date.toDateString()}
                    size="small"
                />
                <Button
                  sx={{ backgroundColor: '#18d2b1', ml: '73%' }}
                  variant="contained"
                  type="submit">Send</Button>
              </form>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    );
};

export default AppointModal;