// @flow
import { usersDb } from '../db';
import { firebaseService } from './firebaseService';

export const authService = {
  login,
  loginLocal,
  logout,
  signup
};

const db = firebaseService.db;

//////// PROMISE HELPER FUNCTIONS ////////

// Login
function login(username) {
  return new Promise((resolve, reject) => {
    db.collection("users").where("username", "==", username).limit(1).get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          reject("No user with given username!");
          return;
        }

        querySnapshot.forEach(doc => {
          localStorage.setItem('user', JSON.stringify(doc.data()));
          resolve(doc.data());
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Login local
function loginLocal(username) {
  return new Promise((resolve, reject) => {
    usersDb.find({ username: username }, (err, users) => {
      if (err !== null || !users.length) return reject(err);

      localStorage.setItem('user', JSON.stringify(users[0]));
      resolve(users[0]);
    });
  });
}

// TODO make a Promise
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function signup(details) {
  return new Promise((resolve, reject) => {
    details.username = (details.firstName + details.lastName).toLowerCase();
    // TODO transactions
    db.collection("users").where("username", "==", details.username).limit(1).get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          reject("Duplicate username");
          return;
        }

        // Creation of all new records for this user
        db.collection("users").add(details)
          .then(() => {
            localStorage.setItem('user', JSON.stringify(details));
            resolve(details);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
}
