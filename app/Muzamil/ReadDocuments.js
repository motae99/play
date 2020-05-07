import firestore from '@react-native-firebase/firestore';

export const readDocuments = (collection, options = {}) => {
  let {where, orderBy, startAfter, limit} = options;
  let query = firestore().collection(collection);

  if (where) {
    if (where[0] instanceof Array) {
      // It's an array of array
      for (let w of where) {
        query = query.where(...w);
      }
    } else {
      query = query.where(...where);
    }
  }

  if (orderBy) {
    query = query.orderBy(...orderBy);
  }

  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return query;
  // .get()
  // .then()
  // .catch()
};

// Usage
// Multiple where
// let options = {where: [["category", "==", "someCategory"], ["color", "==", "red"], ["author", "==", "Sam"]], orderBy: ["date", "desc"]};

// //OR
// // A single where
// let options = {where: ["category", "==", "someCategory"]};

// let documents = readDocuments("books", options);
