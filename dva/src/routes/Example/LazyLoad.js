import React, { Component } from 'react';
import styles from './LazyLoad.less';

class LazyLoad extends Component {
    render() {
        const items = [
            { title: "image1", path: "/people.jpg" },
            { title: "image1", path: "/people.jpg" },
            { title: "image1", path: "/people.jpg" },
            { title: "image1", path: "/people.jpg" },
            { title: "image1", path: "/people.jpg" }
        ];
        return (
            <div className={ styles["lazy-load"] }>
                { items.map(item => {
                    return 
                }) }
            </div>
        )
    }
}

export default LazyLoad;
