export const generateCSV = data =>
  data
    .map(row => row.map(item => item.replace(',', ',').replace('\n', '\\n')).join(','))
    .join('\n');

export const downloadCSVFile = (file) => {
  const date = new Date();
  const filename = `LU Timer Report ${date.toLocaleDateString()}.csv`;

  const result = encodeURI(`data:text/csv;charset=utf-8,${file}`);
  const link = document.createElement('a');
  link.setAttribute('href', result);
  link.setAttribute('download', filename);
  link.click();
};

export const mergeTimersWithLogs = (timers, logs) =>
  logs.map(log => ({ ...timers[log.id], ...log }));

export const formatTime = (total) => {
  const seconds = Math.floor(total % 60);
  const minutes = Math.floor(total / 60) % 60;
  const hours = Math.floor(total / 60 / 60);

  const resultSeconds = String(seconds).length === 1 ? `0${seconds}` : seconds;
  const resultMinutes = String(minutes).length === 1 ? `0${minutes}` : minutes;
  const resultHours = String(hours).length === 1 ? `0${hours}` : hours;

  return `${resultHours}:${resultMinutes}:${resultSeconds}`;
};
