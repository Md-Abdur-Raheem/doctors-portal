import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const Appointments = ({date}) => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch(`https://pure-journey-93406.herokuapp.com/appointments?email=${user.email}&date=${date}`)
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [user.email, date])
    
    return (
      <TableContainer component={Paper}>
        <h1>Appointments : { appointments.length}</h1>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Schedule</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                    {
                        appointments.map((appointment, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0, textAlign: 'center' } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {appointment.serviceName}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {appointment.patientName}
                </TableCell>
                <TableCell align="center">{appointment.time}</TableCell>
                            <TableCell align="center">{appointment.payment ?
                              'Paid' : <NavLink to={`/dashboard/payment/${appointment._id}`}><Button>Pay</Button></NavLink>}</TableCell>
              </TableRow>
                        ))
                    }
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default Appointments;