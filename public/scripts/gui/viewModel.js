import * as view from "./view.js"
import * as model from "./model.js"
import {dataManager} from "./dataManager.js"

export const initialize = () => {
  console.log("initialize")
  view.importModel.initialize()
  view.exportModel.initialize()
  view.save.initialize()
  view.tables.initialize()
  view.input.initialize()
  view.draw.initialize()
}

export const setFiles = files => {
  const file = files[0]
  const fileFullName = file.filename
  const text = file.text

  const fileName = fileFullName.split(".").slice(0,-1).join(".")
  const extend = fileFullName.split(".").reverse()[0]

  dataManager.set("fileName", fileName)
  dataManager.set("fileFullName", fileFullName)
  dataManager.set("extend", extend)

  let sections, paths, fillets, config, sections2

  switch(extend){
    case "json":{
      const obj = JSON.parse(text)
      sections = obj?.sections
      paths= obj?.paths
      fillets = obj?.fillets
      config= obj?.config

      view.tables.setPathTables(paths)
      view.input.setFillets(fillets)
      view.input.setConfig(config)
      sections2 = model.part.getLoft(sections, paths, fillets, config)
      break
    }
    case "csv": {
      sections = model.parseText.parseText(text, "csv")      
      paths= {bottom:null, top:null} 
      fillets = {bottom:null, top:null} 
      config= {bottomDivision:9, mainDivisions:null, topDivisions: 9} 
      sections2 = sections
      break
    }
    default:{
        console.log("this")
      sections = model.parseText.parseText(text, "text")      
      paths= {bottom:null, top:null} 
      fillets = {bottom:null, top:null} 
      config= {bottomDivisions:9, mainDivisions:null, topDivisions: 9} 
      sections2 = sections
      break
    }
  }
  dataManager.set("sections", sections)
  dataManager.set("paths", paths)
  dataManager.set("fillets", fillets)
  dataManager.set("config", config)
  dataManager.set("sections2", sections2)

  view.draw.redraw(sections2)

}

export const getCAD = async () => {
  const sections2 = dataManager.get("sections2")
  const fileName = dataManager.get("fileName")
  const fileFullName = fileName + ".FCStd"
  const blob = await model.network.makeCADFile(sections2)
  saveAs(blob, fileFullName);
}

export const saveFile = () => {
  const fileName = dataManager.get("fileName")
  const sections = dataManager.get("sections")
  const paths = dataManager.get("paths")
  const fillets = dataManager.get("fillets")
  const config = dataManager.get("config")
  const sections2 = dataManager.get("sections2")

  const obj = {
    sections: sections,
    paths: paths,
    fillets: fillets,
    config: config,
  }

  const blob1 = new Blob([JSON.stringify(obj, null, "  ")],{type:'text/json;charset=utf-8;'}) 
  const blob1FileName = fileName + ".json"
  saveAs(blob1, blob1FileName);

  //const str = sections2.map(v=>v.map(u=>u.join(", ").join("\n"))).join("\n")

  const obj2 = {
    sections: sections2
  }
  const blob2 = new Blob([JSON.stringify(obj2, null, "  ")],{type:'text/json;charset=utf-8;'}) 
  const blob2FileName = fileName +"_2"+ ".json"
  saveAs(blob2, blob2FileName);
}


export const redraw = () => {
  const sections = dataManager.get("sections")
  const paths = dataManager.get("paths")
  const fillets = dataManager.get("fillets")
  const config = dataManager.get("config")


  const sections2 = model.part.getLoft(sections, paths, fillets, config)
  dataManager.set("sections2", sections2)
  view.draw.redraw(sections2)
}
