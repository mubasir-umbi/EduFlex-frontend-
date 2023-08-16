// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import store from './store';
// import { Provider } from 'react-redux';
// import PrivateRoute from './components/PrivateRoute.jsx';
// import ForgetPasswordScreen from './screens/userScreens/ForgetPasswordScreen.jsx';
// import HomeScreen from './screens/userScreens/HomeScreen.jsx';
// import LoginScreen from './screens/userScreens/LoginScreen.jsx';
// import RegisterScreen from './screens/userScreens/RegisterScreen.jsx';
// import OtpScreen from './screens/userScreens/OtpScreen.jsx';
// import ProfileScreen from './screens/userScreens/ProfileScreen.jsx'
// import ResetPasswordScreen from './screens/userScreens/ResetPasswordScreen.jsx'
// // import VerifiyOtp from './components/VerifiyOtp.jsx';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App />}>
//       <Route index={true} path='/' element={<HomeScreen />} />
//       <Route path='/login' element={<LoginScreen  />} />
//       <Route path='/register' element={<RegisterScreen />} />
//       <Route path='/otp' element={<OtpScreen />} />
//       <Route path='/forget_password' element={<ForgetPasswordScreen />} />
//       <Route path='/reset_password' element={<ResetPasswordScreen />} />
//       {/* <Route path='/verify_otp' element={<VerifiyOtp />} /> */}
//       <Route path='' element={<PrivateRoute />}>
//         <Route path='/profile' element={<ProfileScreen />} />
//       </Route>
//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <RouterProvider router={router} />
//     </React.StrictMode>
//   </Provider>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';


  ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
        <React.StrictMode>
          <App/>
        </React.StrictMode>
      </Provider>
);

