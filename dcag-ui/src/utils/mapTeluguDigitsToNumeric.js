export function mapTeluguDigitsToNumeric(inputText) {
  const teluguDigitsMap = {
    "౦": "0",
    "౧": "1",
    "౨": "2",
    "౩": "3",
    "౪": "4",
    "౫": "5",
    "౬": "6",
    "౭": "7",
    "౮": "8",
    "౯": "9",
  };

  // Replace Telugu digits with corresponding numeric digits
  return inputText.replace(/[౦-౯]/g, (match) => teluguDigitsMap[match]);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate
}
