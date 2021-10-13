import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../store/auth-slice';
import classes from './LoginButton.module.css';

const LoginButton = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  let content = (
    <Link to={`/auth`} className={classes['auth-btn']}>
      Login
    </Link>
  );

  if (isLogged) {
    content = (
      <Link
        to={`/products`}
        className={classes['auth-btn']}
        onClick={logoutHandler}
      >
        Logout
      </Link>
    );
  }

  return <div>{content}</div>;
};

export default LoginButton;
