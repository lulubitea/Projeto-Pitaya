const form = document.querySelector('#signin'); // Elemento do formulário
const emailInput = form.querySelector('input[type="text"]'); // Input do email
const passwordInput = form.querySelector('input[type="password"]'); //Input da senha
const errorText = document.getElementById('error') //Elemento mensagem de erro
const showPasswordIcon = document.querySelector('#showPassword') //Elemento do olho de mostrar senha)

//Logins de professor e aluno
const loginInfo = {
    mathematicsTeacher: {
        email: 'ProfessorMatematica',
        password: 'Professor',
        userType: 'teacher',
        id: 'mathematics'
    },
    portugueseTeacher: {
        email: 'ProfessorPortugues',
        password: 'Professor',
        userType: 'teacher',
        id: 'portuguese'
    },
    physicalEducationTeacher: {
        email: 'ProfessorEducacaoFisica',
        password: 'Professor',
        userType: 'teacher',
        id: 'physical-education'
    },
    biologyTeacher: {
        email: 'ProfessorBiologia',
        password: 'Professor',
        userType: 'teacher',
        id: 'biology'
    },
    physicsTeacher: {
        email: 'ProfessorFisica',
        password: 'Professor',
        userType: 'teacher',
        id: 'physics'
    },
    chemistryTeacher: {
        email: 'ProfessorQuimica',
        password: 'Professor',
        userType: 'teacher',
        id: 'chemistry'
    },
    englishTeacher: {
        email: 'ProfessorIngles',
        password: 'Professor',
        userType: 'teacher',
        id: 'english'
    },
    artTeacher: {
        email: 'ProfessorArte',
        password: 'Professor',
        userType: 'teacher',
        id: 'art'
    },
    philosophyTeacher: {
        email: 'ProfessorFilosofia',
        password: 'Professor',
        userType: 'teacher',
        id: 'philosophy'
    },
    sociologyTeacher: {
        email: 'ProfessorSociologia',
        password: 'Professor',
        userType: 'teacher',
        id: 'sociology'
    },
    advancedTopicsTeacher: {
        email: 'ProfessorTopicosAvancados',
        password: 'Professor',
        userType: 'teacher',
        id: 'advanced-topics'
    },
    student: {
        email: 'Aluno',
        password: 'Aluno',
        userType: 'student',
        id: 'student'
    },
    representative: {
        email: 'Representante',
        password: 'Representante',
        userType: 'representative',
        id: 'representative'
    }
};

var inputs = document.querySelectorAll("input");
var button = document.querySelector("button");

// Checa se os inputs estão preenchidos
function checkInputs(inputs) {
    var filled = true;

    inputs.forEach(function (input) {

        if (input.value === "") {
            filled = false;
        }

    });

    return filled;

}

// Loop que toda vez que uma informação é alterada em algum input habilita ou desabilita o botão "Acessar"
inputs.forEach(function (input) {

    input.addEventListener("keyup", function () {
        errorText.style.display = "none";
        if (checkInputs(inputs)) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
});

//Previne que a página recarregue ao enviar o formulário
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

//Checar dados do login e logar
function logar() {
    const email = emailInput.value;
    const password = passwordInput.value;

    for (const key in loginInfo) {
        if (loginInfo[key].email === email && loginInfo[key].password === password) {
            localStorage.setItem('userType', loginInfo[key].userType);
            localStorage.setItem('userId', loginInfo[key].id);
            window.location = 'portal.html';
            return;
        }
    }

    errorText.style.display = 'block';
}

// Mostrar a senha
function showPassword() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordIcon.className = "fa-sharp fa-solid fa-eye-slash"
    } else {
        passwordInput.type = "password";
        showPasswordIcon.className = "fa-sharp fa-solid fa-eye"
    }
}