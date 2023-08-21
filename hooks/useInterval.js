export default function useInterval(callback, delay, deps = []) {
  useEffect(() => {
    const id = setInterval(callback, delay);

    return () => clearInterval(id);
  }, [ delay, ...deps ]
  );
};