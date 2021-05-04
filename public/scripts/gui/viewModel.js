import * as view from "./view.js"
import * as model from "./model.js"
import {dataManager} from "./dataManager.js"

export const initialize = () => {
  console.log("initialize")
  view.importModel.initialize()
  view.exportModel.initialize()
}

export const setFiles = files => {
  const file = files[0]
  const fileFullName = file.filename
  const text = file.text

  const fileName = fileFullName.split(".").slice(0,-1).join(".")
  const extend = fileFullName.split(".").reverse()[0]

  const obj = JSON.parse(text)
  const sections = obj?.sections
  const paths= obj?.paths
  const fillets = obj?.fillets
  const config= obj?.config

  dataManager.set("fileName", fileName)
  dataManager.set("fileFullName", fileFullName)
  dataManager.set("extend", extend)
  dataManager.set("sections", sections)
  dataManager.set("paths", paths)
  dataManager.set("fillets", fillets)
  dataManager.set("config", config)

  const sections2 = model.part.getLoft(sections, paths, fillets, config)
  dataManager.set("sections2", sections2)

  view.draw.draw(sections2)

}

export const getCAD = async () => {
  const sections2 = dataManager.get("sections2")
  const fileName = dataManager.get("fileName")
  const fileFullName = fileName + ".FCStd"
  const blob = await model.network.makeCADFile(sections2)
  saveAs(blob, fileFullName);
}

