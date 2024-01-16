import { AnimatePresence, motion } from "framer-motion"

import { useCountAnimation } from "@/hooks/useCountAnimation"

const ValleyCountDisplay: React.FC<{ valleyCount: any }> = ({ valleyCount }) => {
  const { displayNumber, previousNumber } = useCountAnimation(valleyCount.count ?? 0)

  // Function to determine the color based on the difference
  const getColorBasedOnDifference = (current: number, previous: number) => {
    const difference = current - previous
    if (difference > 0) return "text-green-500" // Positive difference
    if (difference < 0) return "text-red-500" // Negative difference
    return "text-gray-500" // No difference
  }

  const difference = displayNumber - previousNumber
  const previousNumberColor = getColorBasedOnDifference(displayNumber, previousNumber)

  return (
    <section className="p-4 shadow rounded-lg flex justify-between items-center border">
      <h2 className="text-xl font-bol">Valley {valleyCount.valley_id}</h2>
      <div className="flex flex-col items-center space-x-2">
        <motion.span className="text-lg font-semibold">{displayNumber}</motion.span>
        <AnimatePresence mode="wait">
          {previousNumber !== null && (
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              key={previousNumber}
              className="flex flex-col items-center"
            >
              <motion.span className={`text-sm font-medium ${previousNumberColor}`}>
                (Previously: {previousNumber})
              </motion.span>
              <motion.span className={`text-xs ${previousNumberColor}`}>
                {difference !== 0 ? ` (${difference > 0 ? "+" : ""}${difference})` : ""}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export { ValleyCountDisplay }
