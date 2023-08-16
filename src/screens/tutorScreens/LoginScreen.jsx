import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoginForm from "../../components/LoginForm";
import { useTutorLoginMutation } from "../../slices/tutorSlices/tutorApiSlice";
import { setTutorCredentials } from "../../slices/tutorSlices/tutorAuthSlice"; 

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tutorLogin, { isLoading }] = useTutorLoginMutation();

  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  useEffect(() => {
    if (tutorInfo) {
      navigate("/tutor/dashboard");
    } else {
      navigate("/tutor/login");
    }
  }, [navigate, tutorInfo]);

  const handleSubmit = async (event, email, password) => {
    event.preventDefault();
    try {
      const res = await tutorLogin({ email, password }).unwrap();
      console.log(res, 'am respooooooooooooo');
      dispatch(setTutorCredentials({res }));
      
      navigate("tutor/dashboard");
    } catch (err) {

      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <LoginForm
      onSubmitHandler={handleSubmit}
      isLoading={isLoading}
      title={"Tutor"}
    />
  );
};

export default LoginScreen;
