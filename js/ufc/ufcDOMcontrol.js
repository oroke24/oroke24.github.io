function ClearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}