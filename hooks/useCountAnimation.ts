import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"

const useCountAnimation = (targetNumber: number) => {
  const [displayNumber, setDisplayNumber] = useState<number>(targetNumber)
  const [previousNumber, setPreviousNumber] = useState<number>(0)
  const previousTargetRef = useRef<number>(targetNumber)

  useEffect(() => {
    if (previousTargetRef.current !== targetNumber) {
      setPreviousNumber(previousTargetRef.current)
      previousTargetRef.current = targetNumber
    }

    const controls = animate(displayNumber, targetNumber, {
      duration: 0.5,
      ease: "linear",
      onUpdate: (value) => setDisplayNumber(Math.round(value)),
    })

    return () => controls.stop()
  }, [targetNumber, displayNumber])

  return { displayNumber, previousNumber }
}

export { useCountAnimation }
