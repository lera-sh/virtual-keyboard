import { getFuncForClick, getFuncForKey } from "../utils/getFuncsForKeyboard.js"

export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    getLanguage() {
        return this.model.lang
    }

    setLanguage(lang) {
        this.model.lang = lang
    }

    getCursor(textareaField) {
        const cursorPosition = this.model.cursor >= 0 ? this.model.cursor : 0
        const textLength = textareaField.value.length

        return Math.min(cursorPosition, textLength)
    }

    setCursor(cursor) {
        this.model.cursor = cursor
    }

    handleClick(textareaField, keyData) {
        const func = getFuncForClick(keyData.code, this.model, this)
        if (func) func(textareaField)

        this.model.charsStatus()
        if(keyData.alternative) {
            if(keyData.alternative === keyData.basic.toUpperCase()) {
                textareaField.value = textareaField.value.slice(0, this.getCursor(textareaField)) + keyData[this.model.key] + textareaField.value.slice(this.getCursor(textareaField), textareaField.value.length)
                this.model.cursor += 1
            } else {
                textareaField.value = textareaField.value.slice(0, this.getCursor(textareaField)) + keyData[this.model.digit] + textareaField.value.slice(this.getCursor(textareaField), textareaField.value.length)
                this.model.cursor += 1
            }
        }

        textareaField.setSelectionRange(this.getCursor(textareaField), this.getCursor(textareaField))
        textareaField.focus()
    }

    handleKeyDown(event, keyData, key, textareaField) {
        if (event.code === keyData.code) {
            const func = getFuncForKey(event.code, this.model, this)
            if (func) {
                func(textareaField, event)
            }
            this.model.charsStatus()
            if (keyData.alternative) {
                if(keyData.alternative === keyData.basic.toUpperCase()) {
                    this.model.cursor += 1
                } else {
                    this.model.cursor += 1
                }
            }

            key.classList.add('active')
            textareaField.focus()
        }
    }

    handleKeyUp(event, keyData, key) {
        if(event.code === keyData.code) {
            if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
                this.charsStatus()   
                this.shiftUp()
                this.keysView()
            }
            
            key.classList.remove('active')
        }
    }

    shiftDown() {
        this.model.shiftDown()
    }

    shiftUp() {
        this.model.shiftUp()
    }

    capsLock() {
        this.model.capsLock()
    }

    charsStatus() {
        this.model.charsStatus()
    }

    keysView() {
        const { shift, caps } = this.model.chars

        if(shift && caps) {
            this.view.charsLower()
            this.view.digitsUpper()
        } else if(!shift && caps) {
            this.view.charsUpper()
            this.view.digitsLower()
        } else if(shift && !caps) {
            this.view.charsUpper()
            this.view.digitsUpper()
        } else {
            this.view.charsLower()
            this.view.digitsLower()
        }
    }

    changeLanguage() {
        const language = this.getLanguage() === 'en' ? 'ru' : 'en'
        this.setLanguage(language)
    }
}