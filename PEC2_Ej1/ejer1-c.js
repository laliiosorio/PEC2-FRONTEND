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

// Función asincrónica para manejar la búsqueda de manera más genérica.
const searchUser = async (searchObject, userList) => {
  try {
    // Se llama a la función findOne para buscar un usuario utilizando el objeto de búsqueda proporcionado y la lista de usuarios, utilizando await para esperar a que la promesa se resuelva.
    const user = await findOne(userList, searchObject);

    // Se muestra el usuario encontrado en la consola.
    console.log(`user: ${user.name}`);
  } catch (error) {
    // Se maneja el caso de error mostrando el mensaje en la consola.
    console.log(error.msg);
  }
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

// Llamada a la función searchUser para buscar un usuario por el nombre 'Carlos'.
console.log('findOne success');
searchUser({ key: 'name', value: 'Carlos' }, users);

// Llamada a la función searchUser para buscar un usuario por el nombre 'Fermin'.
console.log('findOne error');
searchUser({ key: 'name', value: 'Fermin' }, users);

/*
Resultado esperado después de 2 segundos:
findOne success
findOne error
user: Carlos
ERROR: Element Not Found
*/
