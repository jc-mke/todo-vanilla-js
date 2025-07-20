document.getElementById('new-to-do-input-button').addEventListener('click', addToDoListItem);
    
function addToDoListItem() {
    const toDoInput = document.getElementById('new-to-do-input');
    console.log(`TO DO INPUT: ${toDoInput}`);
    const toDoInputValue = toDoInput.value;
    console.log(`TO DO INPUT VALUE: ${toDoInputValue}`);
    if (!toDoInputValue) {
        console.log('TO DO INPUT VALUE IS NULL, UNDEFINED, OR BLANK');
        return;
    }
    const toDoList = document.getElementById('to-do-list');
    console.log(`TO DO LIST ELEMENT: ${toDoList}`);
    const newToDoListItem = document.createElement('li');
    console.log(`NEW TO DO LIST ITEM: ${newToDoListItem}`);
    newToDoListItem.textContent = toDoInputValue;
    toDoList.appendChild(newToDoListItem);
}