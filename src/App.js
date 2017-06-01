import React, { Component } from 'react';
import Layout from './Layout';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: 20
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class App extends Component {
    constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
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

    return (
      <Layout>
        <MuiThemeProvider muiTheme={muiTheme}>
            <div style={styles.container}>
            <Dialog
                open={this.state.open}
                title="Super Secret Password"
                actions={standardActions}
                onRequestClose={this.handleRequestClose}
            >
                1-2-3-4-5
            </Dialog>
            <RaisedButton
                label="Super Secret Password"
                secondary={true}
                onClick={this.handleTouchTap}
            />
            </div>
        </MuiThemeProvider>
      </Layout>
    );
  }
}