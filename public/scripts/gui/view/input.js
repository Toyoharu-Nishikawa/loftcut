import {redraw} from "../viewModel.js"
import {dataManager} from "../dataManager.js"

const elements = {
  topFilletR: document.getElementById("topFilletRadius"),
  bottomFilletR: document.getElementById("bottomFilletRadius"),
  topFilletD: document.getElementById("topFilletDivisions"),
  mainZoneD: document.getElementById("mainZoneDivisions"),
  bottomFilletD: document.getElementById("bottomFilletDivisions"),
}

const tfr = (e) => {
  const value = parseFloat(e.target.value)||null
  console.log("value", value, e.target.value)
  const fillets = dataManager.get("fillets")
  fillets.top = value
  dataManager.set("fillets", fillets)
  redraw()
}

const bfr = (e) => {
  const value = parseFloat(e.target.value) ||null
  const fillets = dataManager.get("fillets")
  fillets.bottom = value
  dataManager.set("fillets", fillets)
  redraw()
}

const tfd = (e) => {
  const value = parseFloat(e.target.value) ||null
  const config = dataManager.get("config")
  config.topFilletDivisions = value
  dataManager.set("config", config)
  redraw()
}

const mzd = (e) => {
  const value = parseFloat(e.target.value) || null
  const config = dataManager.get("config")
  config.mainDivisions = value
  dataManager.set("config", config)
  redraw()
}

const bfd = (e) => {
  const value = parseFloat(e.target.value) || null
  console.log("value",value, e.target.value)
  const config = dataManager.get("config")
  config.bottomFilletDivisions = value
  dataManager.set("config", config)
  redraw()
}

export const setFillets = (fillets) =>{
  elements.topFilletR.value = fillets?.top || null
  elements.bottomFilletR.value = fillets?.bottom || null
}

export const setConfig = (config) =>{
  elements.topFilletD.value = config?.topFilletDivisions || null
  elements.mainZoneD.value = config?.mainDivisions || null
  elements.bottomFilletD.value = config?.bottomFilletDivisions || null
}


export const initialize = () => {
  elements.topFilletR.onchange = tfr 
  elements.bottomFilletR.onchange = bfr 
  elements.topFilletD.onchange = tfd 
  elements.mainZoneD.onchange = mzd 
  elements.bottomFilletD.onchange = bfd
 }

