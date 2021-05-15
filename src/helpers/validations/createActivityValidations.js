const createActivityValidations = values => {
  const errors = {};

  if (!values.calories) {
    errors.calories = 'Обязательное поле';
  }

  if (!values.duration) {
    errors.duration = 'Обязательное поле';
  }

  return errors;
}

export default createActivityValidations;
