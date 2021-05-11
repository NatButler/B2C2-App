export const groupInstruments = (acc, inst) => {
  const curr = inst.underlier.slice(0, 3);
  if (acc[curr]) {
    acc[curr].push(inst);
  } else {
    acc[curr] = [inst];
  }

  return acc;
};

export const calcTimeRemaining = (end) => {
  const difference = new Date(end) - new Date();
  let timeLeft = 0;

  if (difference > 0) {
    timeLeft = Math.floor((difference / 1000) % 60);
  }

  return timeLeft;
};

export const removeDecimal = (num) => {
  return parseFloat(num);
};

export const getDate = (created) => {
  const dateTime = new Date(created);
  return `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`;
};

export const getTime = (created) => {
  const dateTime = new Date(created);
  return dateTime.toLocaleTimeString("en-UK");
};
