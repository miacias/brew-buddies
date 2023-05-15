// formats a zip code into US short-styled zip

export default function formatZipCode(fullZipCode) {
  // checks if string contains hyphen
  const hasHyphen = fullZipCode.includes('-');
  
  // removes the last five digits
  const zipWithoutLastFiveDigits = fullZipCode.slice(0, -5);
  
  // removes the hyphen if exists
  const shortZip = hasHyphen ? zipWithoutLastFiveDigits.replace('-', '') : zipWithoutLastFiveDigits;

  return shortZip;
}