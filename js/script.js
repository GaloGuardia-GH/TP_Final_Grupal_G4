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

function getFilterValues() {
    return {
        flexCheckAventuraChecked : document.getElementById('flexCheckAventura').checked,
        flexCheckAguaChecked : document.getElementById('flexCheckAgua').checked,
        flexCheckShowsChecked : document.getElementById('flexCheckShows').checked,
        customRangeEdadValue : document.getElementById('customRangeEdad').value,
        inputNumberAlturaValue : document.getElementById('inputNumberAltura').value,
        inputSearchValue : document.getElementById('inputSearch').value
    };
}

function filterActivities(item) {
    let filterValues = getFilterValues();

    let inputSearchFunction = () => ((filterValues.inputSearchValue == '') || (filterValues.inputSearchValue != '' && (item.nombre.toLowerCase().includes(filterValues.inputSearchValue.toLowerCase()) || item.descripcion.toLowerCase().includes(filterValues.inputSearchValue.toLowerCase()))));
    let inputNumberAlturaFunction = () => ((filterValues.inputNumberAlturaValue == '') || (filterValues.inputNumberAlturaValue != '' && item.alturaMinima <= parseInt(filterValues.inputNumberAlturaValue)));
    let customRangeEdadFunction = () => (item.edadMinima <= parseInt(filterValues.customRangeEdadValue) && item.edadMaxima >= parseInt(filterValues.customRangeEdadValue));
    let flexCheckShowsFunction = () => ((!filterValues.flexCheckShowsChecked) || (filterValues.flexCheckShowsChecked && item.tipo == 'Shows'));
    let flexCheckAguaFunction = () => ((!filterValues.flexCheckAguaChecked) || (filterValues.flexCheckAguaChecked && item.tipo == 'Agua'));
    let flexCheckAventuraFunction = () => ((!filterValues.flexCheckAventuraChecked) || (filterValues.flexCheckAventuraChecked && item.tipo == 'Aventura'));

    return (inputSearchFunction() && inputNumberAlturaFunction() && customRangeEdadFunction() && flexCheckShowsFunction() && flexCheckAguaFunction() && flexCheckAventuraFunction());
}

function handleChangeCustomRangeEdadInput() {
    let filterValues = getFilterValues();
    const customRangeEdadLabel = document.getElementById('customRangeEdadLabel');
    customRangeEdadLabel.innerHTML = `<b>Edad (${filterValues.customRangeEdadValue})</b>`;
}

function handleChangeFilterInput() {
    let filteredActivities = atracciones.filter((item) => filterActivities(item));
    const container = document.getElementById('activities-container');
    container.innerHTML = '';
    for (const atraccion of filteredActivities) {
        container.appendChild(mapCardActivity(atraccion));
    }
    handleChangeCustomRangeEdadInput();
}

function loadAllActivities() {
    const container = document.getElementById('activities-container');
    if (container) {
        container.innerHTML = '';
        for (const atraccion of atracciones) {
            container.appendChild(mapCardActivity(atraccion));
        }
        handleChangeCustomRangeEdadInput();
    }
}

function mapCardActivity(atraccion) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('custom-card-animation');
    card.classList.add('m-0');
    card.classList.add('mb-3');
    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add('g-0');
    row.classList.add('p-3');
    const colImage = document.createElement('div');
    colImage.classList.add('col-md-4');
    colImage.innerHTML = `
        <img src="${atraccion.imagen}" class="img-fluid rounded-1 custom-img-fix-style-2" alt="${atraccion.nombre}">
    `;
    const colText = document.createElement('div');
    colText.classList.add('col-md-8');
    colText.classList.add('ps-3');
    colText.classList.add('pt-3');
    colText.classList.add('pt-lg-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    colText.appendChild(cardBody);
    colText.innerHTML = `
        <h5 class="card-title border-bottom pb-2"><b>${atraccion.nombre}</b></h5>
        <p>${atraccion.descripcion}</p>
        <p><strong>Tipo:</strong> ${atraccion.tipo}</p>
        <p><strong>Edad mínima:</strong> ${atraccion.edadMinima} |
        <strong>Edad máxima:</strong> ${atraccion.edadMaxima}</p>
        <p><strong>Altura mínima requerida:</strong> ${atraccion.alturaMinima} cm</p>
    `;
    row.appendChild(colImage);
    row.appendChild(colText);
    card.appendChild(row);
    return card;
}

document.addEventListener("DOMContentLoaded", loadAllActivities());

window.submitForm = submitForm;
window.handleChangeFilterInput = handleChangeFilterInput;