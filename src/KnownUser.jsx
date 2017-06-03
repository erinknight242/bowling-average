import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChartContainer from './ChartContainer.jsx';
import ScoreContainer from './ScoreContainer.jsx';
import { format } from './helpers';

const styles = {};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3C91E6',
    accent2Color: '#85D838',
    accent1Color: '#FA824C',
  },
});

export default class KnownUser extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      scoresModalOpen: false,
      mode: 'Add',
      date: new Date(),
      scores: [''],
    };
    
    this.handleClose = this.handleClose.bind(this);
    this.addScores = this.addScores.bind(this);
    this.scoreChanged = this.scoreChanged.bind(this);
    this.saveScores = this.saveScores.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  handleClose() {
    this.setState({
      scoresModalOpen: false,
      date: new Date(),
      scores: ['']
    });
  }

  addScores() {
    this.setState({
      scoresModalOpen: true,
      mode: 'Add',
    });
  }

  setDate(event, date) {
    this.setState({ date });
  }

  scoreChanged = (i, event) => {
    const scores = this.state.scores.slice();
    scores[i] = event.target.value;
    if (i === scores.length - 1) {
      scores.push('');
    }
    this.setState({ scores });
  };

  saveScores() {
    const scores = this.state.scores.slice(0, this.state.scores.length - 1);
    var userRef = this.props.db.ref('users/' + this.props.uid + '/games').push({
      date: format(this.state.date),
      scores
    })
    this.handleClose();
  }

    // this.props.db.ref('users/' + userId + '/games').set();
  /*
    // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
   */

  render() {
    const MenuDots = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign out" onClick={this.props.signOut} />
      </IconMenu>
    );

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.saveScores}
      />
    ];

    const inputs = [];
    for(let i = 0; i < this.state.scores.length; i++) {
      inputs.push(
        <TextField
          key={i}
          type="number"
          className="margin-right"
          hintText="Enter your score"
          floatingLabelText={'Score ' + (i + 1)}
          value={this.state.scores[i]}
          onChange={this.scoreChanged.bind(this, i)}
        />
      )
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container} className="container">
          <AppBar className="header" title={<div><img id="header-logo" src="assets/images/logo.png"/>Bowling Average</div>} iconElementRight={<MenuDots/>} showMenuIconButton={false}/>
          <div className="content">
            <ChartContainer games={this.props.games}/>
            <ScoreContainer games={this.props.games} addScores={this.addScores}/>
          </div>
          <Dialog
              open={this.state.scoresModalOpen}
              title={this.state.mode + ' Scores'}
              actions={actions}
              onRequestClose={this.handleClose}
            >
            <DatePicker
              hintText="Date" 
              floatingLabelText="Date"
              value={this.state.date}
              onChange={this.setDate}
              autoOk = {true}
            />
            {inputs}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

KnownUser.propTypes = {
  games: PropTypes.object,
  average: PropTypes.number,
  signOut: PropTypes.func
};
