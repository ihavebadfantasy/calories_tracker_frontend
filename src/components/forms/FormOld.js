import React, { useState, useEffect } from 'react';
import { Api } from '../../api/Api';

const FormOld = ({ children, url }) => {
  const [ credentials, setCredentials ] = useState({});

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.$instance.post(url, credentials);
    console.log(res.response);
  }

  const onInputChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <form
      className="ui form"
      onSubmit={onFormSubmit}
      noValidate={true}
    >
      {children(onInputChange)}
    </form>
  );
}

export default FormOld;
