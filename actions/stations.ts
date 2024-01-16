import { Tables } from "@/types/supabase"
import { handleActions } from "@/lib/supabase/handlers/action/handleActions"

const {
  add: addStation,
  all: getStations,
  get: getStation,
  update: updateStation,
  del: deleteStation,
} = handleActions<Tables<"stations"> & any>({
  tableName: "stations",
  objectName: "Station",
  requiredFields: ["name"],
})

export { addStation, getStations, getStation, updateStation, deleteStation }
