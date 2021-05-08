const registerValidations = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Неверный формат email';
  }

  if (!values.password) {
    errors.password = 'Обязательное поле';
  } else if (values.password.length < 5) {
    errors.password = 'Пароль должен содержать минимум 5 символов';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Обязательное поле';
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Подтверждение пароля и пароль должны совпадать'
  }

  return errors;
}

export default registerValidations;
