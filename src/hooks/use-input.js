import {
  useState,
  // useCallback
} from 'react';

const validSymbols = /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"#^.?,!\s]+$/;
const isMinLength = (value) => value.trim().length > 2;
const hasValidSymbols = (value) => validSymbols.test(value);

const useInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);

  const changeValue = (enteredValue) => {
    setInputValue(enteredValue);
  };

  const checkValidity = () => {
    const validity =
      !isMinLength(inputValue) || !hasValidSymbols(inputValue) ? false : true;

    const validationError = () => {
      if (!isMinLength(inputValue)) {
        return 'Value is too short!';
      } else if (!hasValidSymbols(inputValue)) {
        return 'Use only valid symbols!';
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
