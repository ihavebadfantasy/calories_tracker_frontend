import { useState, useEffect } from 'react';

const Input = ({
    name,
    label = '',
    placeholder = '',
    type = 'text',
    value = '',
    required,
    onInputChange
  }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value) {
      onInputChange({
        target: {
          name,
          value,
        }
      });
    }
  }, []);

  const onChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e);
  }

  return (
    <div className="field">
      {label && <label> { label } </label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
}

Input.isFormInput = true;

export default Input;
