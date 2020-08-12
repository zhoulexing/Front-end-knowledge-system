import React from 'react';
import styles from './index.less';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className={styles.home}>Home</div>
    )
};

export default Home;
