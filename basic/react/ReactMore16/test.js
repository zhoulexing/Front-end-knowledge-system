const { render, createElement } = require("./index");

/**
 * <App>
 *      <Parent>
 *          <Child></Child>
 *          <div class="test">Hello</div>
 *      </Parent>
 * </App>
 */
const h3 = createElement("h3", { class: "test" }, ["Hello"]);
console.log(h3);
