export const useDebounce = (func: Function, timeout = 300) => {
    let timer: number | undefined;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }