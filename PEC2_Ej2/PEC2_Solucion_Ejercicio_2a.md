# EJRCICIO 1

**a.** (0.50 puntos) Observa que se han creado funciones handle en el fichero controlador (todo.controller.js), las cuales son pasadas como parámetro. Esto es debido al problema con el cambio de contexto (this) que existe en JavaScript. Ahora mismo si no tienes muy claro que está sucediendo, revisa qué hacen las “fat-arrow” de ES6 sobre el objeto this, y prueba a cambiar el código para comprender qué está sucediendo cuando se modifica la siguiente línea:

`this.view.bindAddTodo(this.handleAddTodo);`

Por esta:

`this.view.bindAddTodo(this.service.addTodo);`

### - ¿Por qué es el valor de this es undefined?

Porque en JavaScript, cuando llamas a una función, el valor de `this` depende de cómo se llama a la función:

- Si llamas a una función desde un objeto, como `objeto.funcion()`, entonces `this` se refiere al objeto que llamó a la función. Por ejemplo, si Max llama a una función `bark()`, dentro de `bark()`, `this` se refiere a Max.

- Si llamas a una función de forma independiente, como `funcion()`, entonces `this` puede referirse a diferentes cosas:
  - En el modo estricto (`"use strict"`), `this` será `undefined`.
  - En el modo no estricto, `this` puede referirse al objeto global (en un navegador, el objeto `window`).

- Si usas una arrow function (`() => {}`), `this` se refiere al valor de `this` en el contexto donde se define la arrow function. Esto se llama "captura léxica". En otras palabras, `this` dentro de una arrow function se comporta como `this` fuera de la arrow function.

Entonces, cuando usas una arrow function para definir un método en un objeto, como `handleAddTodo = todoText => {}`, `this` dentro de `handleAddTodo` se refiere al objeto que contiene `handleAddTodo`, en este caso, `TodoController`.

Pero si pasas una función regular sin hacer un enlace explícito del contexto (con `bind()`), como `this.service.addTodo`, el valor de `this` dentro de `addTodo` dependerá de cómo se llame `addTodo` más adelante en el código, y eso puede causar confusión y errores si `addTodo` asume que `this` se refiere a `TodoController` cuando en realidad no lo hace.

## Webgrafía

1. **MDN Web Docs - `this` en JavaScript:**
   - [MDN Web Docs - this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

2. **Understanding JavaScript's `this` keyword:**
   - [Understanding JavaScript's this keyword](https://www.digitalocean.com/community/tutorials/understanding-javascript-this-keyword)

3. **`this` en JavaScript:**
   - [JavaScript.info - this in methods](https://javascript.info/object-methods#this-in-methods)

4. **Dominando `this` en JavaScript:**
   - [Dominando this en JavaScript](https://medium.com/@benjaminweinert/mastering-this-in-javascript-c5d76caad889)

