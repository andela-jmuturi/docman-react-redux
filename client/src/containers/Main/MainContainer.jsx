import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
// eslint-disable-next-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SnackBarContainer from '../Utils/SnackBarContainer';

export default class MainContainer extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className='main-application'>
          {this.props.children}
          <SnackBarContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}
