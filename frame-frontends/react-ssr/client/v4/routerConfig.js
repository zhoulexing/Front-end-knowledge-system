import React, { useState, useEffect } from 'react';

const Index = (props) => {
    console.log('Index component props:', props);

    const [data, setData] = useState(null);

    const onClick = () => {
        console.log('Index');
    }

    useEffect(() => {
        if(!data) {
            Index.getInitialProps().then(data => {
                setData(data);
            });
        }
    }, []);

    return <div onClick={onClick}>Index123</div>;
};

Index.getInitialProps = async () => {
    return {
        name: 'zlx'
    };
}

const List = () => {
    return <div>List</div>;
};

const About = () => {
    return <div>About</div>;
};

export default [
    {
        path: "/",
        component: Index,
        exact: true,
    },
    {
        path: "/index",
        component: Index,
        exact: true,
    },
    {
        path: "/list",
        component: List,
        exact: true,
    },
    {
        path: "/about",
        component: About,
        exact: true,
    },
];
