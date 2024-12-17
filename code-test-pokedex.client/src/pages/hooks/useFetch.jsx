import { useEffect, useState } from "react";
import axios from "axios";

//Hook used to fetch data from the api
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(url);

        if (!ignore) {
          setData(response.data);
          setError(null);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setData(null);
        setError(error);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
