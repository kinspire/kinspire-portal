import firebaseService from "./firebaseService";

export default {
  login,
  logout,
  signup
};

const db = firebaseService.db;

// Returns a promise that resolves when the user is logged in, or throws an
// error.
function login(username, password) {
  return db.collection("users").where("username", "==", username).limit(1).get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        throw new Error("No user with given username!");
      }
      const doc = querySnapshot.docs[0];
      if (doc.data().password === password) {
        localStorage.setItem("user", JSON.stringify(doc.data()));
        localStorage.setItem("userId", doc.id);
        return doc.data();
      } else {
        throw new Error("Incorrect password");
      }
    });
}

// Returns a promise that resolves when the user is logged out
function logout() {
  return new Promise(resolve => {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    resolve();
  });
}

// Returns a promise that resolves when the user has successfully signed up, or
// throws an error.
function signup(details) {
  details.username = (details.firstName + details.lastName).toLowerCase();
  return db.collection("users").where("username", "==", details.username).limit(1).get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        throw "Duplicate username";
      }

      // Creation of all new records for this user
      return db.collection("users").add(details);
    })
    .then(() => {
      localStorage.setItem("user", JSON.stringify(details));
      return details;
    });
}
