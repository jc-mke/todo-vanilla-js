import { DONE, UNDONE } from './constants.js';

document.getElementById('new-to-do-input-button').addEventListener('click', handleToDoListItemCreation);
let toDoIds = []; 

function selectAllCheckboxesWithoutEventListeners() {
    return document.querySelectorAll('input.to-do-checkbox-without-listener');
}

function addEventListenersForCheckboxes(checkboxes) {
    checkboxes.forEach(function(checkbox) {
        console.log(`CHECKBOX CLASS: ${checkbox.className}`);
        checkbox.className = 'to-do-checkbox';
        checkbox.addEventListener('change', function() {
            Array.from(checkboxes)
            .map(i => markToDoListItemDoneOrUndone(i));
        })
    })
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
    const newToDoItemCheckbox = addToListItemCheckboxElement();
    newToDoItemCheckbox.id = generateToDoCheckBoxId(newToDoListItem.id);
    toDoList.appendChild(newToDoItemCheckbox);
    toDoList.appendChild(newToDoListItem);
    let checkboxes = selectAllCheckboxesWithoutEventListeners();
    addEventListenersForCheckboxes(checkboxes);
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

function addToListItemCheckboxElement() {
    const newToDoItemCheckbox = document.createElement('input');
    newToDoItemCheckbox.type = 'checkbox';
    newToDoItemCheckbox.className = 'to-do-checkbox-without-listener';
    return newToDoItemCheckbox;
}

function generateToDoCheckBoxId(generatedToDoId) {
    const checkboxId = 'checkbox-' + generatedToDoId;
    console.log(`NEW TO DO LIST CHECKBOX ID: ${checkboxId}`);
    return checkboxId;
}

function markToDoListItemDoneOrUndone(checkbox) {
    console.log(`CHECKBOX ID IN markToDoListItemDoneOrUndone: ${checkbox.id}`);
    let lastIndexOfCheckboxId = checkbox.id.length - 1;
    const toDoListItem = document.getElementById(checkbox.id.substring(lastIndexOfCheckboxId));
    console.log(`TO DO LIST ITEM RETRIEVED: ${toDoListItem}`);
    toDoListItem.className = checkbox.checked ? DONE : UNDONE;
    console.log(`TO DO LIST ITEM CLASS: ${toDoListItem.className}`);
}