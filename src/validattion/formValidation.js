const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.fName) {
      errors.fName = 'Name is required';
    }else if(!isValidName(formData.fName)){
        errors.fName = 'Invalid name format';
    }

    if (!formData.lName) {
      errors.lName = 'Name is required';
    }else if(!isValidName(formData.lName)){
        errors.lName = 'Invalid name format';
    }
  
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // if(!formData.mobile){
    //     errors.mobile = 'phone is required'
    // }else if (!isValidMobile(formData.mobile)){
    //     errors.mobile = 'Invalid phone format'
    // }
  
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'confirm password is required';
    }else if(formData.confirmPassword !== formData.password){
      errors.password = 'Password is not match';
      errors.confirmPassword = 'Password is not match';
    }

  
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // const isValidMobile = (mobile) => {
  //   const regex = /^[0-9]{10}$/;
  
  //   return regex.test(mobile);
  // }

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };
  


  export default validateForm;

