import React from "react";
import { View, Button } from "@tarojs/components";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/user";

const My = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const changeUsername = () => {
        setUser({ username: "yww" });
    };
    return (
        <View>
            <Button onClick={changeUsername}>{user.username}</Button>
        </View>
    );
};

export default My;
