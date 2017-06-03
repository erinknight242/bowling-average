import React, { Component } from 'react';
import * as firebase from 'firebase';
import NewUser from './NewUser.jsx';
import KnownUser from './KnownUser.jsx';
import { getAverage } from './helpers';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('../assets/css/style.scss');

injectTapEventPlugin();

export default class App extends Component {
    constructor(props, context) {
    super(props, context);

    this.getGames = this.getGames.bind(this);

    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBOBjNLRhnXM4vLv4zVfCF9_yFt5V0C1EI',
      authDomain: 'bowlingaverage-e9ad3.firebaseapp.com',
      databaseURL: 'https://bowlingaverage-e9ad3.firebaseio.com',
      projectId: 'bowlingaverage-e9ad3',
      storageBucket: 'bowlingaverage-e9ad3.appspot.com',
      messagingSenderId: '994230171423'
    };
    firebase.initializeApp(config);

    this.state = {
      uid: null,
      db: firebase.database(),
      games: [],
      loading: true
    };
  }

  componentDidMount() {
    var me = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
            me.setState({ uid });
            me.getGames(uid);
            }, null, '  ');
        } else {
        // User is signed out.
        window.location.replace('http://localhost:3000');
        }
      }, function(error) {
        console.log(error);
    });
  }

  getGames(uid) {
    var me = this;
    const ref = this.state.db.ref('users').orderByChild('uid').equalTo(uid).on('value', function(snapshot) {
      var data = snapshot.val();
      if (data) {
        me.setState({
          games: data[0].games,
          average: getAverage(data[0].games),
          loading: false
        });
      } else {
        me.setState({ loading: false });
      }
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  signOut() {
    firebase.auth().signOut();
  }

  render() {
    const loading = <div></div>;

    const app = this.state.uid != null && this.state.games.length ? 
      <KnownUser average={this.state.average} signOut={this.signOut} games={this.state.games} /> : <NewUser signOut={this.signOut} />;

    return this.state.uid != null && !this.state.loading ? app : loading;
  }
}
