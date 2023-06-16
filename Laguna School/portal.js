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
            "portuguese": "Língua Portuguesa",
            "physical-education": "Educação Física",
            "biology": "Biologia",
            "physics": "Física",
            "chemistry": "Química",
            "english": "Inglês",
            "art": "Artes",
            "philosophy": "Filosofia",
            "sociology": "Sociologia",
            "advanced-topics": "Bons Estudos"
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

            if (sidebarItem.id !== "create-task-li" && sidebarItem.innerText.toLowerCase() !== userSubject.toLowerCase() && sidebarItem.innerText !== "Página Inicial" && sidebarItem.innerText !== "Calendário" && sidebarItem.innerText !== "Bons Estudos") {
                sidebarItem.style.display = "none"
            }
        }

        // Esconde o <th> e <td> de status nas atividades
        const taskTables = document.querySelectorAll('.task-table');

        for (let i = 0; i < taskTables.length; i++) {
            const taskTable = taskTables[i];
            const statusHeader = taskTable.querySelector('.thstatus');
            const statusCells = taskTable.querySelectorAll('.status');

            if (statusHeader) {
                statusHeader.style.display = 'none';
            }

            for (let j = 0; j < statusCells.length; j++) {
                statusCells[j].style.display = 'none';
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
        <option value="portuguese">Língua Portuguesa</option>
        <option value="physical-education">Educação Física</option>
        <option value="biology">Biologia</option>
        <option value="physics">Física</option>
        <option value="chemistry">Química</option>
        <option value="english">Inglês</option>
        <option value="art">Arte</option>
        <option value="philosophy">Filosofia</option>
        <option value="sociology">Sociologia</option>
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
                    <th class="thstatus">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${title}</td>
                    <td><input type="date" value="${date}" readonly></td>
                    <td><input type="time" value="${hour}" readonly></td>
                    <td class="status">Indefinido</td>
                    <td class="hide">${description}</td>
                    <td class="hide">${file}</td>
                    <td><i class="fa-sharp fa-solid fa-square-pen fa-lg edit-button" onclick="editTask('${taskKey}');"></i></td>
                    <td><i class="fa-sharp fa-solid fa-square-minus fa-lg delete-button" onclick="deleteTask('${taskKey}')"></i></td>
                    <td><i class="fa-sharp fa-solid fa-square-check fa-lg accept-button" onclick="changeTaskStatus('${taskKey}', 'Aceito'); removeButtons(event.target);"></i></td>
                    <td><i class="fa-sharp fa-solid fa-square-xmark fa-lg decline-button" onclick="changeTaskStatus('${taskKey}', 'Negado'); removeButtons(event.target);"></i></td>
                    <td><i class="fa-sharp fa-solid fa-circle-info info-button" onclick="showTaskInfo('${taskKey}')"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
`;

    /* Salva a newTask no localStorage */
    var taskString = newTask.innerHTML;
    localStorage.setItem(taskKey, taskString);

    /* Adiciona a newTask no html */
    var taskContainers = ['#tasks-container-teacher', '#tasks-container-student', '#tasks-container-representative'];

    taskContainers.forEach(containerSelector => {
        var taskLocation = document.querySelector(`#${subject} ${containerSelector}`);
        taskLocation.appendChild(newTask);
        setCurrentItemContainer(subject);
        setPermissions();
    });

    //Limpa as informações do form
    document.getElementById('taskSubject').value = '';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskData').value = '';
    document.getElementById('taskHour').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskFile').value = '';

});

// Remove os botões de aceitar e negar tarefa
function removeButtons(button) {
    // Obtém a linha que contém os botões
    const row = button.closest('tr');

    // Remove os botões de aceitar e recusar da linha
    const acceptButtonCell = row.querySelector('.accept-button').closest('td');
    const declineButtonCell = row.querySelector('.decline-button').closest('td');
    acceptButtonCell.remove();
    declineButtonCell.remove();

    // Atualiza os dados da tarefa no armazenamento local sem os botões de aceitar e recusar
    const taskKey = row.parentElement.parentElement.id;
    const taskHtml = localStorage.getItem(taskKey);
    if (taskHtml) {
        const updatedTaskHtml = taskHtml.replace(/<i\s+class="fa-sharp\s+fa-solid\s+(fa-square-check|fa-square-xmark)\s+fa-lg\s+(accept-button|decline-button)"[^>]*><\/i>\s*/gi, '');
        localStorage.setItem(taskKey, updatedTaskHtml);
    }
}

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

/* Ativa ou desativa a barra lateral */
function activateSidebar() {
    const sidebarStyle = document.getElementById("sidebar-container").style
    const portalContainerStyles = document.querySelectorAll('#portal-container')
    const floatingContainer = document.getElementById('floating-container')
    const portalItemsStyles = document.querySelectorAll('.sidebar-items li')

    if (parseInt(sidebarStyle.width) <= 0 || sidebarStyle.width <= 0) {
        sidebarStyle.width = "15%"
        for (let i = 0; i < portalContainerStyles.length; i++) {
            sidebarStyle.opacity = "100%"
            portalContainerStyles[i].style.left = "15%"
            portalContainerStyles[i].style.width = "84.5%"
            portalItemsStyles[i].style.opacity = "100%"
        }
        floatingContainer.style.left = "17.3%"
        floatingContainer.style.width = "80%"
    } else {
        sidebarStyle.width = "0";
        for (let i = 0; i < portalContainerStyles.length; i++) {
            sidebarStyle.opacity = "0%";
            portalContainerStyles[i].style.left = "2.5%";
            portalContainerStyles[i].style.width = "95%";
            portalItemsStyles[i].style.opacity = "0%"
        }
        floatingContainer.style.left = "5%"
        floatingContainer.style.width = "90%"
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

/* Mostra todas as informações da tarefa */
function showTaskInfo(taskKey) {
    var infoTaskContainer = document.getElementById('info-task');
    var tasksContainer = infoTaskContainer.querySelector('#tasks-container');

    // Recupera os dados da tarefa do localStorage
    var taskData = localStorage.getItem(taskKey);

    // Verifica se os dados da tarefa existem
    if (taskData) {
        // Cria uma nova div para armazenar as informações da tarefa
        var taskInfoDiv = document.createElement('div');
        taskInfoDiv.innerHTML = taskData;

        // Obtém os valores dos dados da tarefa
        var title = taskInfoDiv.querySelector('tbody tr td:first-of-type').textContent;
        var date = taskInfoDiv.querySelector('tbody tr td:nth-child(2) input').value;
        var hour = taskInfoDiv.querySelector('tbody tr td:nth-child(3) input').value;
        var description = taskInfoDiv.querySelector('tbody tr td:nth-child(5)').textContent;
        var file = taskInfoDiv.querySelector('tbody tr td:nth-child(5)').textContent;

        // Cria uma lista não ordenada para exibir as informações da tarefa
        var listElement = document.createElement('ul');

        // Cria itens de lista para cada informação da tarefa
        var titleItem = createListItem('Título', title, false);
        var dateItem = createListItem('Data', date, false);
        var hourItem = createListItem('Hora', hour, false);
        var descriptionItem = createListItem('Descrição', description, false);
        var fileItem = createListItem('Arquivo', file, true);

        // Adiciona os itens de lista à lista
        listElement.appendChild(titleItem);
        listElement.appendChild(dateItem);
        listElement.appendChild(hourItem);
        listElement.appendChild(descriptionItem);
        listElement.appendChild(fileItem);

        // Limpa o contêiner de tarefas
        tasksContainer.innerHTML = '';

        // Adiciona a lista ao contêiner de tarefas
        tasksContainer.appendChild(listElement);
    }

    showFloatingWindow('info-task');
}

function hideTaskInfo() {
    var infoTaskContainer = document.getElementById('info-task');

    infoTaskContainer.style.display = "none"
}

// Função auxiliar para criar um item de lista com um rótulo e valor
function createListItem(label, value, isFile) {
    var listItem = document.createElement('li');

    var labelElement = document.createElement('span');
    labelElement.textContent = label + ': ';
    labelElement.classList.add('label');
    listItem.appendChild(labelElement);

    var valueElement = document.createElement('span');

    // Verifica se é o último elemento (arquivo) e se é um arquivo
    if (isFile && label === 'Arquivo') {
        var linkElement = document.createElement('a');
        linkElement.textContent = 'Baixar';
        linkElement.download = value;
        linkElement.href = value; // Define o valor do atributo href como o URL do arquivo
        valueElement.appendChild(linkElement);
    } else {
        valueElement.textContent = value;
    }

    listItem.appendChild(valueElement);

    return listItem;
}

var editTaskContainer = document.getElementById('edit-task');
var taskTitleInput = editTaskContainer.querySelector('#editTaskTitle');
var taskDateInput = editTaskContainer.querySelector('#editTaskData');
var taskHourInput = editTaskContainer.querySelector('#editTaskHour');
var taskDescriptionTextarea = editTaskContainer.querySelector('#editTaskDescription');
var submitButton = editTaskContainer.querySelector('button[type="submit"]');
var currentTaskKey; // Variável global para armazenar a chave da tarefa atual


// Edita a tarefa 
function editTask(taskKey) {
    // Armazena a chave da tarefa atual
    currentTaskKey = taskKey;

    // Recupera os dados da tarefa do localStorage
    var taskData = localStorage.getItem(taskKey);
    var taskElement = document.getElementById(taskKey)
    var userType = localStorage.getItem('userType');

    if (taskElement.dataset.creator === "teacher" && userType === "representative") {
        alert('Matéria do professor: autorização negada!')
    } else {
        // Verifica se os dados da tarefa existem
        if (taskData) {
            // Cria uma nova div para armazenar os dados da tarefa
            var taskHtml = document.createElement('div');
            taskHtml.innerHTML = taskData;
            var taskTable = taskHtml.querySelector('#' + taskKey);

            // Obtém as informações da tarefa existente
            var title = taskTable.querySelector('tbody tr td:first-of-type').textContent;
            var date = taskTable.querySelector('tbody tr td:nth-child(2) input').value;
            var hour = taskTable.querySelector('tbody tr td:nth-child(3) input').value;
            var description = taskTable.querySelector('tbody tr td:nth-child(5)').textContent;

            // Preenche os campos do formulário com as informações da tarefa existente
            taskTitleInput.value = title;
            taskDateInput.value = date;
            taskHourInput.value = hour;
            taskDescriptionTextarea.value = description;
        }

        setCurrentItemContainer('edit-task');
    }
}

// Salva a tarefa editada
function saveTask(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Recupera a tabela da tarefa existente
    var taskTable = document.getElementById(currentTaskKey);

    // Atualiza a tabela da tarefa no DOM
    var taskTitleElement = taskTable.querySelector('tbody tr td:first-of-type');
    var taskDateInputElement = taskTable.querySelector('tbody tr td:nth-child(2) input');
    var taskHourInputElement = taskTable.querySelector('tbody tr td:nth-child(3) input');
    var taskDescriptionElement = taskTable.querySelector('tbody tr td:nth-child(5)');

    // Recupera os dados atualizados da tarefa dos campos do formulário
    var updatedTitle = taskTitleInput.value;
    var updatedDate = taskDateInput.value;
    var updatedHour = taskHourInput.value;
    var updatedDescription = taskDescriptionTextarea.value;

    // Atualiza os elementos com os novos valores
    taskTitleElement.textContent = updatedTitle;
    taskDateInputElement.value = updatedDate;
    taskHourInputElement.value = updatedHour;
    taskDescriptionElement.textContent = updatedDescription;

    // Verifica se a tabela da tarefa existe
    if (taskTable) {
        // Recupera as informações da tarefa existente
        var creator = taskTable.getAttribute('data-creator');
        var subject = taskTable.getAttribute('data-subject');
        var status = taskTable.querySelector('.status').textContent;

        // Cria a estrutura HTML atualizada para a tarefa
        var updatedTaskHtml = `
    <div class="task">
        <table id="${currentTaskKey}" class="task-table" data-subject="${subject}" data-creator="${creator}">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Data</th>
                    <th>Entrega</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${updatedTitle}</td>
                    <td><input type="date" value="${updatedDate}" readonly></td>
                    <td><input type="time" value="${updatedHour}" readonly></td>
                    <td class="status">${status}</td>
                    <td class="hide">${updatedDescription}</td>
                    <td class="hide"></td>
                    <td><i class="fa-sharp fa-solid fa-square-pen fa-lg edit-button" onclick="editTask('${currentTaskKey}');"></i></td>
                    <td><i class="fa-sharp fa-solid fa-square-minus fa-lg delete-button" onclick="deleteTask('${currentTaskKey}')"></i></td>
                    <i class="fa-sharp fa-solid fa-square-check fa-lg accept-button" onclick="changeTaskStatus('${currentTaskKey}', 'Aceito'); removeButtons(event.target);"></i>
                    <i class="fa-sharp fa-solid fa-square-xmark fa-lg decline-button" onclick="changeTaskStatus('${currentTaskKey}', 'Negado'); removeButtons(event.target);"></i>
                    <td><i class="fa-sharp fa-solid fa-circle-info info-button" onclick="showTaskInfo('${currentTaskKey}')"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
`;

        // Atualiza os dados da tarefa no localStorage
        localStorage.setItem(currentTaskKey, updatedTaskHtml);

        // Notifica o usuário que a tarefa foi atualizada
        alert('Tarefa atualizada com sucesso.');

        // Limpa os campos do formulário da tarefa
        taskTitleInput.value = '';
        taskDateInput.value = '';
        taskHourInput.value = '';
        taskDescriptionTextarea.value = '';

        // Chama dinamicamente setCurrentItemContainer com a matéria da tarefa
        setCurrentItemContainer(subject);
    }
}

// Adiciona um ouvinte de evento ao botão de envio
submitButton.addEventListener('click', saveTask)

function showFloatingWindow(window) {
    var floatingWindow = document.getElementById(window)

    floatingWindow.style.display = "flex"
}

// Muda o status da atividade para "Aceito" ou "Negado"
function changeTaskStatus(taskKey, status) {
    const taskTable = document.getElementById(taskKey);
    const statusCell = taskTable.querySelector('.status');
    statusCell.textContent = status;

    // Atualiza a variável de status com o status fornecido
    status = status;

    // Atualiza o valor do localStorage para a chave da tarefa com o status atualizado
    const taskData = localStorage.getItem(taskKey);
    if (taskData) {
        const updatedTaskData = taskData.replace(/<td class="status">.*<\/td>/, `<td class="status">${status}</td>`);
        localStorage.setItem(taskKey, updatedTaskData);
    }
}