import {getCAD} from "../viewModel.js"
const elements = {
  exportModel: document.getElementById("exportModel"),
}


const click = (e) => {
  getCAD()
}

export const initialize = () => {
  elements.exportModel.onclick = click
}
