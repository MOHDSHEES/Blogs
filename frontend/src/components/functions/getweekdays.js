function getWeekDatesFromDate(dateString) {
  const date = new Date(dateString);
  const currentDayOfWeek = date.getDay();
  const daysSincePreviousSunday = currentDayOfWeek === 0 ? 0 : currentDayOfWeek;
  const previousSunday = new Date(date);
  previousSunday.setDate(date.getDate() - daysSincePreviousSunday);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(previousSunday);
    currentDate.setDate(previousSunday.getDate() + i);
    weekDates.push(currentDate.toISOString().slice(0, 10));
  }

  return weekDates;
}

export { getWeekDatesFromDate };
