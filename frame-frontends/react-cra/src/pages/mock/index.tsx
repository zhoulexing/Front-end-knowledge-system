import React, { useEffect } from 'react';
import request from '../../utils/request';

const Mock: React.FC = (props) => {

    useEffect(() => {
        request('/user').then(res => {
            console.log(res);
        })
    }, []);

    return (
        <div>
            mock
        </div>
    )
}

export default Mock;