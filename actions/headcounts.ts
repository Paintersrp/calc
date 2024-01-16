import { Tables } from "@/types/supabase"
import { handleActions } from "@/lib/supabase/handlers/action/handleActions"

const {
  add: addHeadcount,
  all: getHeadcounts,
  get: getHeadcount,
  update: updateHeadcount,
  del: deleteHeadcount,
} = handleActions<Tables<"valley_counts"> & any>({
  tableName: "valley_counts",
  objectName: "Headcount",
  requiredFields: ["count"],
})

export { addHeadcount, getHeadcounts, getHeadcount, updateHeadcount, deleteHeadcount }
