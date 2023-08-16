import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReplyIcon from '@mui/icons-material/Reply';

import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/userSlices/authSlice'; 
import { toast } from 'react-toastify';
import { USERS_URL } from '../../constants/usersConstants';



const theme = createTheme({
    palette: {
      primary: {
        main: '#5B8291'
      },
    },
  });


const OtpScreen = () => {

    const [ otp, setOtp ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const { userInfo } = useSelector(state => state.auth)

     useEffect(() => {
    if(userInfo){
      if(userInfo.isAdmin){
        navigate('/admin/dashboard')
      }else{
        navigate('/')
      }
    }
   }, [navigate, userInfo])


  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
        const _id = location.state._id
        const res = await axios.put(USERS_URL + 'otp', { otp, _id })

        if( res.status === 201){
            dispatch(setCredentials(res.data))
            toast.success('User Registered succesfuly')
            setOtp('')
            navigate('/')
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
    }
  };


  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{mt: 5, bgcolor: '#5B8291' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Otp
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, minWidth: '350px', mb: '70px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter otp"
              name="otp"
              autoComplete="otp"
              autoFocus
              onChange={e => {setOtp(e.target.value)}}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1.5 }}            >
              Submit
            </Button>
            <Grid container>
              <Grid item md>
              
                <Link href="/" variant="body2">  
                <ReplyIcon sx={{height: '20px', pt: '5px' }}/> 
                  Back
                </Link>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default OtpScreen