import React from 'react';
import {
    Route,
    Switch,
    withRouter
} from "react-router-dom";

import {IndexPage} from "./pages/IndexPage";
import {LoginPage} from "./pages/LoginPage";
import {ErrorPage} from "./pages/ErrorPage";

import moment from "moment";
import 'moment/locale/ru';

moment.locale("ru");

const App = () => {
  return (
      <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/error' component={ErrorPage} />
          <Route path='/' component={IndexPage} />
      </Switch>
  );
}

export default withRouter(App);
