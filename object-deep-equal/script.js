const object1 = {
  name: "Viktor",
  age: 24,
  skills: ["JS", "HTML5", "CSS3"],
  obj: {a: "a", b: "b", c: {a1:"a1", b1: "b1", c1: {a2: "a2", b2: "b2"}}}
}
const object2 = {
  name: "Viktor",
  age: 24,
  skills: ["JS", "HTML5", "CSS3"],
  obj: {a: "a", b: "b", c: 'c'}
}
const object3 = {
  name: "Viktor",
  age: 24,
  skills: ["JS", "HTML5", "CSS3"],
  obj: {a: "a", b: "b", c: {a1:"a1", b1: "b1", c1: {a2: "a2", b2: "b2", b3: "b3"}}}
}
const object4 = {
  name: "Viktor",
  age: 24,
  skills: ["JS", "HTML5", "CSS3"],
  obj: {a: "a", b: "b", c: {a1:"a1", b1: "b1", c1: {a2: "a2", b2: "b2"}}}
}

function deepObjectsEqual (obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  const keys = Object.keys(obj1);
  for (key of keys) {
    if (Array.isArray(obj1[key])) {
      if (obj1[key].join('') !== obj2[key].join('')) return false;
      continue;
    } 
    if (obj1[key] instanceof Object) {
      if (!obj2[key] instanceof Object) return false;
      console.log(obj1[key], obj2[key]);
      return deepObjectsEqual(obj1[key], obj2[key]);
    } 
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}