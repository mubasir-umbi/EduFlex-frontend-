import Hero from '../../components/user/Hero';
import Hero2 from '../../components/user/Hero2'
import RegistrationForm from '../../components/tutor/RegistrationForm.jsx';
import CategoryCard from '../../components/user/CategoryCart'
import TutorCard from '../../components/user/TutorCard';


const HomeScreen = () => {
  return(
    <>
    <Hero />
    <CategoryCard/>
    <TutorCard/>
    <Hero2/>
    {/* <RegistrationForm/> */}
    </>
  ) ;
};
export default HomeScreen;



