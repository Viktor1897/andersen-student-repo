const originalObj = {
  name: "Viktor",
  age: 24,
  skills: ["JS", "HTML5", "CSS3"],
  obj: {a: "a", b: "b", c: {a1:"a1", b1: "b1", c1: {a2: "a2", b2: "b2"}}}
}

function deepObjectCopy (obj) {
  const clone = {};
  for (let key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      clone[key] = deepObjectCopy(obj[key]);
    } else {
      clone[key] = obj[key];
    }
    
  }
  return clone;
}

const copiedObject = deepObjectCopy(originalObj);

/*---Demo---*/
console.group('origin Object:');
  console.log(JSON.parse(JSON.stringify(originalObj)));
console.groupEnd();

console.group('copied Object:');
  console.log(JSON.parse(JSON.stringify(copiedObject)));
console.groupEnd();

console.group('%c add new data to original object:', 'background: #555; color: #bada55');
  console.log(`originalObj.obj.newField = %c${originalObj.obj.newField = 'newFiled'}`, 'color: red');
  console.log("%c copied object hasn't changed:", 'background: #555; color: #bada55');
  console.log(`copiedObject.obj.newField = %c${copiedObject.obj.newField}`, 'color: red');
console.groupEnd();

console.group('origin Object:');
  console.log(JSON.parse(JSON.stringify(originalObj)));
console.groupEnd();

console.group('copied Object:');
  console.log(JSON.parse(JSON.stringify(copiedObject)));
console.groupEnd();

