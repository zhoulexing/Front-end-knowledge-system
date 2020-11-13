import React from "react";
import classNames from "classnames";
import styles from "./index.module.less";

interface SpinProps {
    spinning: boolean;
    tip?: string;
}

const Spin: React.FC<SpinProps> = (props) => {
    const { spinning, tip, children } = props;

    const spinElement = (
        <div className={styles.spin}>
            <span className={styles.dot}>
                <i className={styles.dotItem} />
                <i className={styles.dotItem} />
                <i className={styles.dotItem} />
                <i className={styles.dotItem} />
            </span>
            {tip && <div className={styles.text}>{tip}</div>}
        </div>
    );

    return (
        <div className={styles.nestLoading}>
            {spinning && <div>{spinElement}</div>}
            <div className={styles.container}>{children}</div>
        </div>
    );
};

export default Spin;
