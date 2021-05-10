function loader(source) {
    const style = `
        let style = document.createElement("style");
        style.innterHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `;
    return style;
}

module.exports = loader;