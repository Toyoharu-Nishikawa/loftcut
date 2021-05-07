import {saveFile} from "../viewModel.js"

const elements = {
  save: document.getElementById("save"),
}

const click = async (e) => {
  saveFile()
}

export const initialize = () => {
  elements.save.onclick = click
}
