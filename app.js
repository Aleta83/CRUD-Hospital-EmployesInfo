var row = null; //variable global

function leerData() {
const dataLS = JSON.parse(localStorage.getItem("personal"));
dataLS.forEach(insert);

}
// funcion para verificar si los inputs estan vacios o tienen contenido
function checkInputs() {
let name = document.getElementById("name").value;
let job = document.getElementById("job").value;
let exp = document.getElementById("experience").value;
if (name === "" || job === "" || exp === "") {
msg.innerHTML = `<span>Por favor ingresa la informacion completa!</span>`;
return false;
}
return true;
}
function Submit() {
const checked = checkInputs();
if (checked) {
let dataEntered = retrievData();
insert(dataEntered);
document.getElementById("form").reset();
if (localStorage.getItem("personal") === null) {
let dataLS = [];
dataLS.push(dataEntered);
localStorage.setItem("personal", JSON.stringify(dataLS));
} else {
let dataLS = JSON.parse(localStorage.getItem("personal"));
dataLS.push(dataEntered);
localStorage.setItem("personal", JSON.stringify(dataLS));
}
}
}



function retrievData() {

let name = document.getElementById("name").value;
let job = document.getElementById("job").value;
let exp = document.getElementById("experience").value;

const personalDeEnfermeria = {
name: name,
job: job,
exp: exp,
};


msg.innerHTML = `<span>Informacion ingresada😄</span>`;
return personalDeEnfermeria;
}
function readingDataFromLocalStore() {

let personal = JSON.parse(localStorage.getItem("personal"));
return personal;
}


function insert(data) {
let table = document.getElementById("table");
var row = table.insertRow();


//creamos los botones
let buttonDelete = document.createElement("button");
let buttonEdit = document.createElement("button");
let buttonsContainer = document.createElement("div");
buttonDelete.textContent = "Borrar";
buttonDelete.classList = "borrar"
//buttonDelete.setAttribute('style', 'background: salmon')

buttonEdit.textContent = "Editar ";
buttonEdit.classList ="editar"
buttonsContainer.classList= "btn-container"

buttonDelete.addEventListener("click", function () {
remove(row);
});
buttonEdit.addEventListener("click", function () {
edit(row);
});

buttonsContainer.appendChild(buttonEdit);
buttonsContainer.appendChild(buttonDelete);

row.insertCell(0).innerHTML = data.name;
row.insertCell(1).innerHTML = data.job;
row.insertCell(2).innerHTML = data.exp;
row.insertCell(3).appendChild(buttonsContainer);
}
/* esta es otra forma 
cell1.innerHTML = readData[0];
cell2.innerHTML = readData[1];
cell3.innerHTML = readData[2]; */

//edit
function edit(row) {

document.getElementById("name").value = row.cells[0].textContent;
document.getElementById("job").value = row.cells[1].textContent;
document.getElementById("experience").value = row.cells[2].textContent;
// cambiamos el onClick del formulario para actualizar en vez de añadir un nuevo contenido
let buttonSubmit = document.getElementById("btn");
buttonSubmit.onclick = function () {
update(row);
};
}

//update
function update(row) {
let name = document.getElementById("name").value;
let job = document.getElementById("job").value;
let exp = document.getElementById("experience").value;
row.cells[0].innerHTML = name;
row.cells[1].innerHTML = job;
row.cells[2].innerHTML = exp;
// tenemos que actualizar tambien el localStorage
let personal = readingDataFromLocalStore();


personal[row.rowIndex - 2].name = name;
personal[row.rowIndex - 2].job = job;
personal[row.rowIndex - 2].exp = exp;
localStorage.setItem("personal", JSON.stringify(personal));
//despues del update volvemos a cambiar el onClick del formulario
let buttonSubmit = document.getElementById("btn");
buttonSubmit.onclick = Submit;
document.getElementById("form").reset();
msg.innerHTML = `<span>Informacion actualizada</span>`;
}

//delete
function remove(row) {
let ans = confirm("Estas seguro de querer borrar los datos?");
if (ans == true) {
//row = td.parentElement.parentElement;
document.getElementById("table").deleteRow(row.rowIndex);
msg.innerHTML = `<span style= "color: red;">Informacion eliminada!</span>`;

//tambien borramos los datos del localStorage
let personal = readingDataFromLocalStore();
personal.splice(row.rowIndex, 1);
localStorage.setItem("personal", JSON.stringify(personal));
}
}

leerData();
