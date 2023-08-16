import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { tutorInfo } = useSelector((state) => state.tutorAuth);
  return tutorInfo ? <Outlet /> : <Navigate to='/tutor/login' replace />;
};
export default PrivateRoute;
