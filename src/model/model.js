export default class Model {
    constructor() {
        this.lang = 'en'
        this.key = 'basic'
        this.digit = 'basic'
        this.cursor = 0
        this.chars = { shift: false, caps: false }
    }

    shiftDown() {
        this.key = 'alternative'
        this.digit = 'alternative'
        this.chars.shift = true
    }

    shiftUp() {
        this.key = 'basic'
        this.digit = 'basic'
        this.chars.shift = false
    }

    capsLock() {
        this.chars.caps = !this.chars.caps
    }

    charsStatus() {
        if (this.chars.shift && this.chars.caps) {
            this.key = 'basic'
            this.digit = 'alternative'
        } else if (!this.chars.shift && this.chars.caps) {
            this.key = 'alternative'
            this.digit = 'basic'
        } else if (this.chars.shift && !this.chars.caps) {
            this.key = 'alternative'
            this.digit = 'alternative'
        } else {
            this.key = 'basic'
            this.digit = 'basic'
        }
    }

    delete(controller, textareaField) {
        const start = textareaField.selectionStart
        const end = textareaField.selectionEnd

        if (start !== end) {
            const textBeforeSelection = textareaField.value.slice(0, start)
            const textAfterSelection = textareaField.value.slice(end)
            textareaField.value = textBeforeSelection + textAfterSelection
            controller.setCursor(start)
        } else {
            const cursorPosition = controller.getCursor(textareaField)
            textareaField.value = textareaField.value.slice(0, cursorPosition - 1) + textareaField.value.slice(cursorPosition)
            this.cursor -= 1
        }
    }

    handleArrowKey(controller, textareaField) {
        controller.setCursor(textareaField.selectionStart)
    }

    handleArrowUp(controller) {
        controller.setCursor(0)
    }

    handleArrowDown(controller, textareaField) {
        controller.setCursor(textareaField.value.length)
    }

    handleArrowLeft(controller, textareaField) {
        controller.setCursor(controller.getCursor(textareaField) - 1)
    }

    handleArrowRight(controller, textareaField) {
        controller.setCursor(controller.getCursor(textareaField) + 1)
    }
}