const createProfileValidations = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Обязательное поле';
  }

  if (!values.weight) {
    errors.weight = 'Обязательное поле';
  }

  if (!values.caloriesPerDay) {
    errors.caloriesPerDay = 'Обязательное поле';
  }

  if (!values.age) {
    errors.age = 'Обязательное поле';
  }

  return errors;
}

export default createProfileValidations;
