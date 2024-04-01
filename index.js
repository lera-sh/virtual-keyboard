import Layout from "./src/view/layout.js"
import Model from "./src/model/model.js"
import View from "./src/view/view.js"
import Controller from "./src/controller/controller.js"
import keyLangs from "./src/utils/keyLangs.js"

const layout = new Layout()
const model = new Model()
const view = new View()
const controller = new Controller(model, view)

layout.initialise()
view.initialise(controller, keyLangs)