const createMealValidations = values => {
  const errors = {};

  if (!values.calories) {
    errors.calories = 'Обязательное поле';
  }

  return errors;
}

export default createMealValidations;
