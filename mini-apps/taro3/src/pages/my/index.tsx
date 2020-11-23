import React from "react";
import { View, Button } from "@tarojs/components";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/user";
import { AtButton } from 'taro-ui';

const My = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const changeUsername = () => {
        setUser({ username: "yww" });
    };
    return (
        <View>
            <Button onClick={changeUsername}>{user.username}</Button>
            <AtButton type='primary'>taro-ui</AtButton>
        </View>
    );
};

export default My;
