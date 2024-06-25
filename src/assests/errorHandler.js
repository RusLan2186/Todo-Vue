export function validateForm(title, body) {
  let errors = {
    titleError: '',
    bodyError: ''
  };

  if (!title.length) {
    errors.titleError = 'Enter title';
  }

  if (!body.length) {
    errors.bodyError = 'Enter body';
  }

  return errors;
}