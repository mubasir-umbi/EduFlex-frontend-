import * as React from 'react';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { ADMIN_URL } from '../../constants/adminConstans';
import ToggleOff from '@mui/icons-material/ToggleOffTwoTone';
import ToggleOn from '@mui/icons-material/ToggleOnTwoTone';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TUTOR_URL } from '../../constants/tutorConstants';
import { toast } from 'react-toastify';
import { adminApi } from '../../services/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Toggle({status, id, owner, name}) {

    const [block, setBolock] = React.useState(status)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const blockHandllerStudent = async() => {
        console.log(id);
       try {
        const res = await adminApi.post('student/block', {id})
        const status = res.data.status
        setOpen(false);
        setBolock(status)
        toast.info(`${res.data.name} is ${res.data.status ? 'blocked' : 'unblocked'}`)
       } catch (error) {
        toast.error(error.response.data.message || error.message);
       }
    }


    const blockHandllerTutor = async() => {
        console.log(id);
         try {
          const res = await adminApi.post('tutor/block', {id})
         const status = res.data.status
         setOpen(false);
         setBolock(status)
         toast.info(`${res.data.name} is ${res.data.status ? 'blocked' : 'unblocked'}`)
         } catch (error) {
          toast.error(error.response.data.message || error.message);
         }
    }

  return (
    <>
      <Tooltip title= {block? "Unblock" : "Block"}>
        {block? <ToggleOn  onClick={handleClickOpen} /> : <ToggleOff onClick={handleClickOpen} />}
      </Tooltip>



      <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Alert!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {
                block? `Are you sure want to unblock ${name}?` : `Are you sure want to block ${name}?`
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={ owner === 'student' ? blockHandllerStudent : blockHandllerTutor}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  )
}