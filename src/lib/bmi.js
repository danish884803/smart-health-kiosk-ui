export function calculateBMI(heightCm, weightKg) {
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);

  let status = "Normal";
  if (bmi < 18.5) status = "Underweight";
  else if (bmi >= 25 && bmi < 30) status = "Overweight";
  else if (bmi >= 30) status = "Obese";

  return { bmi: bmi.toFixed(1), status };
}
