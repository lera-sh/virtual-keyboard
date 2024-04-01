export function getFuncForClick(keyCode, model, controller) {
    const func = {
        'Backspace': textareaField => model.delete(controller, textareaField),
        'Delete': textareaField => model.delete(controller, textareaField),
        'Enter': textareaField => {
            textareaField.value = textareaField.value.slice(0, controller.getCursor(textareaField)) + '\n' + textareaField.value.slice(controller.getCursor(textareaField), textareaField.value.length)
            model.cursor += 1
        },
        'Tab': textareaField => {
            textareaField.value = textareaField.value.slice(0, controller.getCursor(textareaField)) + '    ' + textareaField.value.slice(controller.getCursor(textareaField), textareaField.value.length)
            model.cursor += 4
        },
        'ShiftRight': () => {
            controller.shiftDown()
            model.charsStatus()
            controller.keysView()
        },
        'ShiftLeft': () => {
            controller.shiftDown()
            model.charsStatus()
            controller.keysView()
        },
        'CapsLock' : () => {
            model.capsLock()
            model.charsStatus()
            controller.keysView()
        },
        'ArrowUp': textareaField => model.handleArrowUp(controller, textareaField),
        'ArrowDown': textareaField => model.handleArrowDown(controller, textareaField),
        'ArrowLeft': textareaField => model.handleArrowLeft(controller, textareaField),
        'ArrowRight': textareaField => model.handleArrowRight(controller, textareaField),
    }

    return func[keyCode]
}

export function getFuncForKey(keyCode, model, controller) {
    const func = {
        'Backspace': () => model.cursor -= 1,
        'Enter':() => model.cursor += 1,
        'Tab': (textareaField, event) => {
            event.preventDefault()
            textareaField.value = textareaField.value.slice(0, controller.getCursor(textareaField)) + '    ' + textareaField.value.slice(controller.getCursor(textareaField), textareaField.value.length)
            model.cursor += 4
        },
        'ShiftRight': () => {
            controller.shiftDown()
            model.charsStatus()
            controller.keysView()
        },
        'ShiftLeft': () => {
            controller.shiftDown()
            model.charsStatus()
            controller.keysView()
        },
        'CapsLock' : () => {
            model.capsLock()
            model.charsStatus()
            controller.keysView()
        },
        'ArrowUp': textareaField => model.handleArrowKey(controller, textareaField),
        'ArrowDown': textareaField => model.handleArrowKey(controller, textareaField),
        'ArrowLeft': textareaField => model.handleArrowKey(controller, textareaField),
        'ArrowRight': textareaField => model.handleArrowKey(controller, textareaField),
    }

    return func[keyCode]
}
