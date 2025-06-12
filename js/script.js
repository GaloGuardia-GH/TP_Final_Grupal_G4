import { atracciones } from './atracciones.js';

function submitForm(form) {
    const floatingInputTextNombre = form.floatingInputTextNombre.value;
    const floatingInputTextEmail = form.floatingInputTextEmail.value;
    const floatingTextareaMensaje = form.floatingTextareaMensaje.value;

    const alertSuccess = document.getElementById("alert-success");
    const alertDanger = document.getElementById("alert-danger");
    const buttomSubmit = document.getElementById("buttom-submit");

    if (floatingInputTextNombre == '' || floatingInputTextEmail == '' || floatingTextareaMensaje == '') {
        alertSuccess.style.setProperty('display', 'none', 'important');
        alertDanger.style.setProperty('display', 'flex', 'important');
    } else {
        alertSuccess.style.setProperty('display', 'flex', 'important');
        alertDanger.style.setProperty('display', 'none', 'important');
        setTimeout(() => {
            form.reset();
        }, 500);
    }

    buttomSubmit.disabled = true;
    setTimeout(() => {
        alertSuccess.style.setProperty('display', 'none', 'important');
        alertDanger.style.setProperty('display', 'none', 'important');
        buttomSubmit.disabled = false;
    }, 3500);

    return false;
}