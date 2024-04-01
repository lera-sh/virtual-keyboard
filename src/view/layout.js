import createElement from "../utils/createElement.js"

export default class Layout {
    constructor() {
        this.body = document.body
    }

    createWrapperContainer() {
        const wrapperContainer = createElement('wrapper', { class: 'wrapper' })

        this.body.appendChild(wrapperContainer)
    }

    createTitleContainer() {
        const wrapperContainer = document.querySelector('.wrapper')
        const titleContainer = createElement('div', { class: 'title-container' })
        const title = createElement('h1', { class: 'title' })
        const description = createElement('p', { class: 'description' })

        title.textContent = 'virtual-keyboard'
        description.textContent = 'by lera-sh'

        titleContainer.appendChild(title)
        titleContainer.appendChild(description)
        wrapperContainer.appendChild(titleContainer)
    }

    createTextareaField() {
        const wrapperContainer = document.querySelector('.wrapper')
        const textareaContainer = createElement('div', { class: 'textarea-container' })
        const textareaField = createElement('textarea', { class: 'textarea-field', type: 'text' })

        wrapperContainer.appendChild(textareaContainer)
        textareaContainer.appendChild(textareaField)
    }

    createKeyboardContainer() {
        const wrapperContainer = document.querySelector('.wrapper')
        const keyboardContainer = createElement('div', { class: 'keyboard-container' })
          
        wrapperContainer.appendChild(keyboardContainer)
    }

    createLanguageSwitcher() {
        const textareaContainer = document.querySelector('.textarea-container')
        const languageContainer = createElement('div', { class: 'language-container' })
        const language = createElement('p', { class: 'language' })

        textareaContainer.appendChild(languageContainer)
        languageContainer.appendChild(language)
    }

    initialise() {
        this.createWrapperContainer()
        this.createTitleContainer()
        this.createTextareaField()
        this.createKeyboardContainer()
        this.createLanguageSwitcher()
    }
}