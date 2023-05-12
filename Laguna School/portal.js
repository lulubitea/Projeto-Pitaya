/* Define as permissões do usuário */
function setPermissions() {
    var userType = localStorage.getItem("userType");

    var tables;
    var createTaskLi = document.getElementById('create-task-li');
    var taskSubject = document.getElementById('taskSubject');

    var editButtons = document.querySelectorAll('.edit-button');
    var deleteButtons = document.querySelectorAll('.delete-button');
    var acceptButtons = document.querySelectorAll('.accept-button');
    var declineButtons = document.querySelectorAll('.decline-button');
    var infoButtons = document.querySelectorAll('.info-button');


    if (userType === "teacher") {
        var tables = document.querySelectorAll('#tasks-container-teacher');
        const userId = localStorage.getItem('userId');

        //Mostra o item "Criar Atividade"
        createTaskLi.style.display = "flex";

        //Define a matéria do professor
        var subjectList = {
            "mathematics": "Matemática",
            "portuguese": "Português",
            "physical-education": "Educação Física",
            "biology": "Biologia",
            "physics": "Física",
            "chemistry": "Química",
            "english": "Inglês",
            "art": "Artes",
            "philosophy": "Filosofia",
            "sociology": "Sociologia",
            "advanced-topics": "Tópicos Avançados"
        };

        var userSubject = subjectList[userId];

        //Seleciona a matéria a ser exibida no form de criar/editar atividade
        taskSubject.innerHTML = '<option value="' + userId + '">' + userSubject + '</option>';

        //Mostra os botões de editar, deletar, informação
        for (var i = 0; i < editButtons.length; i++) {
            editButtons[i].style.display = "flex";
        }
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].style.display = "flex";
        }
        for (var i = 0; i < infoButtons.length; i++) {
            infoButtons[i].style.display = "flex";
        }

        //Mostra somente a matéria do professor
        const sidebarItems = document.querySelectorAll('.sidebar-items ul li');

        for (let i = 0; i < sidebarItems.length; i++) {
            const sidebarItem = sidebarItems[i];

            if (sidebarItem.id !== "create-task-li" && sidebarItem.innerText.toLowerCase() !== userSubject.toLowerCase() && sidebarItem.innerText !== "Página Inicial" && sidebarItem.innerText !== "Calendário") {
                sidebarItem.parentNode.removeChild(sidebarItem);
            }
        }
    }
    else if (userType === "student") {
        var tables = document.querySelectorAll('#tasks-container-student');

        //Mostra os botões de aceitar, rejeitar, informação
        for (var i = 0; i < acceptButtons.length; i++) {
            acceptButtons[i].style.display = "flex";
        }
        for (var i = 0; i < declineButtons.length; i++) {
            declineButtons[i].style.display = "flex";
        }
        for (var i = 0; i < infoButtons.length; i++) {
            infoButtons[i].style.display = "flex";
        }

    }
    else if (userType === "representative") {
        var tables = document.querySelectorAll('#tasks-container-representative');
        createTaskLi.style.display = "flex";

        //Seleciona a matéria a ser exibida no form de criar/editar atividade
        taskSubject.innerHTML = `
        <option value="">Escolha uma disciplina</option>
        <option value="mathematics">Matemática</option>
        <option value="portuguese">Português</option>
        <option value="physical-education">Educação Física</option>
        <option value="biology">Biologia</option>
        <option value="physics">Física</option>
        <option value="chemistry">Química</option>
        <option value="english">Inglês</option>
        <option value="art">Arte</option>
        <option value="philosophy">Filosofia</option>
        <option value="sociology">Sociologia</option>
        <option value="advanced-topics">Tópicos Avançados</option>
    `;

        //Mostra os botões de editar, deletar, aceitar, rejeitar, informação
        for (var i = 0; i < editButtons.length; i++) {
            editButtons[i].style.display = "flex";
        }
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].style.display = "flex";
        }
        for (var i = 0; i < acceptButtons.length; i++) {
            acceptButtons[i].style.display = "flex";
        }
        for (var i = 0; i < declineButtons.length; i++) {
            declineButtons[i].style.display = "flex";
        }
        for (var i = 0; i < infoButtons.length; i++) {
            infoButtons[i].style.display = "flex";
        }

    }

    //Pq esse código tá aq? Sla
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = "flex";
    }
}

/* Define qual container está sendo exibido */
function setCurrentItemContainer(item) {
    hideLastItemContainer();
    var itemDiv = document.getElementById(item);
    var itemHTML = itemDiv.innerHTML;
    localStorage.setItem(item + 'Content', itemHTML);

    itemDiv.style.display = "flex";
}

/* Esconde todos os outros containers para não serem exibidos */
function hideLastItemContainer() {
    var elements = document.querySelectorAll("#home-page, #calendar, #create-task, #edit-task, #info-task, #mathematics, #portuguese, #physical-education, #biology, #physics, #chemistry, #english, #art, #philosophy, #sociology, #advanced-topics");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

/* Obtem as respostas do formulário de atividade e salva ela na div correta */
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    var subject = document.getElementById('taskSubject').value;
    var title = document.getElementById('taskTitle').value;
    var date = document.getElementById('taskData').value;
    var hour = document.getElementById('taskHour').value;
    var description = document.getElementById('taskDescription').value;
    var file = document.getElementById('taskFile').value;
    var creatorId = localStorage.getItem('userType');

    var timestamp = Date.now();
    var taskKey = 'task_' + timestamp;

    var newTask = document.createElement('div');

    newTask.innerHTML = `
    <div class="task">
    <table id="${taskKey}" class="task-table" data-subject="${subject}" data-creator="${creatorId}">
        <thead>
            <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Entrega</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${title}</td>
                <td><input type="date" value="${date}" readonly></td>
                <td><input type="time" value="${hour}" readonly></td>
                <td class="hide">${description}</td>
                <td class="hide">${file}</td>
                <td><i class="fa-sharp fa-solid fa-square-pen fa-lg edit-button"
                        onclick="editTask('${taskKey}'); tasksInformation('${taskKey}')"></i></td>
                <td><i class="fa-sharp fa-solid fa-square-minus fa-lg delete-button"
                        onclick="deleteTask('${taskKey}')"></i></td>                
                <td><i class="fa-sharp fa-solid fa-square-check fa-lg accept-button"></i></td>
                <td><i class="fa-sharp fa-solid fa-square-xmark fa-lg decline-button"></i></td>
                <td><i class="fa-sharp fa-solid fa-circle-info info-button" onclick="showTaskInfo(${taskKey})"></i></td>
            </tr>
        </tbody>
    </table>
    </div>
     `;

    /* Salva a newTask em um localStorage */
    var taskString = newTask.innerHTML;
    localStorage.setItem(taskKey, taskString);

    /* Adiciona a newTask no html (NÃO ESTÁ FUNCIONANDO)*/
    var taskContainers = ['#tasks-container-teacher', '#tasks-container-student', '#tasks-container-representative'];

    taskContainers.forEach(containerSelector => {
        var taskLocation = document.querySelector(`#${subject} ${containerSelector}`);
        taskLocation.appendChild(newTask);
        setCurrentItemContainer(subject);
        setPermissions();
    });

    document.getElementById('taskSubject').value = '';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskData').value = '';
    document.getElementById('taskHour').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskFile').value = '';

});

/* Pega e exibe as atividades salvas */
document.addEventListener('DOMContentLoaded', function () {
    var taskContainers = ['#tasks-container-teacher', '#tasks-container-student', '#tasks-container-representative'];

    taskContainers.forEach(function (containerSelector) {

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.startsWith('task_')) {
                var taskString = localStorage.getItem(key);
                var parser = new DOMParser();
                var taskElement = parser.parseFromString(taskString, 'text/html').body.firstChild;
                var taskSubject = taskElement.querySelector('table').getAttribute('data-subject');

                var taskLocation = document.querySelector(`#${taskSubject} ${containerSelector}`);
                if (taskLocation) {
                    taskLocation.appendChild(taskElement);
                }
            }
        }
    });
});

/* Deleta uma atividade */
function deleteTask(taskKey) {
    var taskElement = document.getElementById(taskKey);
    var taskContainers = ['#tasks-container-teacher', '#tasks-container-student', '#tasks-container-representative'];
    var userType = localStorage.getItem('userType');

    if (taskElement.dataset.creator === "teacher" && userType === "representative") {
        alert('Matéria do professor: autorização negada!')
    } else {
        if (taskElement) {
            taskContainers.forEach(function (containerSelector) {
                var taskLocation = document.querySelector(`#${taskElement.dataset.subject} ${containerSelector}`);
                var taskToDelete = taskLocation.querySelector(`#${taskKey}`);
                if (taskToDelete) {
                    taskToDelete.remove();
                }
            });
            localStorage.removeItem(taskKey);
        }
    }
}

/* Pega as informações das atividades para o editor */
function tasksInformation() {
    //Título
    const taskTitleSelect = document.querySelector('#editTaskTitle');

    taskTitleSelect.innerHTML = '';

    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach((taskElement) => {

        //Define título
        const title = taskElement.querySelector('td:first-of-type').textContent;
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        taskTitleSelect.appendChild(option);

    });
}

/* Ativa ou desativa a barra lateral */
function activateSidebar() {
    const sidebarStyle = document.getElementById("sidebar-container").style;
    const portalContainerStyles = document.querySelectorAll('#portal-container');

    if (parseInt(sidebarStyle.width) <= 0 || sidebarStyle.width <= 0) {
        sidebarStyle.width = "15%";
        for (let i = 0; i < portalContainerStyles.length; i++) {
            portalContainerStyles[i].style.left = "20%";
            portalContainerStyles[i].style.width = "75%";
            portalContainerStyles[i].style.transition = "all 0.3s ease-in-out";
        }
    } else {
        sidebarStyle.width = "0";
        for (let i = 0; i < portalContainerStyles.length; i++) {
            portalContainerStyles[i].style.left = "2.5%";
            portalContainerStyles[i].style.width = "95%";
            portalContainerStyles[i].style.transition = "all 0.3s ease-in-out";
        }
    }
}

/* Mostra/Esconde as opções de perfil */
function showOptions() {
    var options = document.getElementById("options");
    if (options.classList.contains("hide")) {
        options.classList.remove("hide");
    } else {
        options.classList.add("hide");
    }
}

/* Mostra todas as informações da task */
function showTaskInfo(taskKey) {
    setCurrentItemContainer('info-task');
}


function editTask(taskKey) {
    var taskElement = document.getElementById(taskKey);
    var userType = localStorage.getItem('userType');

    if (taskElement.dataset.creator === "teacher" && userType === "representative") {
        alert('Matéria do professor: autorização negada!')
    } else {
        setCurrentItemContainer('edit-task');
    }
}
