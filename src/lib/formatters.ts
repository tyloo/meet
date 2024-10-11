export function formatEventDescription(durationInMinutes: number) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const hoursString = `${hours} ${hours > 1 ? "hrs" : "hr"}`;
  const minutesString = `${minutes} ${minutes > 1 ? "mins" : "min"}`;

  if (hours === 0) {
    return minutesString;
  }
  if (minutes === 0) {
    return hoursString;
  }

  return `${hoursString} ${minutesString}`;
}
