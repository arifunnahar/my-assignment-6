

## 1. Difference between `var`, `let`, and `const`

In JavaScript, var, let, and const are all used to declare variables, but they differ in scope, mutability, and hoisting behavior. let and const were introduced in ES6 (2015) to address common issues associated with var.

var 
Scope: Function-scoped or global-scoped, meaning it's accessible throughout the function it's declared in or the entire script if declared globally.
Hoisting: It is hoisted to the top of its scope and automatically initialized with undefined.
Re-declaration/Reassignment: You can re-declare and reassign a var variable.

let
Scope:
Block-scoped, meaning it's only accessible within the curly braces {} where it's defined. 
Hoisting:
It is hoisted but not initialized, placing it in a Temporal Dead Zone (TDZ) until its declaration. Accessing it before declaration results in a ReferenceError. 
Re-declaration/Reassignment:
You can reassign a let variable, but you cannot re-declare it with the same name within the same scope.

const
Scope: Block-scoped, just like let. 
Hoisting: Similar to let, it's hoisted but not initialized, residing in a TDZ before its declaration. 
Re-declaration/Reassignment: const variables cannot be reassigned or re-declared after their initial declaration. However, if the const variable holds an object or an array, you can still modify its properties or elements. 

---

## 2. Difference between `map()`, `forEach()`, and `filter()`

The map(), forEach(), and filter() methods in JavaScript are all used to iterate over arrays, but they serve different purposes and have distinct return values.

forEach():
Purpose: To execute a provided function once for each element in the array. It's primarily used for side effects, such as logging values, modifying external variables, or performing actions that don't require a new array as a result.
Return Value: undefined. forEach() does not return a new array or any other value.

map():
Purpose: To create a new array by applying a provided function to each element of the original array. It transforms each element and collects the results into a new array, leaving the original array unchanged.
Return Value: A new array containing the results of calling the provided function on every element in the original array. 

filter():
Purpose: To create a new array containing only the elements from the original array that satisfy a specified condition. The provided function acts as a test, and only elements for which the function returns a truthy value are included in the new array.
Return Value: A new array containing only the elements that pass the test implemented by the provided function. If no elements pass the test, an empty array is returned. 
---

## 3. Arrow Functions in ES6

Arrow functions were introduced in ECMAScript 6 (ES6) as a more concise way to write function expressions, with a distinct behavior for the this keyword. 
Concise syntax
Arrow functions omit the function keyword, using an arrow (=>) between the parameter list and the function body. 
No parameters
An empty set of parentheses is required for a function with no parameters.

Traditional: 
javascript

let greet = function() {
  return 'Hello!';
};


Arrow:
javascript
let greet = () => 'Hello!';


## 4. Destructuring Assignment in ES6

Destructuring assignment is an ES6 feature that allows you to unpack values from arrays or properties from objects into distinct variables with a more concise syntax. This makes code cleaner and more readable than the traditional method of accessing each value individually. 
Array destructuring
Array destructuring allows you to assign array elements to variables based on their position (index). 

Old way :
javascript
const fruits = ['apple', 'banana', 'cherry'];

const first = fruits[0];
const second = fruits[1];
console.log(first, second); // apple banana
Use code with caution.



New way (ES6):
javascript
const fruits = ['apple', 'banana', 'cherry'];

const [first, second] = fruits;
console.log(first, second); // apple banana


## 5. Template Literals in ES6

Template literals, introduced in ES6, are a modern way to create strings in JavaScript using backticks ( `` ) instead of single or double quotes. They offer several advantages, including multi-line string support and string interpolation. 

String interpolation
You can embed variables, expressions, or function calls directly within a string using the ${expression} syntax. This makes dynamic strings more readable than traditional string concatenation with the + operator. 
Example:
javascript
const name = 'Alex';
const age = 30;

// Traditional concatenation
const oldWay = 'My name is ' + name + ' and I am ' + age + ' years old.';
console.log(oldWay); // "My name is Alex and I am 30 years old."

// Template literal
const newWay = `My name is ${name} and I am ${age} years old.`;
console.log(newWay); // "My name is Alex and I am 30 years old."
