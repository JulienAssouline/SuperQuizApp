import {useEffect, useState} from 'react';
import {api} from '../service';

export const useQuery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fethData = async () => {
    setLoading(true);

    try {
      const result = await api();
      setData(result.data);
      //   setTimeCounter(result.data[0].time);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fethData();
  }, []);

  return {data, loading, error};
};
