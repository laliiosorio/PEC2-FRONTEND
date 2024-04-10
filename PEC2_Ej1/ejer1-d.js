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

// Función asincrónica para manejar la búsqueda de manera paralela utilizando async/await.
const searchUsersParallelAsyncAwait = async () => {
  try {
    // Se llama a la función findOne para buscar un usuario por el nombre 'Carlos' y 'Fermin' en paralelo, utilizando async/await para esperar a que todas las promesas se resuelvan.
    const [user1, user2] = await Promise.all([
      findOne(users, { key: 'name', value: 'Carlos' }),
      findOne(users, { key: 'name', value: 'Fermin' })
    ]);
    
    // Se muestra el usuario encontrado en la consola.
    console.log(`user1: ${user1.name}`);
    console.log(`user2: ${user2.name}`);
  } catch (error) {
    // Se maneja el caso de error mostrando el mensaje en la consola.
    console.log(error.msg);
  }
};

// Llamada a la función searchUsersParallelAsyncAwait para buscar los usuarios en paralelo.
console.log('Searching users in parallel using async/await:');
searchUsersParallelAsyncAwait();

// Función para manejar la búsqueda de manera paralela utilizando promesas.
const searchUsersParallelPromise = () => {
  // Se llama a la función findOne para buscar un usuario por el nombre 'Carlos' y 'Fermin' en paralelo.
  Promise.all([
    findOne(users, { key: 'name', value: 'Carlos' }),
    findOne(users, { key: 'name', value: 'Fermin' })
  ])
    .then(([user1, user2]) => {
      // Se muestra el usuario encontrado en la consola.
      console.log(`user1: ${user1.name}`);
      console.log(`user2: ${user2.name}`);
    })
    .catch(error => {
      // Se maneja el caso de error mostrando el mensaje en la consola.
      console.log(error.msg);
    });
};

// Llamada a la función searchUsersParallelPromise para buscar los usuarios en paralelo.
console.log('\nSearching users in parallel using Promises:');
searchUsersParallelPromise();

/*
Resultado esperado después de 2 segundos:
Searching users in parallel using async/await:
user1: Carlos
ERROR: Element Not Found

Searching users in parallel using Promises:
user1: Carlos
ERROR: Element Not Found
*/
