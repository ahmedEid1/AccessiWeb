export const storeInCache = (name: string, data: string | unknown) => {
  try {
    window.localStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    console.log("storeInCache ", error);
  }
};

export const getFromCache = (key: string) => {
  try {
    const data = window.localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
  } catch (error) {
    console.log("getFromCache", error);
    return null;
  }
};
