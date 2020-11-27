import user from "./user";

export interface State {
    user: { username: string };
    loading: { global: boolean };
}

export default [user];
