'use strict';

import { test } from './page1.js'
document.write(`hello world ~ ${ test() }`);

test()

if (module.hot) {
    module.hot.accept();
}