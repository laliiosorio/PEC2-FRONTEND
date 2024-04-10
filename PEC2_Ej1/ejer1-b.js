// Creación de una función llamada findOne que busca un elemento en un array basado en una clave y un valor, y devuelve una promesa que se resolverá después de cierto tiempo.
const findOne = (list, { key, value }) => {
  // Se devuelve una nueva promesa.
  return new Promise((resolve, reject) => {
    // Se simula un retardo de 2 segundos antes de realizar la búsqueda.
    setTimeout(() => {
      // Se utiliza el método find para buscar un elemento en el array basado en la clave y el valor proporcionados.
      const element = list.find((element) => element[key] === value);

      // Se verifica si se encontró un elemento. Si es así, se resuelve la promesa con el elemento encontrado como argumento; de lo contrario, se rechaza la promesa con un objeto que contiene un mensaje de error.
      element ? resolve(element) : reject({ msg: 'ERROR: Element Not Found' });
    }, 2000);
  });
};

// Definición de un array de usuarios.
const users = [
  {
    name: 'Carlos',
    rol: 'Teacher',
  },
  {
    name: 'Ana',
    rol: 'Boss',
  },
];

// Se muestra un mensaje en la consola indicando que se realizará la búsqueda exitosa.
console.log('findOne success');
// Se llama a la función findOne para buscar un usuario por el nombre 'Carlos'.
findOne(users, { key: 'name', value: 'Carlos' })
  // Se maneja el caso de éxito utilizando la palabra reservada 'then'.
  .then(({ name }) => console.log(`user: ${name}`))
  // Se maneja el caso de error utilizando la palabra reservada 'catch'.
  .catch(({ msg }) => console.log(msg));

// Se muestra un mensaje en la consola indicando que se realizará la búsqueda con error.
console.log('findOne error');
// Se llama a la función findOne para buscar un usuario por el nombre 'Fermin'.
findOne(users, { key: 'name', value: 'Fermin' })
  // Se maneja el caso de éxito utilizando la palabra reservada 'then'.
  .then(({ name }) => console.log(`user: ${name}`))
  // Se maneja el caso de error utilizando la palabra reservada 'catch'.
  .catch(({ msg }) => console.log(msg));

/*
Resultado esperado después de 2 segundos:
findOne success
findOne error
user: Carlos
ERROR: Element Not Found
*/
