import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import styles from './index.less';
import map from './map';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
    return (WrappedComponent) => {
      return class BasicComponent extends Component {
        static contextTypes = {
          form: PropTypes.object,
          updateActive: PropTypes.func,
        };
        componentDidMount() {
          if (this.context.updateActive) {
            this.context.updateActive(this.props.name);
          }
        }
        render() {
          const { getFieldDecorator } = this.context.form;
          const options = {};
          let otherProps = {};
          const { onChange, defaultValue, rules, name, ...restProps } = this.props;
          options.rules = rules || defaultRules;
          if (onChange) {
            options.onChange = onChange;
          }
          if (defaultValue) {
            options.initialValue = defaultValue;
          }
          otherProps = restProps || otherProps;
          return (
            <FormItem>
              {getFieldDecorator(name, options)(
                <WrappedComponent {...defaultProps} {...otherProps} />
              )}
            </FormItem>
          );
        }
      };
    };
  }

const LoginItem = {};
Object.keys(map).forEach(item => {
    LoginItem[item] = generator({
        defaultProps: map[item].props,
        defaultRules: map[item].rules,
        type: item,
    })(map[item].component);
});

export default LoginItem;
