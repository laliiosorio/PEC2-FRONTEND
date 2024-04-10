// Creación de una función llamada findOne que busca un elemento en un array basado en una clave y un valor, y ejecuta una función de éxito o error después de cierto tiempo.
const findOne = (list, { key, value }, { onSuccess, onError }) => {
  // Se simula un retardo de 2 segundos antes de realizar la búsqueda.
  setTimeout(() => {

    // Se utiliza el método find para buscar un elemento en el array basado en la clave y el valor proporcionados.
    const element = list.find(element => element[key] === value);

    // Se verifica si se encontró un elemento. Si es así, se ejecuta la función onSuccess pasando el elemento encontrado como argumento; de lo contrario, se ejecuta la función onError con un objeto que contiene un mensaje de error.
    element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' });
  }, 2000);
};

// Definición de la función onSuccess que recibe un objeto destructurado con una propiedad 'name' y muestra un mensaje en la consola.
const onSuccess = ({ name }) => console.log(`user: ${name}`);

// Definición de la función onError que recibe un objeto destructurado con una propiedad 'msg' y muestra un mensaje de error en la consola.
const onError = ({ msg }) => console.log(msg);

// Definición de un array de usuarios.
const users = [
  {
    name: 'Carlos',
    rol: 'Teacher'
  },
  {
    name: 'Ana',
    rol: 'Boss'
  }
];

// Se muestra un mensaje en la consola indicando que se realizará la búsqueda exitosa.
console.log('findOne success');

// Se llama a la función findOne para buscar un usuario por el nombre 'Carlos', se proporcionan las funciones onSuccess y onError como callbacks para manejar el resultado de la búsqueda.
findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError });

// Se muestra un mensaje en la consola indicando que se realizará la búsqueda con error.
console.log('findOne error');

// Se llama a la función findOne para buscar un usuario por el nombre 'Fermin', se proporcionan las funciones onSuccess y onError como callbacks para manejar el resultado de la búsqueda.
findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError });

/*
Resultado esperado después de 2 segundos:
findOne success
findOne error
user: Carlos
ERROR: Element Not Found
*/
