import React from 'react';

const Index = () => {
    const onClick = () => {
        console.log('Index');
    }

    return <div onClick={onClick}>Index123</div>;
};

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
