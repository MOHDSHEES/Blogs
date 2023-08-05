function FormatDate(date) {
  const dateObj = new Date(date);

  // Format the date into a readable string
  const formattedDate = dateObj.toLocaleDateString(); // Date part only
  const formattedTime = dateObj.toLocaleTimeString(); // Time part only

  return formattedDate + " (" + formattedTime + ")";
}

export default FormatDate;
