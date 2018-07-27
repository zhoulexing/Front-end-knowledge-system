import styles from "../stylesheets/main.less";

export const setCtnToRoot =  (str) => {
    const dom = document.createElement("div");
    dom.classList.add(styles.main);
    dom.innerHTML = str;
    document.getElementById("root").appendChild(dom);
}