import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import { RecoilRoot } from 'recoil';
import './index.less';

ReactDOM.render(
  <RecoilRoot>
    <Routes />
  </RecoilRoot>,
  document.getElementById('root')
);


