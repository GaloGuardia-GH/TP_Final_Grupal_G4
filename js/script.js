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

function handleChangeSearchInput(input) {
    const value = input.value;
    if (value != '') {
        let filteredActivities = atracciones.filter((item) => item.nombre.toLowerCase().includes(value.toLowerCase()) || item.descripcion.toLowerCase().includes(value.toLowerCase()));

        const container = document.getElementById('activities-container');
        container.innerHTML = '';
        for (const atraccion of filteredActivities) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('m-0');
            card.classList.add('mb-3');
            card.classList.add('custom-card-animation');
            card.innerHTML = `
                <h2>${atraccion.nombre}</h2>
                <p>${atraccion.descripcion}</p>
                <p><strong>Tipo:</strong> ${atraccion.tipo}</p>
                <p><strong>Edad mínima:</strong> ${atraccion.edadMinima} |
                <strong>Edad máxima:</strong> ${atraccion.edadMaxima}</p>
                <p><strong>Altura mínima requerida:</strong> ${atraccion.alturaMinima} cm</p>
            `;
            container.appendChild(card);
        }
    } else {
        loadAllActivities();
    }
}

function loadAllActivities() {
    const container = document.getElementById('activities-container');
    if (container) {
        container.innerHTML = '';
        for (const atraccion of atracciones) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('m-0');
            card.classList.add('mb-3');
            card.classList.add('custom-card-animation');
            card.innerHTML = `
                <h2>${atraccion.nombre}</h2>
                <p>${atraccion.descripcion}</p>
                <p><strong>Tipo:</strong> ${atraccion.tipo}</p>
                <p><strong>Edad mínima:</strong> ${atraccion.edadMinima} |
                <strong>Edad máxima:</strong> ${atraccion.edadMaxima}</p>
                <p><strong>Altura mínima requerida:</strong> ${atraccion.alturaMinima} cm</p>
            `;
            container.appendChild(card);
        }
    }
}

document.addEventListener("DOMContentLoaded", loadAllActivities());

window.submitForm = submitForm;
window.handleChangeSearchInput = handleChangeSearchInput;