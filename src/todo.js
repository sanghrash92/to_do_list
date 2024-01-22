
function todo(title, description, date, priority) {
    return {
        title,
        description,
        date,
        priority,
    }
}

const todoLibrary = [];

function getTodo(getTitle, getDescription, date, priority) {

    if(getTitle.value.length === 0) return;
    
    const getValue = todo(getTitle.value, getDescription.value, date.value, priority.value);
    todoLibrary.push(getValue);

    return getValue;
}

function libLength() {
    return todoLibrary.length;
}

const deleteTask = (index) => {
    todoLibrary.splice(index, 1);
}

export { getTodo,todoLibrary, libLength, deleteTask }

