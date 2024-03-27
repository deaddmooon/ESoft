function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (typeof obj === "function" || typeof obj === "symbol") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Map) {
    const copyMap = new Map();
    for (const [key, value] of obj.entries()) {
      copyMap.set(key, deepCopy(value));
    }
    return copyMap;
  }
  if (obj instanceof Set) {
    const copySet = new Set();
    for (const value of obj) {
      copySet.add(deepCopy(value));
    }
    return copySet;
  }
  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  const newObj = Object.create(Object.getPrototypeOf(obj));
  for (const key in obj) {
    newObj[key] = deepCopy(obj[key]);
  }

  return newObj;
}

//Тесты
const testObject = {
  name: "Arseniy",
  age: 20,
  address: {
    street: "228 Cherry Street",
    city: "Los Angeles",
    state: "California",
    zip: "455788",
  },
  friends: ["Angelina", "Daniil"],
  birthDate: new Date(2003, 6, 4),
  favourites: ["design", "sports", "cooking"],
};

const copiedObj = deepCopy(testObject);


testObject.name = "Arseniy Golovach";
testObject.address.city = "Texas";
testObject.friends.push("Anastasia");

console.log(copiedObj.name); 
console.log(copiedObj.address.city); 
console.log(copiedObj.friends);
