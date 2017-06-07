import React, { Component } from 'react';
import * as firebase from 'firebase';
import KnownUser from './KnownUser.jsx';
import { getAverage, sortDates, getHighScore } from './helpers';
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
      games: null,
      average: null,
      loading: true,
      highScore: null,
      startingAverage: '',
      best: ''
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
      const ref = this.state.db.ref('users/' + uid).on('value', (snapshot) => {
      var data = snapshot.val();
      if (data) {
        var orderedGames = sortDates(data.games);
        me.setState({
          games: orderedGames,
          startingAverage: data.average || '',
          average: getAverage(orderedGames, data.average),
          best: data.best || '',
          loading: false,
          highScore: getHighScore(orderedGames, data.best)
        });
      } else {
        me.setState({ loading: false, games: null });
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

    const app = (<KnownUser
      average={this.state.average}
      best={this.state.best}
      startingAverage={this.state.startingAverage}
      signOut={this.signOut}
      games={this.state.games}
      db={this.state.db}
      uid={this.state.uid}
      highScore={this.state.highScore}
    />);

    return this.state.uid != null && !this.state.loading ? app : loading;
  }
}
