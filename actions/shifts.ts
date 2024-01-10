import { handleActions } from "@/lib/supabase/handlers/action/handleActions"
import { ShiftRequest } from "@/lib/validators/shifts"

const {
  add: addShift,
  all: getShifts,
  get: getShift,
  update: updateShift,
  del: deleteShift,
} = handleActions<ShiftRequest>({
  tableName: "shifts",
  objectName: "Shift",
  requiredFields: ["name"],
})

export { addShift, getShifts, getShift, updateShift, deleteShift }
