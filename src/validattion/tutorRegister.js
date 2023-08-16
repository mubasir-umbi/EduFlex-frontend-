const validateForm = (formData, reg) => {
    const errors = {};
  
    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
    }else if(!isValidName(formData.firstName)){
        errors.firstName = 'Invalid name format';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
    }else if(!isValidName(formData.lastName)){
        errors.lastName = 'Invalid name format';
    }
  
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if(!formData.mobile){
        errors.mobile = 'Mobile is required'
    }else if (!isValidMobile(formData.mobile)){
        errors.mobile = 'Invalid phone format'
    }

    if(reg){
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
  
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
      }else if(formData.confirmPassword !== formData.password){
        errors.password = 'Password is not match';
        errors.confirmPassword = 'Password is not match';
      }
    }
  
    if (!formData.addressLine) {
      errors.addressLine = 'AddressLine is required';
    } else if (formData.addressLine.length < 10) {
      errors.addressLine = 'AddressLine must be at least 10 characters long';
    }

    if (!formData.state) {
      errors.state = 'State is required';
    } 

    if (!formData.country) {
      errors.country = 'Country is required';
    } 

    if (!formData.city) {
      errors.city = 'City is required';
    } 
    
    if (!formData.about) {
      errors.about = 'About you is required';
    } 

    if (!formData.zip) {
      errors.zip = 'Zip is required';
    } else if (!isValidZip(formData.zip)){
        errors.zip = 'Invalid Zip' 
    }

  
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
  
    return regex.test(mobile);
  }

  const isValidZip = (zip) => {
    const regex = /^[0-9]{6}$/;
  
    return regex.test(zip);
  }

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };
  


  export default validateForm;