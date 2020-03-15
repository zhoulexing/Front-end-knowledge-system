import configureStore from "@/store/start";
import { createHashHistory } from "history";

describe("test store", () => {
    const store = configureStore({ history: createHashHistory() });
    console.log(store);
});