import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChartContainer from './ChartContainer.jsx';

const styles = {};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3C91E6',
    accent1Color: '#85D838',
    accent2Color: '#FA824C',
  },
});

export default class KnownUser extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
    
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
     const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleRequestClose}
      />
    );

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


    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container} className="container">
          <AppBar title={<div><img id="header-logo" src="assets/images/orange-logo.png"/>Bowling Average</div>} iconElementRight={<MenuDots/>} showMenuIconButton={false}/>
          <div className="content">
            <ChartContainer games={this.props.games}/>
          </div>
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

{/*<Dialog
                open={this.state.open}
                title="I know you!"
                actions={standardActions}
                onRequestClose={this.handleRequestClose}
            >
                Your average is {Math.round(this.props.average)}.
            </Dialog>
            <RaisedButton
                className="margin-top"
                label="Welcome back!"
                secondary={true}
                onClick={this.handleTouchTap}
            />
            </div>*/}