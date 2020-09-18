var firebase = require('firebase')

var firebaseObj = {
  firebaseConfig: {
  },
  getDb: function () {
    const firebaseApp = firebase.initializeApp(firebaseObj.firebaseConfig)
    const db = firebaseApp.firestore()
    return db
  }
}

module.exports = firebaseObj.getDb()
