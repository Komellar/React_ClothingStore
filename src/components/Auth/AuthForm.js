import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/use-auth';
import useInput from '../../hooks/use-input';

import { loginUser, registerUser, updateUser } from '../../lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogging, setIsLogging] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [avatarImage, setAvatarImage] = useState(
    `https://avatars.dicebear.com/api/personas/happy.svg`
  );

  const {
    sendRequest: registerRequest,
    error: registerError,
    isLoading: registerIsLoading,
  } = useAuth(registerUser, updateUser);

  const {
    sendRequest: loginRequest,
    error: loginError,
    isLoading: loginIsLoading,
  } = useAuth(loginUser);

  const switchAuthModeHandler = () => {
    setIsLogging(!isLogging);
  };

  const {
    inputValue: enteredName,
    isTouched: nameIsTouched,
    isValid: nameIsValid,
    error: nameError,
    changeValue: nameChangeHandler,
    checkValidity: nameCheckHandler,
  } = useInput();

  const {
    inputValue: enteredEmail,
    isTouched: emailIsTouched,
    isValid: emailIsValid,
    error: emailError,
    changeValue: emailChangeHandler,
    checkValidity: emailCheckHandler,
  } = useInput((value) => /^\S+@\S+\.\S+$/.test(value), 'Invalid email!');

  const {
    inputValue: enteredPassword,
    isTouched: passwordIsTouched,
    isValid: passwordIsValid,
    error: passwordError,
    changeValue: passwordChangeHandler,
    checkValidity: passwordCheckHandler,
  } = useInput();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (
        emailIsTouched &&
        emailIsValid &&
        passwordIsTouched &&
        passwordIsValid
      ) {
        if (isLogging) {
          setFormIsValid(true);
        } else if (!isLogging && nameIsTouched && nameIsValid) {
          setFormIsValid(true);
        } else {
          setFormIsValid(false);
        }
      } else {
        setFormIsValid(false);
      }
    }

    return () => (mounted = false);
  }, [
    isLogging,
    nameIsTouched,
    nameIsValid,
    emailIsTouched,
    emailIsValid,
    passwordIsTouched,
    passwordIsValid,
  ]);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (formIsValid) {
      if (isLogging) {
        await loginRequest({
          email: enteredEmail,
          password: enteredPassword,
        });
      } else {
        await registerRequest({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          photoUrl: avatarImage,
        });
      }
    }
  };

  const buttonClasses = !formIsValid ? classes.disabled : '';

  const changeAvatarHandler = () => {
    setAvatarImage(
      `https://avatars.dicebear.com/api/personas/${Math.random()
        .toString(36)
        .substr(2, 5)}.svg`
    );
  };

  return (
    <section className={classes.auth}>
      <h2>{isLogging ? 'Login' : 'Sign up'}</h2>
      <form onSubmit={submitFormHandler}>
        {!isLogging && (
          <div className={classes.avatar}>
            <img
              src={avatarImage}
              alt="Avatar"
              className={classes['avatar-img']}
            />
            <FontAwesomeIcon
              icon="redo-alt"
              className={classes.icon}
              onClick={changeAvatarHandler}
            />
          </div>
        )}
        {!isLogging && (
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              ref={nameInputRef}
              value={enteredName}
              onChange={() => nameChangeHandler(nameInputRef.current.value)}
              onBlur={nameCheckHandler}
            />
            {!nameIsValid && <p className={classes.error}>{nameError}</p>}
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            ref={emailInputRef}
            onChange={() => emailChangeHandler(emailInputRef.current.value)}
            onBlur={emailCheckHandler}
          />
          {!emailIsValid && <p className={classes.error}>{emailError}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            ref={passwordInputRef}
            onChange={() =>
              passwordChangeHandler(passwordInputRef.current.value)
            }
            onBlur={passwordCheckHandler}
          />
          {!passwordIsValid && <p className={classes.error}>{passwordError}</p>}
        </div>
        <div className={classes.actions}>
          {!loginIsLoading && !registerIsLoading && (
            <button type="submit" className={buttonClasses}>
              {isLogging ? 'Login' : 'Sign up'}
            </button>
          )}
          {(loginIsLoading || registerIsLoading) && <p>Loading...</p>}
          {loginError && <p className={classes.error}>{loginError}</p>}
          {registerError && <p className={classes.error}>{registerError}</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogging ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
