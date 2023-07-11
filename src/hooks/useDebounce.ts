import { useEffect, useRef } from "react";

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 250
) {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedFunction;
}