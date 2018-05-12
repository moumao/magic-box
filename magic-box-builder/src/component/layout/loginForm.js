import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.css';

const { Item, create} = Form;

@create()
export default class WrappedNormalLoginForm extends Component {
  state = {
    loading: false
  }

  handleSubmit = e =>  {
    e.preventDefault();
    const { form, loginHandleSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false })
          loginHandleSubmit(values)
        }, 500);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Item
          {...formItemLayout}
          label="UserName"
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Item>
        <Item
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Item>
        <Item {...tailFormItemLayout} style={{margin: 0}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
        </Item>
        <Item style={{margin: 0}}>
          <Button type="primary" htmlType="submit" loading={loading} className={styles['login-form-button']}>
            Log in
          </Button>
        </Item>
      </Form>
    );
  }
}
