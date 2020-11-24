import React from 'react';
import { useRecoilState } from 'recoil';
import globalState from '../../atoms/global';

const Count = () => {
    const [global, setGlobal] = useRecoilState(globalState);
    console.log(global);

    const onClick = () => {
        setGlobal({ ...global, count: global.count + 1 });
    }

    return (
        <div onClick={onClick}>count</div>
    )
}

export default Count;