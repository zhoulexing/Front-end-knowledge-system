import { atom } from "recoil";

interface UserProps {
    username: string;
}

export default atom<UserProps>({
    key: "user",
    default: {
        username: "zlx",
    },
});
