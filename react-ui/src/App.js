import React from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';

import Accounts from './components/Accounts';
import Header from "./components/Header";

export const App = ({apiStatus, accounts, total}) => (
  <React.Fragment>
    <Header apiStatus={apiStatus} total={total} />
    <Container fluid>
      <Accounts accounts={accounts} />
    </Container>
  </React.Fragment>
);

export default connect(state => ({
  apiStatus: state.api.status,
  accounts: Object.values(state.accounts),
  total: Object.values(state.accounts).reduce((sum, account) => sum + account.balance, 0)
}))(App);
