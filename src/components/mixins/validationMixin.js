export const validationMixin = {
  methods: {
    validateField(field, post, errors,) {
     
      if (!post[field].length) {      
        errors[`${field}Error`] = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`;
        setTimeout(() => {
          errors[`${field}Error`] = '';
        }, 3000);
      }
      else {
        errors[`${field}Error`] = '';
      }
    }
  }
}