const originalObj = {
  name: "Viktor",
  age: 24,
  skills: ["JS", "HTML5", "CSS3"],
  obj: {a: "a", b: "b", c: {a1:"a1", b1: "b1", c1: {a2: "a2", b2: "b2"}}}
}

function deepObjectCopy (obj) {
  const clone = {};
  for (let key in obj) {
    if (typeof obj[key] === "object") {
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
  console.log(originalObj);
console.groupEnd();

console.group('copied Object:');
  console.log(copiedObject);
console.groupEnd();

console.group('adding new data to original object:');
console.log(originalObj.obj.newField = 'newFiled');
console.log("copied object hasn't changed:");
console.log(copiedObject.obj);
console.groupEnd();
