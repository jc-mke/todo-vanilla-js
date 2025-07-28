import { DONE, UNDONE } from './constants.js';

document.getElementById('new-to-do-input-button').addEventListener('click', handleToDoListItemCreation);
document.getElementById('to-do-filter').addEventListener('change', function(e) {
    filterToDosBasedOnEvent(e);
});

let toDoIds = [];

function filterToDosBasedOnEvent(e) {
    console.log(`changed to do filter to value: ${e.target.value}`);
    const filterValue = e.target.value;
    let doneToDos = document.getElementsByClassName(DONE);
    let undoneToDos = document.getElementsByClassName(UNDONE);
    const hiddenAttribute = document.createAttribute('hidden');
    
    if (filterValue.toLowerCase() === DONE) {
        addHiddenAttributeForToDoListItems(hiddenAttribute, undoneToDos);
        removeHiddenAttributeFromToDoListItems(doneToDos);
    } else {
        addHiddenAttributeForToDoListItems(hiddenAttribute, doneToDos);
        removeHiddenAttributeFromToDoListItems(undoneToDos);
    }

}

function addHiddenAttributeForToDoListItems(hiddenAttribute, toDosToHide) {
        for (let toDoToHide of toDosToHide) {
        toDoToHide.setAttributeNode(hiddenAttribute);
    }
}

function removeHiddenAttributeFromToDoListItems(toDosToReveal) {
    if (!toDosToReveal) {
        console.log(`TO DOS TO REVEAL VALUE: ${toDosToReveal} NOT LOOPING THROUGH THE ARRAY`);
    }
        for (let toDoToReveal of toDosToReveal) {
        let hiddenAttribute = toDoToReveal.getAttributeNode('hidden');
        toDoToReveal.removeAttributeNode(hiddenAttribute);
    }
}

function addEventListenerForCheckbox(checkbox) {
    checkbox.addEventListener('change', function() {
        markToDoListItemDoneOrUndone(checkbox)
});
}

function handleToDoListItemCreation() {
    const toDoInputValue = getNewToDoInputValue();
    if (!toDoInputValue) {
        console.log('TO DO INPUT VALUE IS NULL, UNDEFINED, OR BLANK');
        return;
    }
    const toDoList = document.getElementById('to-do-list');
    console.log(`TO DO LIST ELEMENT: ${toDoList}`);
    const newToDoListItem = addToDoListItemElement(toDoInputValue);
    const newToDoItemCheckbox = addCheckboxElement();
    newToDoItemCheckbox.id = generateToDoCheckBoxId(newToDoListItem.id);
    newToDoListItem.appendChild(newToDoItemCheckbox);
    toDoList.appendChild(newToDoListItem);
    addEventListenerForCheckbox(newToDoItemCheckbox);
    hideToDoBasedOnCurrentFilterValue(newToDoListItem);
}

function getNewToDoInputValue() {
    const toDoInput = document.getElementById('new-to-do-input');
    console.log(`TO DO INPUT: ${toDoInput}`);
    const toDoInputValue = toDoInput.value;
    console.log(`TO DO INPUT VALUE: ${toDoInputValue}`);
    return toDoInputValue;
}

function addToDoListItemElement(toDoInputValue) {
    const newToDoListItem = document.createElement('li');
    newToDoListItem.textContent = toDoInputValue;
    newToDoListItem.className = UNDONE;
    let generatedToDoId = generateToDoListItemId();
    newToDoListItem.id = generatedToDoId;
    console.log(`NEW TO DO LIST ITEM ID: ${newToDoListItem.id}`);
    return newToDoListItem;
}

function generateToDoListItemId() {
    let id = toDoIds.length > 0 ? 
    toDoIds[toDoIds.length - 1] + 1
    : 1;
    toDoIds.push(id);
    console.log(`UPDATED toDoIds array: ${toDoIds}`);
    console.log(`RETURNING ID: ${id}`);
    return id; 
}

function addCheckboxElement() {
    const newToDoItemCheckbox = document.createElement('input');
    newToDoItemCheckbox.type = 'checkbox';
    newToDoItemCheckbox.className = 'to-do-checkbox';
    return newToDoItemCheckbox;
}

function generateToDoCheckBoxId(generatedToDoId) {
    const checkboxId = 'checkbox-' + generatedToDoId;
    console.log(`NEW TO DO LIST CHECKBOX ID: ${checkboxId}`);
    return checkboxId;
}

function markToDoListItemDoneOrUndone(checkbox) {
    console.log(`CHECKBOX ID IN markToDoListItemDoneOrUndone: ${checkbox.id}`);
    let toDoListItemId = checkbox.id.replace('checkbox-', '');
    console.log(`TO DO LIST ITEM ID: ${toDoListItemId}`);
    const toDoListItem = document.getElementById(toDoListItemId);
    toDoListItem.className = checkbox.checked ? DONE : UNDONE;
    console.log(`TO DO LIST ITEM CLASS: ${toDoListItem.className}`);
    hideToDoBasedOnCurrentFilterValue(toDoListItem);
}

function hideToDoBasedOnCurrentFilterValue(toDoListItem) {
    const filterElement = document.getElementById('to-do-filter');
    if (filterElement.value.toLowerCase() === toDoListItem.className) {
        const hiddenAttributeToRemove = toDoToReveal.getAttributeNode('hidden');
        toDoListItem.removeAttributeNode(hiddenAttributeToRemove);
    } else {
        const hiddenAttributeToAdd = document.createAttribute('hidden');
        toDoListItem.setAttributeNode(hiddenAttributeToAdd);
    }

}