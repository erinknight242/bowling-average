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
import { format, dateUsed, clean } from './helpers';

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
      gameId: null,
      errorText: null,
    };
    
    this.handleClose = this.handleClose.bind(this);
    this.addScores = this.addScores.bind(this);
    this.scoreChanged = this.scoreChanged.bind(this);
    this.saveScores = this.saveScores.bind(this);
    this.editScores = this.editScores.bind(this);
    this.deleteScores = this.deleteScores.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  handleClose() {
    this.setState({
      scoresModalOpen: false,
      date: new Date(),
      scores: [''],
      gameId: null,
      errorText: null
    });
  }

  addScores() {
    this.setState({
      scoresModalOpen: true,
      mode: 'Add',
    });
  }

  editScores(game) {
    const scores = game.scores.slice();
    scores.push('');
    this.setState({
      scoresModalOpen: true,
      mode: 'Edit',
      date: new Date(game.date),
      scores,
      gameId: game.id
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
    const { mode, gameId, date } = this.state;
    const scores = clean(this.state.scores.slice());
    if (mode === 'Add') {
      if (typeof dateUsed(date, this.props.games) === 'object') {
        this.setState({
          errorText: <span>Date already exists; edit that row to add scores</span>
        });
      } else {
        var userRef = this.props.db.ref('users/' + this.props.uid + '/games').push({
          date: format(date),
          scores
        });
        this.handleClose();
      }
    } else if (mode === 'Edit' && gameId !== null) {
      var userRef = this.props.db.ref('users/' + this.props.uid + '/games/' + gameId ).update({
        date: format(date),
        scores
      });
      this.handleClose();
    }
  }

  deleteScores() {
    if (this.state.gameId !== null ) {
      var userRef = this.props.db.ref('users/' + this.props.uid + '/games/' + this.state.gameId ).remove();
      this.handleClose();
    }
  }

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

    const deleteButton = this.state.mode === 'Edit' ? <RaisedButton
        className="margin-left float-left"
        label="Delete Date"
        secondary={true}
        onClick={this.deleteScores}
    /> : '';

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handleClose}
      />,
      <FlatButton
        className="margin-right"
        label="Ok"
        primary={true}
        onClick={this.saveScores}
      />,
      deleteButton            
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

    const newUser = this.props.games === null;
    const welcome = (
      <div className="horizontal-flex margin-top content center">
        <div className="jumbo">Hi!</div>
        <RaisedButton
          className="margin-left"
          label="Add Scores"
          secondary={true}
          onClick={this.addScores}
        />
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container} className="container">
          <AppBar className="header" title={<div><img id="header-logo" src="assets/images/logo.png"/>Bowling Average</div>} iconElementRight={<MenuDots/>} showMenuIconButton={false}/>
          {newUser && welcome}
          {!newUser && <div className="content">
            <ChartContainer games={this.props.games}/>
            <ScoreContainer games={this.props.games} addScores={this.addScores} editScores={this.editScores}/>
          </div>}
          <Dialog
              open={this.state.scoresModalOpen}
              title={this.state.mode + ' Date'}
              actions={actions}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            <div className="margin-bottom">
              <DatePicker
                errorText={this.state.errorText}
                hintText="Date" 
                floatingLabelText="Date"
                value={this.state.date}
                onChange={this.setDate}
                autoOk = {true}
              />
              {inputs}
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

KnownUser.propTypes = {
  games: PropTypes.array,
  average: PropTypes.number,
  signOut: PropTypes.func
};
