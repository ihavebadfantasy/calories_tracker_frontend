const createMealValidations = values => {
  const errors = {};

  if (!values.calories) {
    errors.email = 'Обязательное поле';
  }

  return errors;
}

export default createMealValidations;
