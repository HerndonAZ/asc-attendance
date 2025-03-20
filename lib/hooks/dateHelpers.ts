const timeZone = 'America/Phoenix';
const currentDate = new Date();
const phoenixDate = new Date(currentDate.toLocaleString('en-US', { timeZone }));
const year = phoenixDate.getFullYear();
const month = phoenixDate.getMonth() + 1;

export const getToday = () => {
  const day = phoenixDate.getDate();
  if (day) {
    return `${year}-${month}-${day}` as string;
  }
};

export const getYesterday = () => {
  const day = phoenixDate.getDate() - 1;
  if (day) {
    return `${year}-${month}-${day}` as string;
  }
};
