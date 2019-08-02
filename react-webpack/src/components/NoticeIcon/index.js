import React from 'react';
import { Popover, Icon, Badge } from 'antd';
import cs from 'classnames';
import styles from './index.less';

export default class NoticeIcon extends React.PureComponent {
    render() {
        const {
            className, popupAlign, onPopupVisibleChange, popupVisible,
        } = this.props;

        const popoverProps = {};
        if ('popupVisible' in this.props) {
            popoverProps.visible = popupVisible;
        }
        return (
          <Popover
              placement="bottomRight"
              content="hello"
                popupClassName={styles.popover}
                trigger="click"
              arrowPointAtCenter
              popupAlign={popupAlign}
              onVisibleChange={onPopupVisibleChange}
              {...popoverProps}
            >
              <span className={cs(className, styles.noticeButton)}>
              <Badge count={10} className={styles.badge}>
                      <Icon type="bell" className={styles.icon} />
                    </Badge>
                </span>
            </Popover>
        );
    }
}
