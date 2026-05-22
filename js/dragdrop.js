/**
 * This is called by the draggable element.
 * It specifies what data is being moved.
 * The target id is the id of the draggable element.
 * 
 * @param {*} event - the current event
 */
function dragstartHandler(event) {
    event.dataTransfer.setData("text", event.target.id);
}

/**
 * This is called by the droppable element.
 * This allows elements to be dropped into other elements.
 * 
 * @param {*} event - the current event
 */
function dragoverHandler(event) {
    event.preventDefault();
}

/**
 * This is called by the droppable element.
 * This gets the dragged element and appends it to the droppable element.
 * 
 * @param {*} event - the current event
 */
function dropHandler(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.currentTarget.appendChild(document.getElementById(data));
}
