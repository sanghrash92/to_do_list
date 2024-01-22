import { openModal, closeModal } from "./modal";
import { getProject,
         createProject,
         projectLibrary,
         } from "./project";
import { getTodo,
        libLength,
        todoLibrary,
        deleteTask
        } from "./todo";
import { format } from 'date-fns';

const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const openModalButton2 = document.querySelectorAll('[data-modal-target]');
const closeModalButton2 = document.querySelectorAll('[data-close-btn]');


openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

openModalButton2.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButton2.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal2')
        closeModal(modal)
    })
})

const render = () => {
    const projectData = JSON.parse(localStorage.getItem('projectLibrary'));
    // Main header  
    const mainHeader = document.querySelector('.main-header');

    // Tasks display
    const taskCount = document.querySelector(".taskCount");

    // Nav
    const allBtn = document.querySelector('#all');

    allBtn.addEventListener('click', () => {
        mainHeader.textContent = allBtn.textContent;
        allBtn.classList.add('activeBtn');
        const btn = document.querySelector('#addBtn');
        if(btn.classList.contains('active1')) {
            btn.classList.remove('active1');
            btn.classList.add('add-task')
        }

        const displayPage = document.querySelector("#display-tasks");
        displayAllTodos(displayPage, taskCount);
    })
    
    
    // Project 
    const modal1 = document.querySelector('#modal');
    const deleteBtn = document.querySelector('#popup');
    const projectList = document.querySelector('.project-list');
    
    const projectTitle = document.querySelector('#title');
    const projectDescription = document.querySelector('#description');
    const addProject = document.querySelector('#addProject');
    const button = document.querySelector('#addBtn');

    addProject.addEventListener('click', (e) => {
        e.preventDefault();
        
        getProject(projectTitle, projectDescription);
        projectReset();
        closeModal(modal1);
        createProject(projectList, mainHeader);
        
        const projectNodes = document.querySelectorAll('#added-project');
        
        projectNodes.forEach(node => {
            node.addEventListener('click', (e) => {
                if(allBtn.classList.contains('activeBtn')) allBtn.classList.remove('activeBtn');

                changeHeader(node);
                addTaskBtn();
                const displayPage = document.querySelector("#display-tasks");
                displayTodo(displayPage, node);
     
                addTaskBtn().addEventListener('click', () => {
                    const modal2 = document.querySelector('#modal2');
                    openModal(modal2);
                })
            })
        })
    }) 

    const cancelDelete = document.querySelectorAll('.close1');
    
    cancelDelete.forEach(cancel => {
        cancel.addEventListener('click', () => {
            closeModal(deleteBtn);
        })
    })

    const todoTitle = document.querySelector('#todo-title');
    const todoDescription = document.querySelector('#todo-description');
    const todoDate = document.querySelector('#date');
    const priority = document.querySelector('#priority-selection');
    const addTodo = document.querySelector('#addTodo');
    const modal2 = document.querySelector('#modal2');

    addTodo.addEventListener("click", (e) => {
        e.preventDefault();

        const tasks = getTodo(todoTitle, todoDescription, todoDate, priority);
        const display = document.querySelector('#display-tasks');
        
        projectLibrary.forEach(project => {
            if(project.title === mainHeader.textContent) {
                project.library.push(tasks);
                taskCount.textContent = project.count();
                displayTodo(display, mainHeader)
            }
        })
        todoReset();
        closeModal(modal2);
    })
    
    const projectReset = () => {
        projectTitle.value = '';
        projectDescription.value = '';
    }

    const todoReset = () => {
        todoTitle.value = '';
        todoDescription.value = '';
        todoDate.value = '';
        priority.value = '';
    }

    const addTaskBtn = () => {    
        const button = document.querySelector('#addBtn');
        if(button.classList.contains('add-task')) {
            button.classList.remove('add-task')
            button.classList.add('active1');
        }
    
        return button;
    }

    const changeHeader = (header) => {
        const mainHeader = document.querySelector('.main-header');

        if(mainHeader.innerHTML !== null) mainHeader.textContent = '';

        mainHeader.innerHTML = header.textContent;

        return mainHeader;
    }

    const displayTodo = (displayPage, node) => {

        projectLibrary.forEach(project => {
            if(project.title === node.textContent) {
                taskCount.textContent = project.library.length;
                displayPage.textContent = '';

                project.library.forEach((item, id) => {
                    const taskList = document.createElement('li');
                    const container = document.createElement('div');
                    const iconContainer = document.createElement('div');
                    taskList.classList.add('display-item');
                    container.classList.add('list');
                    iconContainer.classList.add('icons')
    
                    const taskTitle = document.createElement('span');
                    const taskDescription = document.createElement('span');
                    const taskDate = document.createElement('span');
                    const taskPriority = document.createElement('span');
                    const date = document.createElement('span');
                    const trashIcon = document.createElement('i');
                    const editIcon = document.createElement('i');
    
                    trashIcon.setAttribute('class', 'fa-solid fa-trash');
                    editIcon.setAttribute('class', 'fa-solid fa-edit');
                
                    taskTitle.textContent = item.title;
                    taskDescription.textContent = item.description;
                    date.textContent = format(new Date(), "dd/M/yyyy")
                    taskDate.textContent = item.date;
                    taskPriority.textContent = item.priority;
                                   
                    container.appendChild(taskTitle);
                    container.appendChild(taskDescription);
                    container.appendChild(taskDate);
                    container.appendChild(taskPriority);
                    iconContainer.appendChild(date);
                    iconContainer.appendChild(editIcon);
                    iconContainer.appendChild(trashIcon);
                    taskList.appendChild(container);
                    taskList.appendChild(iconContainer);
                    displayPage.appendChild(taskList);
    
                    editIcon.addEventListener('click', () => {
                        const editBtn = document.querySelector('#edit');
                        editBtn.classList.remove('hide');
                        addTodo.classList.add('hide');
                        openModal(modal2);
                        editBtn.addEventListener('click', () => {
                            const title = document.querySelector('#todo-title');
                            if(title.value === '') return;
                            item.title = title.value;
                            taskTitle.textContent = item.title;
                            editBtn.classList.add('hide');
                            addTodo.classList.remove('hide');
                            todoReset();
                            closeModal(modal2)
                        })
                    })
                    const close = document.querySelector('#close');
    
                    close.addEventListener('click', () => {
                        editBtn.classList.add('hide');
                        addTodo.classList.remove('hide');
                    })
    
                    trashIcon.addEventListener('click', () => {
                        project.deleteTask(id);
                        taskList.classList.remove('display-item');
                        taskList.textContent = '';
                        taskCount.textContent = project.count();
                    })
                })
            }
        }) 
    }

    const displayAllTodos = (page, tasks) => {
        if(page.textContent !== null) {
            tasks.textContent = libLength();
            page.textContent = '';
        }
        todoLibrary.forEach(item => {
            const taskList = document.createElement('li');
            const container = document.createElement('div');
            const iconContainer = document.createElement('div');
            taskList.classList.add('display-item');
            container.classList.add('list');
            iconContainer.classList.add('icons')
    
            const taskTitle = document.createElement('span');
            const taskDescription = document.createElement('span');
            const taskDate = document.createElement('span');
            const taskPriority = document.createElement('span');
            const date = document.createElement('span');
            const trashIcon = document.createElement('i');
            const editIcon = document.createElement('i');
    
            trashIcon.setAttribute('class', 'fa-solid fa-trash');
            editIcon.setAttribute('class', 'fa-solid fa-edit');
        
            taskTitle.textContent = item.title;
            taskDescription.textContent = item.description;
            taskDate.textContent = item.date;
            taskPriority.textContent = item.priority;
            date.textContent = format(new Date(), "dd/M/yyyy")
                            
            container.appendChild(taskTitle);
            container.appendChild(taskDescription);
            container.appendChild(taskDate);
            container.appendChild(taskPriority);
            iconContainer.appendChild(date);
            iconContainer.appendChild(editIcon);
            iconContainer.appendChild(trashIcon);
            taskList.appendChild(container);
            taskList.appendChild(iconContainer);
            page.appendChild(taskList);

            editIcon.addEventListener('click', () => {
                const editBtn = document.querySelector('#edit');
                editBtn.classList.remove('hide');
                addTodo.classList.add('hide');
                openModal(modal2);
                editBtn.addEventListener('click', () => {
                    const title = document.querySelector('#todo-title');
                    if(title.value === '') return;
                    item.title = title.value;
                    taskTitle.textContent = item.title;
                    editBtn.classList.add('hide');
                    addTodo.classList.remove('hide');
                    todoReset();
                    closeModal(modal2)
                })
            })

            const close = document.querySelector('#close');
    
            close.addEventListener('click', () => {
                editBtn.classList.add('hide');
                addTodo.classList.remove('hide');
            })

            projectLibrary.forEach(project => {
                project.library.forEach((item, id) => {
                    trashIcon.addEventListener('click', () => {
                        project.deleteTask(id);
                        taskList.classList.remove('display-item');
                        taskList.textContent = '';
                        taskCount.textContent = project.count();
                    })

                })
            })

            todoLibrary.forEach((item, id) => {
                trashIcon.addEventListener('click', () => {
                    deleteTask(id);
                    taskList.classList.remove('display-item');
                    taskList.textContent = '';
                    taskCount.textContent = libLength();
                })
            })
        })
    }
}

export { render }