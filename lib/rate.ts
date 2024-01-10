import { toast } from "@/hooks/useToast"

export const shiftEndTimes: { [key: string]: string } = {
  FHD: "18:00",
  BHD: "18:00",
  FHN: "04:30",
  BHN10: "04:30",
  BHN12: "06:30",
}

export const shiftHoursWorked: { [key: string]: number } = {
  FHD: 10,
  BHD: 10,
  FHN: 10,
  BHN10: 10,
  BHN12: 12,
}

export const parseHoursFromFormatted = (formattedHours: string): number => {
  const [hours, minutes] = formattedHours.split(":").map(Number)
  return hours + minutes / 60
}

export const calculateRequiredRateAuto = (
  targetRate: number,
  unitsProcessed: number,
  hoursWorked: string,
  formattedRemainingHours: string
) => {
  const remainingHours = parseHoursFromFormatted(formattedRemainingHours)
  const totalHoursWorked = parseHoursFromFormatted(hoursWorked)
  const shiftHours = remainingHours + totalHoursWorked

  if (shiftHours > 24) {
    toast({
      variant: "destructive",
      title: "Detected too many hours in a shift",
      description: "Are you sure about the current rate and units processed for a daily check?",
    })

    return 0
  }

  const totalUnitsNeeded = targetRate * shiftHours - unitsProcessed
  const requiredRate = totalUnitsNeeded / remainingHours
  const formattedRate = Number(requiredRate.toFixed(2))

  return formattedRate > 0 ? formattedRate : 0
}

export const calculateRequiredRateManual = (
  targetRate: number,
  unitsProcessed: number,
  hoursWorked: string,
  remainingHours: number
): number => {
  const totalHoursWorked = parseHoursFromFormatted(hoursWorked) + remainingHours
  const totalUnitsNeeded = targetRate * totalHoursWorked - unitsProcessed

  const requiredRate = totalUnitsNeeded / remainingHours
  const formattedRate = Number(requiredRate.toFixed(2))

  if (formattedRate > 0) {
    return formattedRate
  } else {
    toast({ description: formattedRate })
    return 0
  }
}
