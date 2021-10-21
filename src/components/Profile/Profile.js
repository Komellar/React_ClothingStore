import { useState, useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import useInput from '../../hooks/use-input';
import { changeUserPassword, getUserData } from '../../lib/api';

import classes from './Profile.module.css';

const Profile = () => {
  const [isResettingPwd, setIsResettingPwd] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const newPasswordInputRef = useRef();

  const {
    inputValue: newPasswordValue,
    isTouched: newPasswordIsTouched,
    isValid: newPasswordIsValid,
    error: newPasswordError,
    changeValue: changeNewPassword,
    checkValidity: checkNewPassword,
  } = useInput();

  const token = localStorage.getItem('token');
  const { sendRequest: getUserRequest, data: userData } = useHttp(getUserData);

  const { sendRequest: changePasswordRequest, error: pwdError } =
    useHttp(changeUserPassword);

  useEffect(() => {
    getUserRequest({ idToken: token });
  }, [getUserRequest, token]);

  const resetPasswordHandler = () => {
    setIsResettingPwd(true);
  };

  const newPasswordSubmitHandler = async (event) => {
    event.preventDefault();

    if (!passwordUpdated) {
      if (newPasswordIsTouched && newPasswordIsValid) {
        await changePasswordRequest({
          idToken: token,
          password: newPasswordValue,
        });
        setPasswordUpdated(true);
        if (!pwdError) {
          setIsResettingPwd(false);
        }
      }
    }
  };

  return (
    <section className={classes['profile-content']}>
      <h2>Profile</h2>
      {userData.data && (
        <div>
          <img
            src={userData.data.users[0].photoUrl}
            className={classes['profile-avatar']}
            alt="User's avatar"
          />
          <h4>{userData.data.users[0].displayName}</h4>
          {!isResettingPwd && !passwordUpdated && (
            <button
              className={classes['reset-btn']}
              onClick={resetPasswordHandler}
            >
              Reset Password
            </button>
          )}
          {!isResettingPwd && passwordUpdated && (
            <p className={classes.correct}>Password updated!</p>
          )}
          {isResettingPwd && (
            <form
              className={classes['password-form']}
              onSubmit={newPasswordSubmitHandler}
            >
              <label htmlFor="password" className={classes.label}>
                New Password
              </label>
              <input
                className={classes.password}
                type="password"
                name="password"
                ref={newPasswordInputRef}
                onChange={() =>
                  changeNewPassword(newPasswordInputRef.current.value)
                }
                onBlur={checkNewPassword}
              />
              {!newPasswordIsValid && (
                <p className={classes.error}>{newPasswordError}</p>
              )}
              {pwdError && <p className={classes.error}>{pwdError}</p>}
              <button type="submit" className={classes['submit-password']}>
                Submit
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
