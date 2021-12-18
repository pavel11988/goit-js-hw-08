import throttle from "lodash.throttle";

const MESSAGE_KEY = 'feedback-form-state';
const data = {}

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');

onMessageOutput();

form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onTextInput, 500));
form.addEventListener('input', throttle(onConsoleOutput, 500));


function onConsoleOutput(event){
    data[event.target.name] = event.target.value;
}

function onFormSubmit (event) {
    event.preventDefault();
    event.currentTarget.reset();
    console.log(data);
    localStorage.removeItem(MESSAGE_KEY);
}

function onTextInput (event) {
    const message = event.target.value;
    localStorage.setItem(MESSAGE_KEY, message);
}

function onMessageOutput () {
    const savedMessage = localStorage.getItem(MESSAGE_KEY);
    if(!savedMessage) return;
    textarea.value = savedMessage;
}