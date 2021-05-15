import React from 'react';
import { Field } from "formik";
import InputMask from 'react-input-mask';
import ModalBox from './ModalBox';
import Form from '../forms/Form';
import createMealValidations from '../../helpers/validations/createMealValidations';

class MealModal extends React.Component {
  state = {
    initialValues: {
      nutriment: (this.props.meal && this.props.meal.nutriment) ? this.props.meal.nutriment : '',
      calories: (this.props.meal && this.props.meal.calories) ? this.props.meal.calories : '',
      weight: (this.props.meal && this.props.meal.weight) ? this.props.meal.weight : '',
    },
    serverErrors: {},
    generalError: '',
  };

  componentDidUpdate(prevProps) {
    if (this.props.meal !== prevProps.meal) {
      this.setState({...this.state, initialValues: {
          nutriment: (this.props.meal && this.props.meal.nutriment) ? this.props.meal.nutriment : '',
          calories: (this.props.meal && this.props.meal.calories) ? this.props.meal.calories : '',
          weight: (this.props.meal && this.props.meal.weight) ? this.props.meal.weight : '',
        }});
    }
  }

  handleFocus = (e) => {
    let newState = JSON.stringify(this.state);
    newState = JSON.parse(newState);
    delete newState.serverErrors[e.target.name];
    this.setState(newState);
  }

  onSubmit = async (values, { setSubmitting }) => {
    this.setState({...this.state, serverErrors: {}, generalError: ''});

    // let res;
    // if (this.props.meal) {
    //
    // }

    const res = this.props.meal ? await this.props.updateMeal(values, this.props.meal._id) : await this.props.createMeal(values);
    if (!res.status) {
      this.props.closeModal();
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
      <ModalBox
        modalIsOpen={this.props.modalIsOpen}
        closeModal={this.props.closeModal}
      >
        <div className="modal-box-header">
          <div className="modal-box-header-content">
            Прием пищи
          </div>
          <i
            onClick={this.props.closeModal}
            className="close icon modal-box-close-btn"
          />
        </div>

        <div className="modal-box-content">
          <div className="modal-box-content-inner">
            <Form
              initialValues={this.state.initialValues}
              onSubmit={this.onSubmit}
              validate={createMealValidations}
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
                    <div className={ (touched.nutriment && errors.nutriment) ? 'ui input w-100 error' : 'ui input w-100'}>
                      <label
                        className="w-100"
                        htmlFor="nutriment"
                      >
                        Еда
                      </label>
                      <input
                        type="text"
                        name="nutriment"
                        onFocus={this.handleFocus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nutriment}
                        placeholder="Котлетка"
                        className="d-block w-100"
                        id="nutriment"
                      />
                      {touched.nutriment && errors.nutriment && (
                        <div className="mt-5 error-msg">
                          { errors.nutriment }
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
                              placeholder="200"
                              className="d-block w-100"
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

                    <div className={ (touched.calories && errors.calories) ? 'ui input w-100 error mt-20' : 'ui input w-100 mt-20'}>
                      <label
                        className="w-100"
                        htmlFor="calories"
                      >
                        Калории
                      </label>
                      <Field
                        name="calories"
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
                              value={values.calories}
                              placeholder="345"
                              className="d-block w-100"
                              id="calories"
                            />
                          );
                        }}
                      </Field>
                      {touched.calories && errors.calories && (
                        <div className="mt-5 error-msg">
                          { errors.calories }
                        </div>
                      )}
                    </div>

                    <button
                      className="ui primary button mt-30 w-100"
                      type="submit"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                    >
                      Сохранить
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
          </div>
        </div>
      </ModalBox>
    );
  }
}

export default MealModal;
