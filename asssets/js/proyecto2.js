//Muestra la fecha actualizada en hora de Chile
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
document.getElementById('date').innerText = hoy.toLocaleDateString();



imprimirEnPantalla();                                        //Muestra en la página lo que hay en el local storage inmediatamente
const addClientButton = document.getElementById('add');         //Hace referencia al boton 'Agregar cliente'
const textForm = document.getElementById('customer');           //Hace referencia al Input

//Revisa si hay datos en el local storage y agrega luego de eso lo ingresado en el input a un arreglo que se guarda en local storage
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
        localStorage.setItem("localCustomer", JSON.stringify(storage));             //Guarda en el local storage
        textForm.value = '';                                             //Vacía el input par no tener que borrar manualmente
    }

    imprimirEnPantalla()                                                //Pinta el arreglo en la página
});



//Pinta la página sacando el contenido del arreglo guardado en el local storage
function imprimirEnPantalla() {
    let storage;
    let storageData = localStorage.getItem("localCustomer");

    if (storageData == null) {
        storage = [];
    } else {
        storage = JSON.parse(storageData);
    }
    
    let datos = '';
 
    //Por cada objeto guardado en el arreglo agrega una fila a la tabla con el valor de cada cliente mas dos botones: editar y eliminar
    storage.forEach((element, i) => {
        datos +=`<tr>
                    <td>${element.cliente}</td>
                    <td><button type="button" onclick="editClient(${i})" class="btn btn-warning">Editar</button></td>
                    <td><button type="button" onclick="deleteClient(${i})" class="btn btn-danger">Eliminar</button></td>
                 </tr>`
    })
    
    document.getElementById('added').innerHTML = datos;             //Hace referencia al tbody de la tabla
}



const saveEditClient = document.getElementById('saveEditClient')        //Hace referencia al boton que aparece despues de editar (Guardar Cliente)

//mediante el index (i) del cliente seleccionado modificamos el arreglo
function editClient(i) {
    let editCustomer = document.getElementById('editCustomer');
    let storageData = localStorage.getItem("localCustomer");
    let storage = JSON.parse(storageData);

    editCustomer.value = i;    
    textForm.value = storage[i]['cliente'];
    addClientButton.style.display = 'none';             //Oculta el boton Agregar clientes
    saveEditClient.style.display = 'inline-block'            //Muestra el boton Guardar cliente que sirve para almacenar lo editado
}



//Guarda el cambio en el arreglo  del local storage
saveEditClient.addEventListener('click', function(){
    let storageData = localStorage.getItem("localCustomer");
    let storage = JSON.parse(storageData);
    let editCustomer = document.getElementById("editCustomer").value;
    
//Busca en el arreglo el objeto que estamos editando y guarda su nuevo valor en la respectiva propiedad
for (keys in storage[editCustomer]) {
    if (keys == 'cliente') {
        storage[editCustomer].cliente = textForm.value;
     }
}

saveEditClient.style.display = 'none';              //Vuelve a ocultar el boton Guardar cliente
addClientButton.style.display = 'inline-block';            //Muestra el boton Agregar Clientes
localStorage.setItem('localCustomer', JSON.stringify(storage));         //Guarda en local storage
textForm.value = '';

imprimirEnPantalla();               //Pinta con los nuevos datos
})



//Borra el cliente seleccionado eliminando el objeto del areglo del local storage
function deleteClient(i) {
    let storageData = localStorage.getItem("localCustomer");
    let storage = JSON.parse(storageData);

    storage.splice(i, 1);                                 //Nos permite ubicar el objeto mediante su indice, el 1 nos asegura que solo será ese objeto
    localStorage.setItem('localCustomer', JSON.stringify(storage));         //Guarda en local storage
    imprimirEnPantalla()                            //Pinta en la página el nuevo arreglo
}


