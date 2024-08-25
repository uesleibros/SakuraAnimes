export default function getSeason() {
  const month = new Date().getMonth() + 1;

  if (month >= 1 && month <= 3) {
    return "WINTER"; // Janeiro a Março
  } else if (month >= 4 && month <= 6) {
    return "SPRING"; // Abril a Junho
  } else if (month >= 7 && month <= 9) {
    return "SUMMER"; // Julho a Setembro
  } else if (month >= 10 && month <= 12) {
    return "FALL"; // Outubro a Dezembro
  }
}