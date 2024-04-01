export default function createElement(tag, attributes = {}, innerHTML = "") {
    const element = document.createElement(tag)
    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    
    element.innerHTML = innerHTML
    return element
}