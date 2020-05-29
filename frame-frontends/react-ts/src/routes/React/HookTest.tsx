import React, { useState, useEffect } from "react";
import { Button } from "antd";

function HookTest() {
    const [count, setCount] = useState(1);

    console.log("useEffect-before",count);

    useEffect(() => {
        console.log("useEffect-in",count);
    }, [count]);

    console.log("useEffect-after",count);

    return (
        <div>
            <Button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                添加
            </Button>
        </div>
    );
}

export default HookTest;
