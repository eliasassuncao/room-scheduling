import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SYSTEM_ROUTES } from './constants';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RoomDetailsScreen from './pages/RoomDetailsScreen';
import RoomListScreen from './pages/RoomListScreen';
import CreateRoomScreen from './pages/CreateRoomScreen';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter basename="/">
          <Switch>
            <Route
              exact
              path={SYSTEM_ROUTES.ROOM_DETAILS.routeTo}
              component={RoomDetailsScreen}
            />
            <Route
              exact
              path={SYSTEM_ROUTES.ROOM_LIST.routeTo}
              component={RoomListScreen}
            />
            <Route
              exact
              path={SYSTEM_ROUTES.CREATE_ROOM.routeTo}
              component={CreateRoomScreen}
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App;
