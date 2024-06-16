

export const formatTime = (timeValue) => {
    const dateObject = new Date(timeValue); // Преобразуем миллисекунды в объект Date
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  export const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};