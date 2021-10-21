import { useCallback, useState } from 'react';

const useHttp = (requestFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const sendRequest = useCallback(
    async (requestData, mounted = true) => {
      if (mounted) {
        setIsLoading(true);
        try {
          const responseData = await requestFunction(requestData);
          setData(responseData);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setError(err.message || 'Something went wrong!');
        }
      }
    },

    [requestFunction]
  );

  return {
    sendRequest,
    data,
    isLoading,
    error,
  };
};

export default useHttp;
