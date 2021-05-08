import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../store/user/actions';
import FormCard from '../forms/FormCard';
import Form from '../forms/Form';
import loginValidations from '../../helpers/validations/loginValidations';
import routes from '../navigation/routes';

class Login extends React.Component {
  state = {
    initialValues: {
      email: '',
      password: '',
    },
    serverErrors: {},
    generalError: '',
  };

  handleFocus = (e) => {
    let newState = JSON.stringify(this.state);
    newState = JSON.parse(newState);
    delete newState.serverErrors[e.target.name];
    this.setState(newState);
  }

  onSubmit = async (values, { setSubmitting }) => {
    this.setState({...this.state, serverErrors: {}, generalError: ''});

    const res = await this.props.loginUser(values);
    if (!res.status) {
      this.props.history.push(routes.home);

      return;
    }

    if (res.data.errors && res.data.errors.length) {
      res.data.errors.forEach((error) => {
        this.state.serverErrors[error.param] = error.msg;
      });
      setSubmitting(false);

      return;
    }

    this.setState({...this.state, generalError: res.data.error.message})
    setSubmitting(false);
  }

  render() {
    return (
      <div className="content-centered mt-60-resp">
        <FormCard>
          <Form
            initialValues={this.state.initialValues}
            onSubmit={this.onSubmit}
            validate={loginValidations}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => {
              errors = {...errors, ...this.state.serverErrors}
              return (
                <form onSubmit={handleSubmit} noValidate={true}>
                  <div className={ (touched.email && errors.email) ? 'ui input w-100 error' : 'ui input w-100'}>
                    <label
                      className="w-100"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onFocus={this.handleFocus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="mail@mail.com"
                      className="d-block"
                      id="email"
                    />
                    {touched.email && errors.email && (
                      <div className="mt-5 error-msg">
                        { errors.email }
                      </div>
                    )}
                  </div>
                  <div className={ (touched.password && errors.password) ? 'ui input w-100 error mt-20' : 'ui input w-100 mt-20'}>
                    <label
                      className="w-100"
                      htmlFor="password"
                    >
                      Пароль
                    </label>
                    <input
                      type="password"
                      name="password"
                      onFocus={this.handleFocus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="******"
                      className="d-block"
                      id="password"
                    />
                    {touched.password && errors.password && (
                      <div className="mt-5 error-msg">
                        { errors.password }
                      </div>
                    )}
                  </div>
                  <button
                    className="ui primary button mt-30 w-100"
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Войти
                  </button>
                  {this.state.generalError && (
                    <div className="mt-10 error-msg">
                      { this.state.generalError }
                    </div>
                  )}
                </form>
              )
            }}
          </Form>

          <div className="content-centered mt-10">
            <Link
              to={routes.register}
            >
              Зарегистрироваться
            </Link>
          </div>
        </FormCard>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
