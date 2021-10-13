import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { authActions } from '../store/auth-slice';

const useAuth = (requestFunction, updateUserFunction) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestData, mounted = true) => {
      if (mounted) {
        setIsLoading(true);
        try {
          const response = await requestFunction({
            email: requestData.email,
            password: requestData.password,
          });
          console.log(response);
          if (updateUserFunction) {
            const userResponse = await updateUserFunction({
              idToken: response.data.idToken,
              name: requestData.name,
            });
            console.log(userResponse);
          }
          setIsLoading(false);
          dispatch(authActions.login(response.data.idToken));
          history.replace('/products');
        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
      }
    },

    [requestFunction, dispatch, history, updateUserFunction]
  );

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useAuth;
