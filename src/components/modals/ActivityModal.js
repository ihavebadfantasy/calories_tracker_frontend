import React from 'react';
import { Field } from 'formik';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import ModalBox from './ModalBox';
import Form from '../forms/Form';
import NumberFormat from 'react-number-format';
import createActivityValidations from '../../helpers/validations/createActivityValidations';
import { fetchCalculatedActivities } from '../../store/activities/actions';
import { Dropdown } from 'semantic-ui-react';

class ActivityModal extends React.Component {
  state = {
    initialValues: {
      name: (this.props.activity && this.props.activity.name) ? this.props.activity.name : '',
      calories: (this.props.activity && this.props.activity.calories) ? this.props.activity.calories : '',
      duration: (this.props.activity && this.props.activity.duration) ? this.props.activity.duration : '',
    },
    serverErrors: {},
    generalError: '',
    activitiesOptions: this.createActivitiesOptions(),
    selectedOption: null,
  };

  createActivitiesOptions() {
    return this.props.calculatedActivities.map((activity) => {
      return {
        key: activity._id,
        value: activity._id,
        text: activity.name,
      }
    });
  }

  async componentDidMount() {
    if (!this.props.calculatedActivities.length) {
      await this.props.fetchCalculatedActivities();
      this.setState({...this.state, activitiesOptions: this.createActivitiesOptions()});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activity !== prevProps.activity) {
      this.setState({...this.state, initialValues: {
          name: (this.props.activity && this.props.activity.name) ? this.props.activity.name : '',
          calories: (this.props.activity && this.props.activity.calories) ? this.props.activity.calories : '',
          duration: (this.props.activity && this.props.activity.duration) ? this.props.activity.duration : '',
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

    const res = this.props.activity ? await this.props.updateActivity(values, this.props.activity._id) : await this.props.createActivity(values);
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

  handleActivityNameChange = (e, handleChange, setFieldValue) => {
    const name = e.target.value;
    setFieldValue('name', name);

    this.setState({...this.state, selectedOption: null});
  }

  handleActivityNameDropdownSelect = (e, selectedOption, handleChange, setFieldValue) => {
    const id = selectedOption.value;

    let selectedActivity = this.props.calculatedActivities.find((activity) => {
      return activity._id === id;
    });

    setFieldValue('name', selectedActivity.name);
    setFieldValue('calories', selectedActivity.caloriesPerMin);
    setFieldValue('duration', 1);
    this.setState({...this.state, selectedOption: selectedActivity});
  }

  handleDurationChange = (e, handleChange, setFieldValue) => {
    const duration = e.target.value;
    setFieldValue('duration', duration);

    if (this.state.selectedOption) {
      const weight = this.props.profile.stats.averageWeight || this.props.profile.weight;
      const calories = Math.floor(this.state.selectedOption.caloriesPerMin * weight * duration);
      setFieldValue('calories', calories);
    }
  }

  render() {
    return (
      <ModalBox
        modalIsOpen={this.props.modalIsOpen}
        closeModal={this.props.closeModal}
      >
        <div className="modal-box-header">
          <div className="modal-box-header-content">
            Физическая активность
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
              validate={createActivityValidations}
            >
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => {
                errors = {...errors, ...this.state.serverErrors}

                return (
                  <form onSubmit={handleSubmit} noValidate={true}>
                    <div className={ (touched.name && errors.name) ? 'ui input w-100 error' : 'ui input w-100'}>
                      <label
                        className="w-100"
                        htmlFor="name"
                      >
                        Активность
                      </label>
                      <input
                        type="text"
                        name="name"
                        onFocus={this.handleFocus}
                        onChange={(e) => {
                          this.handleActivityNameChange(e, handleChange, setFieldValue);
                        }}
                        onBlur={handleBlur}
                        value={values.name}
                        className="d-block w-100"
                        id="name"
                        placeholder="Копал картошку"
                      />
                      <Dropdown
                        fluid
                        search
                        selection
                        options={this.state.activitiesOptions}
                        placeholder={values.name}
                        noResultsMessage='Не удалось найти активности ;('
                        onChange={(e, selectedOption) => {
                          this.handleActivityNameDropdownSelect(e, selectedOption, handleChange, setFieldValue);
                        }}
                        value={values.name}
                        className="mt-5"
                      />
                      {touched.name && errors.name && (
                        <div className="mt-5 error-msg d-block">
                          { errors.name }
                        </div>
                      )}
                    </div>

                    <div className={ (touched.duration && errors.duration) ? 'ui input w-100 error mt-20' : 'ui input w-100 mt-20'}>
                      <label
                        className="w-100"
                        htmlFor="duration"
                      >
                        Продолжительность (мин)
                      </label>
                      <Field
                        name="duration"
                      >
                        {({ field }) => {
                          return (
                            <InputMask
                              {...field}
                              maskChar={null}
                              mask="999"
                              type="phone"
                              onFocus={this.handleFocus}
                              onChange={(e) => {
                                this.handleDurationChange(e, handleChange, setFieldValue);
                              }}
                              onBlur={handleBlur}
                              value={values.duration}
                              placeholder="40"
                              className="d-block w-100"
                              id="duration"
                            />
                          );
                        }}
                      </Field>
                      {touched.duration && errors.duration && (
                        <div className="mt-5 error-msg d-block">
                          { errors.duration }
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
                          <NumberFormat
                            {...field}
                            className="d-block w-100"
                            type="tel"
                            onFocus={this.handleFocus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.calories}
                            placeholder="345"
                            placeholder="55"
                          />
                          );
                        }}
                      </Field>
                      {touched.calories && errors.calories && (
                        <div className="mt-5 error-msg d-block">
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

const mapStateToProps = (state) => {
  return {
    calculatedActivities: state.activities.calculatedActivities,
    profile: state.user.profile,
  };
}

const mapDispatchToProps = {
  fetchCalculatedActivities,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
