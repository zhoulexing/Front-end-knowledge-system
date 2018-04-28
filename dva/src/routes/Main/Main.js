import React from 'react';
import { connect } from 'dva';
import styles from './Main.less';

function MainPage() {
  return (
    <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
            <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
            <li><a href="https://github.com/zhoulexing/Front-end-knowledge-system">Getting Started</a></li>
        </ul>
    </div>
  );
}

MainPage.propTypes = {
};

export default connect()(MainPage);
