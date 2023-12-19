export const calculateRemainingHours = (endTime: string): number => {
  const currentTime = new Date()
  let endTimeToday = new Date(`${currentTime.toDateString()} ${endTime}`)

  if (endTimeToday < currentTime) {
    endTimeToday = new Date(endTimeToday.getTime() + 24 * 60 * 60 * 1000)
  }

  const differenceInMilliseconds = endTimeToday.getTime() - currentTime.getTime()
  return differenceInMilliseconds / (1000 * 60 * 60)
}
