import createElement from "../utils/createElement.js"

export default class View {
    createKeyElement(keyData, controller, textareaField) {
        const key = createElement('div', { class: `key ${keyData.code === 'Space' ? 'space' : keyData.code === 'CapsLock' ? 'caps' : ''}` })
        const basic = createElement('div', { class: `basic ${keyData.alternative === keyData.basic.toUpperCase() ? 'char' : 'digit'}` })
        const alternative = createElement('div', { class: `alternative none ${keyData.alternative === keyData.basic.toUpperCase() ? 'char' : 'digit'}` })

        if (keyData.alternative) {
            basic.textContent = keyData.basic
            alternative.textContent = keyData.alternative

            key.appendChild(basic)
            key.appendChild(alternative)
        } else {
            key.textContent = keyData.basic
        }

        key.addEventListener('click', () => {
            if (keyData.code === 'ShiftRight' || keyData.code === 'ShiftLeft') {
                controller.shiftDown()
            } else if (keyData.code === 'CapsLock') {
                controller.capsLock()
            } else {
                controller.handleClick(textareaField, keyData)
                controller.shiftUp()
            }

            controller.charsStatus()
            controller.keysView()
        })

        textareaField.addEventListener('click', () => controller.setCursor(textareaField.selectionStart))
        document.addEventListener('keydown', (event) => controller.handleKeyDown(event, keyData, key, textareaField))
        document.addEventListener('keyup', (event) => controller.handleKeyUp(event, keyData, key))

        return key
    }

    toggleVisibility(selector, isVisible) {
        const elements = document.querySelectorAll(selector)
        elements.forEach(element => element.classList.toggle('none', !isVisible))
    }

    charsUpper() {
        this.toggleVisibility('.basic.char', false)
        this.toggleVisibility('.alternative.char', true)
    }

    charsLower() {
        this.toggleVisibility('.basic.char', true)
        this.toggleVisibility('.alternative.char', false)
    }

    digitsUpper() {
        this.toggleVisibility('.basic.digit', false)
        this.toggleVisibility('.alternative.digit', true)
    }

    digitsLower() {
        this.toggleVisibility('.basic.digit', true)
        this.toggleVisibility('.alternative.digit', false)
    }

    createKeyboardRow(row, controller, textareaField) {
        const rowElement = createElement('div', { class: 'keyboard-row' })

        row.forEach(keyData => {
            const key = this.createKeyElement(keyData, controller, textareaField)
            rowElement.appendChild(key)
        })

        return rowElement
    }

    createKeyboardContainer(controller, lang) {
        const keyboardContainer = document.querySelector('.keyboard-container')
        const textareaField = document.querySelector('.textarea-field')
        const keys = lang[controller.getLanguage()]

        if (keyboardContainer) {
            keyboardContainer.innerHTML = ''
        }

        keys.forEach(row => {
            const rowElement = this.createKeyboardRow(row, controller, textareaField)
            keyboardContainer.appendChild(rowElement)
        })
    }

    changeLanguage(controller, keys) {
        document.addEventListener('keydown', (event) => {
            if (event.shiftKey && event.altKey) {
                controller.changeLanguage()
                this.languageContent(controller, keys)
                this.createKeyboardContainer(controller, keys)
            }
        })
    }

    languageContent(controller) {
        const language = document.querySelector('.language')
        language.textContent = `Current language: ${controller.getLanguage()}`
    }

    initialise(controller, keys) {
        this.createKeyboardContainer(controller, keys)
        this.languageContent(controller, keys)
        this.changeLanguage(controller, keys)
    }
}