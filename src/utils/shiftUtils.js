import { ref } from 'vue';

export const shiftTimeLeft = ref("00:00:00");

const getNextShiftEndTime = () => {
  const now = new Date();
  const currentHours = now.getHours();
  const nextShiftEnd = new Date(now);

  if (currentHours >= 21) {
    nextShiftEnd.setDate(nextShiftEnd.getDate() + 1);
    nextShiftEnd.setHours(9, 0, 0, 0);
  } else if (currentHours >= 9 && currentHours < 21) {
    nextShiftEnd.setHours(21, 0, 0, 0);
  } else {
    nextShiftEnd.setHours(9, 0, 0, 0);
  }

  return nextShiftEnd;
};

export const calculateTimeLeft = () => {
  const now = new Date();
  const end = getNextShiftEndTime();
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

export const startShiftCountdown = (handleShiftEnd) => {
  const interval = setInterval(() => {
    shiftTimeLeft.value = calculateTimeLeft();
    if (shiftTimeLeft.value === "00:00:00") {
      clearInterval(interval);
      handleShiftEnd();
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if ((hours === 9 || hours === 21) && minutes === 0 && seconds === 0) {
      handleShiftEnd();
    }
  }, 1000);
};