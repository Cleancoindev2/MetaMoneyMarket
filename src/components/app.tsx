import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as Web3 from 'web3';
import Web3Provider from 'web3-react';

import {ContractsProvider} from '../context/contracts';
import {Infura, MetaMask} from '../web3/connectors';

import Help from './help';
import Landing from './landing';
import {MainWrapper} from './layout/MainWrapper';
import MyAccount from './my-account';
import Terms from './terms';

/**
 * @NOTE This is a super hacky approach to having certain routes
 *  have the original MainWrapper component and for the new
 *  pages to be without the MainWrapper
 */
const WrappedMyAccount = (props: any) => (
  <MainWrapper>
    <MyAccount {...props} />
  </MainWrapper>
);
const WrappedHelp = (props: any) => (
  <MainWrapper>
    <Help {...props} />
  </MainWrapper>
);
const WrappedTerms = (props: any) => (
  <MainWrapper>
    <Terms {...props} />
  </MainWrapper>
);

const App: React.FC = () => {
  return (
    <Web3Provider connectors={{MetaMask, Infura}} libraryName={'web3.js'} web3Api={Web3}>
      <ContractsProvider>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path={`/`} component={Landing} />
            <Route exact={true} path={`/my-account`} component={WrappedMyAccount} />
            <Route exact={true} path={`/help`} component={WrappedHelp} />
            <Route exact={true} path={`/terms`} component={WrappedTerms} />
          </Switch>
        </BrowserRouter>
      </ContractsProvider>
    </Web3Provider>
  );
};

export default App;
