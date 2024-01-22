
const projectLibrary = [];

function project(title, description, library = []) {

    const count = () => library.length;

    const deleteTask = (id) => library.splice(id, 1)

    return {
        title,
        description,
        library,
        count,
        deleteTask,
    }
}

const getProject = (getTitle, getDescription) => {
    
    if(getTitle.value.length === 0) return;
    
    const getVals = project(getTitle.value, getDescription.value);
    projectLibrary.push(getVals)
    localStorage.setItem('projectLibrary', JSON.stringify(projectLibrary))
    
    return getVals;
}

const createProject = (projectList, header) => {    
    const projectData = JSON.parse(localStorage.getItem('projectLibrary'));
    const newProject = document.createElement('li');
    newProject.classList.add('added-project');
    newProject.setAttribute('id', 'added-project');
    
    const newProjBtn = document.createElement('button');
    const trashIcon = document.createElement('span');

    projectLibrary.forEach((item, id) => {
        
        newProjBtn.innerHTML = item.title;
        trashIcon.setAttribute('class', 'fa-solid fa-trash');

        trashIcon.addEventListener('click', () => {
            deleteProject(id);
            newProject.classList.remove('added-project');
            newProject.textContent = '';
        })
        
        newProject.appendChild(newProjBtn);
        newProject.appendChild(trashIcon);
    })
    
    header.innerHTML = newProject.textContent;

    projectList.appendChild(newProject);

    return projectList;
}

const deleteProject = (index) => {
    projectLibrary.splice(index, 1);
}


export { getProject, createProject, projectLibrary, deleteProject};