const validateCourseForm = (formData, video) => {
    const errors = {};
  
    if (!formData.title) {
      errors.title = 'Title is required';
    }else if(!isValidName(formData.title)){
        errors.title = 'Invalid title format';
    }

    if (!formData.description) {
      errors.des = 'Description is required';
    }

    if (!video) {
      errors.video = 'Video is required';
    }
    
    
    if(!formData.lessonNo){
        errors.lessonNo = 'No is required'
    }else if (!isValidMobile(formData.lessonNo)){
        errors.lessonNo = 'Invalid No format'
    }
    return errors;
  };


  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
  };

  const isValidMobile = (no) => {
    const regex = /^[0-9]$/;
    return regex.test(no);
  }
  


  export default validateCourseForm;