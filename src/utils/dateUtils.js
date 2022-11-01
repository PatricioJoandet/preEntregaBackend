const getTimeStamp = () =>{
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const DATE_UTILS = {
  getTimeStamp,
};