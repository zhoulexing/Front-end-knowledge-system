import { getRoutes } from "./util";

test("return need routes", () => {
    const obj = { component: null };
    const routerConfig = {
        "/a": obj,
        "/b": obj,
        "/a/1": obj,
        "/a/2": obj,
        "/a/1/x": obj,
        "/a/1/y": obj,
    } as any;
    const routes = getRoutes("/a", routerConfig);
    expect(routes.length).toBe(2);
});
