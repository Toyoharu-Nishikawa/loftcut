import {cutLoftByConeAndMakeFillet} from "../../sci/geometry/index.mjs"

export const getLoft = (sections, paths, fillets, config) => {
  const sections2 = cutLoftByConeAndMakeFillet(sections, paths, fillets, config) 
  return sections2
}
