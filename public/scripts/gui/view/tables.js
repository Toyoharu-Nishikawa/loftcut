import {redraw} from "../viewModel.js"
import {dataManager} from "../dataManager.js"

const elements = {
  topPath: document.getElementById("topPath"),
  bottomPath: document.getElementById("bottomPath"),
  fillets: document.getElementById("fillet"),
  config: document.getElementById("config"),
}

let topPathTable, bottomPathTable, filletsTable, configTable

const topTableInitialize = () => {
  const topPathElem = elements.topPath
  const topPathData = {
    width: 300,
    height: 120,
    data: [[null, null], [null, null]] ,
    colHeaders: ["x", "r"],
    rowHeaders: ["starting point", "end point"],
    rowHeaderWidth: 120,
    autoColumnSize: true,
    afterChange(changes, source) {
      if (source === 'loadData'){return}
      else{
        const cells = topPathTable.getData()
        const cells2 = cells.map(v=>v.map(u=>parseFloat(u)))
        console.log("cells", cells2)
        const flag = cells2.flatMap(v=>v.map(u=>u!=null && !isNaN(u))).every(v=>v==true)
        if(!flag){return}
        const paths = dataManager.get("paths")
        paths.top = cells2
        dataManager.set("paths", paths)
        redraw()
      }
    },
  }
  topPathTable = new Handsontable(topPathElem, topPathData)
}

const bottomTableInitialize = () =>{
  const bottomPathElem = elements.bottomPath
  const bottomPathData = {
    width: 300,
    height: 120,
    data: [[null, null], [null, null]] ,
    colHeaders: ["x", "r"],
    rowHeaders: ["starting point", "end point"],
    rowHeaderWidth: 120,
    autoColumnSize:true,
//   columns: [
//      {data:"x", type:"numeric"},
//      {data:"y", type:"numeric"},
//   ],
    afterChange(changes, source) {
      if (source === 'loadData'){return}
      else{
        const cells = bottomPathTable.getData()
        const cells2 = cells.map(v=>v.map(u=>parseFloat(u)))
        const flag = cells2.flatMap(v=>v.map(u=>u!=null && !isNaN(u))).every(v=>v==true)
        console.log("cells", cells2)
        if(!flag){return}
        const paths = dataManager.get("paths")
        paths.bottom = cells2
        dataManager.set("paths", paths)
        redraw()
      }
    },
  }

  bottomPathTable = new Handsontable(bottomPathElem, bottomPathData)
}


export const setPathTables = (paths)=>{
  const topPath = paths.top
  const bottomPath = paths.bottom
  console.log("topPath", topPath)
  topPathTable.loadData(topPath)
  //topPathTable.loadData([{x:1,y:2},{x:2,y:3}])
  bottomPathTable.loadData(bottomPath)
}

export const initialize = () => {
  topTableInitialize()
  bottomTableInitialize()
}
