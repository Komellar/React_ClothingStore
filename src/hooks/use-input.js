import { useState } from 'react';

const validSymbols = /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"#^.?,!\s]+$/;
const hasValidSymbols = (value) => validSymbols.test(value);
const isMinLength = (value) => value.trim().length > 2;

const useInput = (
  enteredValidation = hasValidSymbols,
  enteredValidationError = 'Use only valid symbols!'
) => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);

  const changeValue = (enteredValue) => {
    setInputValue(enteredValue);
  };

  const checkValidity = () => {
    const validity =
      isMinLength(inputValue) && enteredValidation(inputValue) ? true : false;

    const validationError = () => {
      if (!validity) {
        if (!isMinLength(inputValue)) {
          return 'Value is too short!';
        } else if (!enteredValidation(inputValue)) {
          return enteredValidationError;
        }
      } else {
        return null;
      }
    };

    setIsTouched(true);
    setIsValid(validity);
    setError(validationError);
  };

  return {
    inputValue,
    isTouched,
    isValid,
    error,
    changeValue,
    checkValidity,
  };
};

export default useInput;
