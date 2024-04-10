const data = require('./data');

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }

  const prices = data.prices;

  return Object.keys(entrants)
    .reduce((total, entrantType) => {
      return total + prices[entrantType] * entrants[entrantType];
    }, 0)
    .toFixed(2);
}

function schedule(dayName) {
  const defaultSchedule = data.hours;
  const formattedSchedule = {};

  Object.keys(defaultSchedule).forEach((day) => {
    const { open, close } = defaultSchedule[day];
    const openTime = `${open}am`;
    const closeTime = `${close > 12 ? close - 12 : close}pm`;

    if (close === 0 && open === 0) {
      return (formattedSchedule[day] = 'CLOSED');
    }

    formattedSchedule[day] = `Open from ${openTime} until ${closeTime}`;
  });

  if (dayName) {
    return { [dayName]: formattedSchedule[dayName] };
  }

  return formattedSchedule;
}

function animalCount(species) {
  // Get the animal data from the provided data
  const animalData = data.animals;

  // If no species is provided, count all species
  if (!species) {
    const counts = {};
    animalData.forEach((animal) => {
      counts[animal.name] = animal.residents.length;
    });

    return counts;
  } else {
    const foundAnimal = animalData.find((animal) => animal.name === species);
    if (foundAnimal) {
      return foundAnimal.residents.length;
    }
  }
}

function animalMap(options = {}) {
  const animalData = data.animals;
  const categorizedAnimals = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };

  animalData.forEach((animal) => {
    const { name, location, residents } = animal;
    let filteredNames = [];

    if (options.includeNames) {
      filteredNames = residents
        .filter((resident) => !options.sex || resident.sex === options.sex)
        .map((resident) => resident.name);
    }

    const animalEntry = options.includeNames ? { [name]: filteredNames } : name;

    categorizedAnimals[location].push(animalEntry);
  });

  return categorizedAnimals;
}

function animalPopularity(rating) {
  const animalData = data.animals;
  const popularityGroups = {};

  animalData.forEach((animal) => {
    const { name, popularity } = animal;
    if (!popularityGroups[popularity]) {
      popularityGroups[popularity] = [];
    }
    popularityGroups[popularity].push(name);
  });

  if (rating !== undefined) {
    return popularityGroups[rating] || [];
  }

  return popularityGroups;
}

function animalsByIds(ids) {
  if (!ids) {
    return [];
  }

  const animalData = data.animals;
  const result = [];

  if (Array.isArray(ids)) {
    ids.forEach((id) => {
      const animal = animalData.find((animal) => animal.id === id);
      if (animal) {
        result.push(animal);
      }
    });
  } else {
    const animal = animalData.find((animal) => animal.id === ids);
    if (animal) {
      result.push(animal);
    }
  }

  return result;
}

function animalByName(animalName) {
  const animalData = data.animals;
  let result = {};

  animalData.forEach((animal) => {
    const resident = animal.residents.find((res) => res.name === animalName);
    if (resident) {
      result = {
        name: resident.name,
        sex: resident.sex,
        age: resident.age,
        species: animal.name,
      };
    }
  });

  return result;
}

function employeesByIds(ids = []) {
  const employeeData = data.employees;

  if (!Array.isArray(ids)) {
    return employeeData.filter((employee) => employee.id === ids);
  } else {
    return employeeData.filter((employee) => ids.includes(employee.id));
  }
}

function employeeByName(employeeName) {
  const employeeData = data.employees;

  const foundEmployee = employeeData.find((employee) => {
    return (
      employee.firstName === employeeName || employee.lastName === employeeName
    );
  });

  return foundEmployee || {};
}

function managersForEmployee(idOrName) {
  const employeeData = data.employees;

  // Search for the employee by ID or name
  const employee = employeeData.find((employee) => {
    return (
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
    );
  });

  // If the employee is not found, return an empty object
  if (!employee) return {};

  // Get the names of the employee's managers
  const managerNames = employee.managers.map((managerId) => {
    const manager = employeeData.find((manager) => manager.id === managerId);
    return `${manager.firstName} ${manager.lastName}`;
  });

  // Get the responsibilities of the employee
  const responsibilities = employee.responsibleFor;

  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    managers: managerNames,
    responsibleFor: responsibilities,
  };
}

function employeeCoverage(idOrName) {
  const employeeData = data.employees;
  const animalData = data.animals;
  const employeeCoverageMap = {};

  // Function to get employee's full name
  const getFullName = (employee) =>
    `${employee.firstName} ${employee.lastName}`;

  // If no parameter is provided, return a list of all employees and the animals they're responsible for
  if (!idOrName) {
    employeeData.forEach((employee) => {
      const fullName = getFullName(employee);
      employeeCoverageMap[fullName] = [];
      employee.responsibleFor.forEach((animalId) => {
        const animalName = animalData.find(
          (animal) => animal.id === animalId
        ).name;
        employeeCoverageMap[fullName].push(animalName);
      });
    });
  } else {
    // Search for the employee by ID or name
    const employee = employeeData.find((employee) => {
      return (
        employee.id === idOrName ||
        employee.firstName === idOrName ||
        employee.lastName === idOrName
      );
    });

    if (employee) {
      const fullName = getFullName(employee);
      employeeCoverageMap[fullName] = [];
      employee.responsibleFor.forEach((animalId) => {
        const animalName = animalData.find(
          (animal) => animal.id === animalId
        ).name;
        employeeCoverageMap[fullName].push(animalName);
      });
    }
  }

  return employeeCoverageMap;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage,
};
