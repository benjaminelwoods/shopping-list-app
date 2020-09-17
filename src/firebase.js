var firebase = require('firebase')

var firebaseObj = {
  firebaseConfig: {
    apiKey: 'AIzaSyAQPC75PeBM1KxIoKPJln9fs7SXonc-Jxw',
    authDomain: 'shopping-list-app-74fc5.firebaseapp.com',
    databaseURL: 'https://shopping-list-app-74fc5.firebaseio.com',
    projectId: 'shopping-list-app-74fc5',
    storageBucket: 'shopping-list-app-74fc5.appspot.com',
    messagingSenderId: '842871118984',
    appId: '1:842871118984:web:f33e7cef63abc99a88933d'
  },
  getDb: function () {
    const firebaseApp = firebase.initializeApp(firebaseObj.firebaseConfig)
    const db = firebaseApp.firestore()
    return db
  }
}

module.exports = firebaseObj.getDb()
