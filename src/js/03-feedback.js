import throttle from "lodash.throttle";

const MESSAGE_KEY = 'feedback-form-state';
const data = {}

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

onMessageOutput();
onSaved();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));
form.addEventListener('input', throttle(onConsoleOutput, 500));

function onSaved () {
    data.email = input.value;
    data.message = textarea.value;
}

function onConsoleOutput(event){
    data[event.target.name] = event.target.value;
}

function onFormSubmit (event) {
    event.preventDefault();

    if(!(event.currentTarget.elements.email.value === '' || event.currentTarget.elements.message.value === ''))
    {
        event.currentTarget.reset();
        localStorage.removeItem(MESSAGE_KEY);
        if(Object.keys(data).length === 0 && Object.values(data).length === 0) return;
        console.log(data);
        
    } else{
    alert('Все поля должны быть заполнены!');
    return;}
}


function onTextInput (event) {


    if(Object.keys(data).length === 0) return;
    const dataStr = JSON.stringify(data);
    localStorage.setItem(MESSAGE_KEY, dataStr);
}


function onMessageOutput () {
    const savedData = localStorage.getItem(MESSAGE_KEY);
    if(!savedData) return;
    textarea.value =  JSON.parse(savedData)["message"];
    input.value =  JSON.parse(savedData)["email"];
}


