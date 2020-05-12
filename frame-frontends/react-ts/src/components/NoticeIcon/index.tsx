import * as React from "react";
import { Popover, Badge } from "antd";
import styles from "./index.less";
import cs from "classnames";
import { BellOutlined } from "@ant-design/icons";

interface NoticeIconProps {
    className?: string;
    popupVisible?: boolean;
    count: number;
    content: string | React.ReactNode;
    trigger: string;
}

export default class NoticeIcon extends React.PureComponent<NoticeIconProps> {
    render() {
        const { className, popupVisible, count, content, trigger } = this.props;

        const popoverProps: { visible?: boolean } = {};
        if ("popupVisible" in this.props) {
            popoverProps.visible = popupVisible;
        }
        return (
            <Popover
                placement="bottomRight"
                content={content}
                trigger={trigger}
                arrowPointAtCenter
                {...popoverProps}
            >
                <span className={cs(className, styles.noticeButton)}>
                    <Badge count={count} className={styles.badge}>
                        <BellOutlined className={styles.icon} />
                    </Badge>
                </span>
            </Popover>
        );
    }
}
