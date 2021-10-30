import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './ProfileButton.module.css';

const ProfileButton = () => {
  const isLogged = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLogged && (
        <Link
          to={'/React_ClothingStore/profile'}
          className={classes['profile-btn']}
        >
          Profile
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;
