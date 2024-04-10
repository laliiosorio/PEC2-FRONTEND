# PEC2 Lenguajes de desarrollo front-end

## Login UOC
losorioortega3

## Alumna
Laura Osorio Ortega

## Repositorio Git
[PEC 2](https://github.com/laliiosorio/PEC2-FRONTEND)

## Comentarios
En el ejercicio PEC2_Ej3 ---> d_every en la función **allSameVowels** hay un error en el test y ademas lo que se pide hacer no es muy claro.


Porque se esta pidiendo que la palabra tenda las mismas vocales solamente o tambien ademas la misma cantidad de vocales.

En todo caso, para la función decidí solo validar que tengan las mismas vocales.

Y en cuanto al test como se muestra abajo

 ```
 it("#allSameVowels", function() {
    const goodInput = ["amalgam", "zoom"];
    assert.equal(core.allSameVowels(goodInput), true);

    const badInput = ["zoom", "oligopoly"];
    assert.equal(core.allSameVowels(badInput), false);
  });
  ```

se compara las vocales entre la palabra **amalgam** y **zoom**

  `const goodInput = ["amalgam", "zoom"]`

y además se espera que el resultado sea **true**, cuando esta claro que nunca va a ser true porque las dos palabras no contienen las mismas vocales.

  `assert.equal(core.allSameVowels(goodInput), true);`
