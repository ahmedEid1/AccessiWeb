export const getFromCache = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const storeInCache = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeFromCache = (key: string) => {
  localStorage.removeItem(key);
};
