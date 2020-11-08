import React from 'react';
import Count from './count';
import Name from './name';

const Test: React.FC = (props) => {
    document.title = 'recoil';
    return (
        <div>
            <Count />
            <Name />
        </div>
    )
}

export default Test;