import { ref } from 'vue';

export const shiftTimeLeft = ref("00:00:00");

export const calculateTimeLeft = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;

  if (diff < 0) return "00:00:00";

  const hours = Math.floor(diff / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const startShiftCountdown = (shiftEndTime, handleShiftEnd) => {
  const interval = setInterval(() => {
    if (shiftEndTime) {
      shiftTimeLeft.value = calculateTimeLeft(shiftEndTime);
      if (shiftTimeLeft.value === "00:00:00") {
        clearInterval(interval);
        handleShiftEnd();
      }
    }
  }, 1000);
};

export const handleShiftEnd = () => {
    console.log("Смена завершена");
};