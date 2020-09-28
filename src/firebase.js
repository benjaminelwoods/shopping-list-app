var firebase = require('firebase')

var firebaseObj = {
  firebaseConfig: {

  },
  init: function () {
    // console.log('mean')
    // firebase.initializeApp(this.firebaseConfig)
    const firebaseApp = firebase.initializeApp(firebaseObj.firebaseConfig)
    const db = firebaseApp.database()
    return db
  }
}

module.exports = firebaseObj.init()
