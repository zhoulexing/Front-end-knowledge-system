import configureStore from "@/store";
import { createHashHistory } from "history";

describe("test store", () => {
    const store = configureStore({ history: createHashHistory() });
    console.log(store);
});