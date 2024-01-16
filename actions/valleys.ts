import { Tables } from "@/types/supabase"
import { handleActions } from "@/lib/supabase/handlers/action/handleActions"

const {
  add: addValley,
  all: getValleys,
  get: getValley,
  update: updateValley,
  del: deleteValley,
} = handleActions<Tables<"valleys"> & any>({
  tableName: "valleys",
  objectName: "Valley",
  requiredFields: ["name"],
})

export { addValley, getValleys, getValley, updateValley, deleteValley }
