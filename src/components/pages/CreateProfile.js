import React from 'react';
import { connect } from 'react-redux';
import { Field } from "formik";
import { createUserProfile } from '../../store/user/actions';
import FormCard from '../forms/FormCard';
import Form from '../forms/Form';
import createProfileValidations from '../../helpers/validations/createProfileValidations';
import routes from '../navigation/routes';
import InputMask from 'react-input-mask';

class CreateProfile extends React.Component {

  state = {
    initialValues: {
      username: this.props.profile ? this.props.profile.username : '',
      weight: '',
      caloriesPerDay: '',
      age: '',
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

    const res = await this.props.createUserProfile(values);
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
            validate={createProfileValidations}
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
                  <div className={ (touched.username && errors.username) ? 'ui input w-100 error' : 'ui input w-100'}>
                    <label
                      className="w-100"
                      htmlFor="username"
                    >
                      Никнейм
                    </label>
                    <input
                      type="text"
                      name="username"
                      onFocus={this.handleFocus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Cool Person"
                      className="d-block"
                      id="username"
                    />
                    {touched.username && errors.username && (
                      <div className="mt-5 error-msg">
                        { errors.username }
                      </div>
                    )}
                  </div>

                  <div className={ (touched.weight && errors.weight) ? 'ui input w-100 error mt-20' : 'ui input w-100 mt-20'}>
                    <label
                      className="w-100"
                      htmlFor="weight"
                    >
                      Вес
                    </label>
                    <Field
                      name="weight"
                    >
                      {({ field }) => {
                        return (
                          <InputMask
                            {...field}
                            maskChar={null}
                            mask="999"
                            type="phone"
                            onFocus={this.handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.weight}
                            placeholder="55"
                            className="d-block"
                            id="weight"
                          />
                        );
                      }}
                    </Field>
                    {touched.weight && errors.weight && (
                      <div className="mt-5 error-msg">
                        { errors.weight }
                      </div>
                    )}
                  </div>

                  <div className={ (touched.caloriesPerDay && errors.caloriesPerDay) ? 'ui input w-100 error mt-20' : 'ui input w-100 mt-20'}>
                    <label
                      className="w-100"
                      htmlFor="caloriesPerDay"
                    >
                      Норма калорий в день
                    </label>
                    <Field
                      name="caloriesPerDay"
                    >
                      {({ field }) => {
                        return (
                          <InputMask
                            {...field}
                            maskChar={null}
                            mask="99999"
                            type="phone"
                            onFocus={this.handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.caloriesPerDay}
                            placeholder="2000"
                            className="d-block"
                            id="caloriesPerDay"
                          />
                        );
                      }}
                    </Field>
                    {touched.caloriesPerDay && errors.caloriesPerDay && (
                      <div className="mt-5 error-msg">
                        { errors.caloriesPerDay }
                      </div>
                    )}
                  </div>

                  <div className={ (touched.age && errors.age) ? 'ui input w-100 error mt-20' : 'ui input w-100 mt-20'}>
                    <label
                      className="w-100"
                      htmlFor="age"
                    >
                      Возраст
                    </label>
                    <Field
                      name="age"
                    >
                      {({ field }) => {
                        return (
                          <InputMask
                            {...field}
                            maskChar={null}
                            mask="999"
                            type="phone"
                            onFocus={this.handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.age}
                            placeholder="22"
                            className="d-block"
                            id="age"
                          />
                        );
                      }}
                    </Field>
                    {touched.age && errors.age && (
                      <div className="mt-5 error-msg">
                        { errors.age }
                      </div>
                    )}
                  </div>

                  <button
                    className="ui primary button mt-30 w-100"
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Создать профиль
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
        </FormCard>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
}

const mapDispatchToProps = {
  createUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
