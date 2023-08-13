import { useState, useEffect } from "react";
import axios from 'axios';

const useFetchHook = () => {

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    
    setIsLoading(true);
    setResult(null);
    setError(null);

    async function getData() {
        try {
            const response = await axios.post(url, body);
            const data = await response.data;
            setResult(data);
            setIsLoading(false);
        } catch(error) {
            console.log("Error from axios: ", error);
            setError(error);
        }
    }

  }, []);

  return [result, error, isLoading];
};

export default useFetchHook;
