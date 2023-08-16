
import { React, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { USERS_URL } from '../../constants/usersConstants';
import { useSelector } from 'react-redux';



// const defaultTheme = createTheme();

const theme = createTheme({
    palette: {
      primary: {
        main: '#5B8291'
      },
    },
  });


const  ResetPasswordScreen = () => {


  const [password, setpassword ] = useState('')
  const [confirmPassword, setConfirmPassword ] = useState('')

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


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(location.state);
    const _id = location.state._id

    if(password !== confirmPassword){
      toast.error('Password do not match')
    }else{
      try {
        const res = await axios.post(USERS_URL + 'reset_password', {password, _id})
       if(res.status === 201){
        toast.success("Password reseted successfully")
        setpassword('')
        navigate('/login')
       }
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }

  }

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
                
          <Avatar sx={{ m: 1, bgcolor: '#5B8291' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>


          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
             
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1.5 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}



export default ResetPasswordScreen
