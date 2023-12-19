export const formatDecimalHours = (decimalHours: number): string => {
  let hours = Math.floor(decimalHours)
  let minutes = Math.round((decimalHours - hours) * 60)

  if (minutes === 60) {
    hours += 1
    minutes = 0
  }

  const formattedHours = `${hours}:${minutes.toString().padStart(2, "0")}`

  return formattedHours
}
