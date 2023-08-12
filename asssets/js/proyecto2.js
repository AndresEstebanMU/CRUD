imprimirEnPantalla();
const addClientButton = document.getElementById('add');

const textForm = document.getElementById('customer');

let saveEditClient = document.getElementById('saveEditClient')


addClientButton.addEventListener('click', function () {
    let storage;

    const customerInputText = textForm.value;

    if (customerInputText) {
        let storageData = localStorage.getItem("localCustomer");

        if (storageData == null) {
            storage = []
        } else {
            storage = JSON.parse(storageData)
        }
        storage.push({'cliente': customerInputText,});

        localStorage.setItem("localCustomer", JSON.stringify(storage));
        textForm.value = '';


    }

    imprimirEnPantalla()
});


function imprimirEnPantalla() {
    let storage;

    let storageData = localStorage.getItem("localCustomer");

    if (storageData == null) {
        storage = [];
    } else {
        storage = JSON.parse(storageData);
    }
    
    let datos = '';
 
    storage.forEach((element, i) => {
        datos +=`<tr>
                    <td>${element.cliente}</td>

                    <td><button type="button" onclick="editClient(${i})" class="btn btn-warning">Editar</button></td>

                    <td><button type="button" onclick="deleteClient(${i})" class="btn btn-danger">Eliminar</button></td>
                 </tr>`
    })
    
    document.getElementById('added').innerHTML = datos;
}

function editClient(i) {
    let editCustomer = document.getElementById('editCustomer');
    let storageData = localStorage.getItem("localCustomer");
    let storage = JSON.parse(storageData);

    editCustomer.value = i;
    
    textForm.value = storage[i]['cliente'];

    addClientButton.style.display = 'none';

    saveEditClient.style.display = 'inline-block'
}

saveEditClient.addEventListener('click', function(){
    let storageData = localStorage.getItem("localCustomer");
    let storage = JSON.parse(storageData);
    let editCustomer = document.getElementById("editCustomer").value;
    

for (keys in storage[editCustomer]) {
    if (keys == 'cliente') {
        storage[editCustomer].cliente = textForm.value;
     }
}

saveEditClient.style.display = 'none';
addClientButton.style.display = 'inline-block';
localStorage.setItem('localCustomer', JSON.stringify(storage));
textForm.value = '';
imprimirEnPantalla();
})

function deleteClient(i) {
    let storageData = localStorage.getItem("localCustomer");
    let storage = JSON.parse(storageData);
    storage.splice(i, 1);
    localStorage.setItem('localCustomer', JSON.stringify(storage));
    imprimirEnPantalla()
}

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
document.getElementById('date').innerText = hoy.toLocaleDateString();