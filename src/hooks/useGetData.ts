import { useEffect, useState, useCallback } from "react";

import axios, { AxiosError } from "axios";
import { Result } from "../types/profiles.type";

const useGetData = (profileCount: number) => {
  const [resource, setResource] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const defaultProfileCount = 20;

  const getPeopleList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}?results=${
          profileCount || defaultProfileCount
        }`
      );
      const { results = [] } = response?.data ?? {};

      if (profileCount) {
        setResource((prev: Result[]) => [...prev, ...results]);
        return;
      }
      setResource(results);
    } catch (err) {
      const castedError = err as AxiosError;
      setError(castedError);
    } finally {
      setLoading(false);
    }
  }, [profileCount]);

  useEffect(() => {
    getPeopleList();
  }, [profileCount, getPeopleList]);

  const refetch = () => {
    getPeopleList();
  };

  return { resource, setResource, refetch, error, loading };
};

export default useGetData;
