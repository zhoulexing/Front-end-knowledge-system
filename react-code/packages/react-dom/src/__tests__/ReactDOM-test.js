let React;
let ReactDOM;

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== "development" && NODE_ENV !== "production") {
    throw new Error(
        "NODE_ENV must either be set to development or production."
    );
}
global.__DEV__ = NODE_ENV === "development";
global.__PROFILE__ = NODE_ENV === "development";
global.__UMD__ = false;


if (typeof window !== "undefined") {
    global.requestAnimationFrame = function(callback) {
        setTimeout(callback);
    };

    global.requestIdleCallback = function(callback) {
        return setTimeout(() => {
            callback({
                timeRemaining() {
                    return Infinity;
                }
            });
        });
    };

    global.cancelIdleCallback = function(callbackID) {
        clearTimeout(callbackID);
    };
}

describe("ReactDOM", () => {
    beforeEach(() => {
        jest.resetModules();
        React = require("react");
        ReactDOM = require("../../index.js");
    });

    it("test render", function() {
        const container = document.createElement("div");
        function App() {
            return (
                <div>
                    <div>Hello World</div>
                    <Parent></Parent>
                </div>
            );
        }
        function Parent() {
            return <div>ZLX</div>;
        }
        ReactDOM.render(<App />, container);
    });
});
