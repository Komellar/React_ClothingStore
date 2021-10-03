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

// const useHttp = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const sendRequest = useCallback(async (requestConfig, applyData, mounted) => {
//     if (mounted) {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(requestConfig.url, {
//           method: requestConfig.method ? requestConfig.method : 'GET',
//           headers: requestConfig.headers ? requestConfig.headers : {},
//           body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
//         });

//         if (!response.ok) {
//           throw new Error('Request failed');
//         }

//         console.log('Hook mounted');
//         const data = await response.json();
//         applyData(data);
//       } catch (err) {
//         setError(err.message || 'Something went wrong!');
//       }
//       setIsLoading(false);
//     } else {
//       console.log('Hook Unmounted');
//     }
//   }, []);

//   return {
//     isLoading,
//     error,
//     sendRequest,
//   };
// };

export default useHttp;
