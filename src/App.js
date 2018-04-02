import React from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';

import Accounts from './components/Accounts';
import Header from "./components/Header";

export const App = ({apiStatus, accounts}) => (
  <React.Fragment>
    <Header apiStatus={apiStatus} />
    <Container fluid>
      <Accounts accounts={accounts} />
    </Container>
  </React.Fragment>
);

export default connect(state => ({
  apiStatus: state.api.status
}))(App);
