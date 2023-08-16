
import { React, useEffect, useState } from 'react';
import { useUpdateUserMutation } from '../../slices/userSlices/usersApiSlice'; 
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/userSlices/authSlice';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



// const defaultTheme = createTheme();

const theme = createTheme({
    palette: {
      primary: {
        main: '#5B8291'
      },
    },
  });


const  RegisterScreen = () => {

  const [fName, setFname ] = useState('')
  const [lName, setLname ] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setpassword ] = useState('')
  const [confirmPassword, setConfirmPassword ] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector( state => state.auth)

  const [updateProfile, { isLoading }] = useUpdateUserMutation ();

  useEffect(() => {
    setFname(userInfo.fName)
    setLname(userInfo.lName)
    setEmail(userInfo.email)
  }, [userInfo.fName, userInfo.lName, userInfo.email])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword){
      toast.error('Password do not match')
    }else{
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          fName, 
          lName, 
          email, 
          password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success('Profile updated successfully');
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
                
          {/* <Avatar sx={{ m: 1, bgcolor: '#5B8291' }}>
            <LockOutlinedIcon />
          </Avatar> */}
         
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          {/* <Paper sx={{width: '400px', height: 'auto', alignItems: 'center'}} >
            <Tooltip title="Open settings" sx={{ p: 0, marginLeft: 'auto', marginRight: 'auto' }}>
              <IconButton sx={{ p: 0,  alignItems: 'center'}}>
                <Avatar sx={{width: 'auto', height: '200px', }} alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
          </Paper> */}
         

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fName}
                  onChange={e => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  value={lName}
                  onChange={e => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
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

            {isLoading && <Loader/>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p: 1.5 }}
            >
              Update
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}



export default RegisterScreen

