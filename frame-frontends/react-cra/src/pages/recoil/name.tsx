import React from 'react';
import { useRecoilState } from 'recoil';
import globalState from '../../atoms/global';


const Name = () => {
    const [global] = useRecoilState(globalState);

    return (
        <div>{ global.name + global.count }</div>
    )
}

export default Name;