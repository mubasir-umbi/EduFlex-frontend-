const validateCourseForm = (title, des, category, price, thumbnail) => {
    const errors = {};
  
    if (!title) {
      errors.title = 'Title is required';
    }
    // else if(!isValidName(title)){
    //     errors.title = 'Invalid name format';
    // }

    if (!des) {
      errors.des = 'Description is required';
    }
    // else if(des.length !== 10){
    //     errors.des = 'Description must be at least 10 characters long'
    // }
  
    if (!category) {
      errors.category = 'Category is required';
    } 
    if (!thumbnail) {
      errors.image = 'Thumbnail is required';
    } 

    if(!price){
      errors.price = 'Price is requered'
    }

    return errors;
  };


  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
  };

  const isValidPrice = (p) => {
    const regex = /^[0-9]$/;
    return regex.test(p);
  }

  


  export default validateCourseForm;