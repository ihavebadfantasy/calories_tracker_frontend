import React from 'react';
import { Formik } from 'formik';

class Form extends React.Component {
  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        validate={this.props.validate}
      >
        {this.props.children}
      </Formik>
    );
  }
}

export default Form;
