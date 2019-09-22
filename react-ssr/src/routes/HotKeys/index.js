import React from 'react';
import { HotKeys } from 'react-hotkeys';

const keyMap = {
    SNAP_LEFT: "command+left",
    DELETE_NODE: ["del", "backspace"]
};

const Node = () => {
    function deleteNode() {
        console.log("aaa");
    }

    const handlers = {
        DELETE_NODE: deleteNode
    };

    return <HotKeys handlers={handlers}>Node contents</HotKeys>;
}

const MyHotKeys = () => {
    return (
        <HotKeys keyMap={keyMap}>
            <div>
                <Node />
                <Node />
            </div>
        </HotKeys>
    );
};

export default MyHotKeys;