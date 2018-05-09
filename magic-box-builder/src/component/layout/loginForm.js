import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.css';

const { Item } = Form;

class NormalLoginForm extends Component {
  state = {
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, loginHandleSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false }, loginHandleSubmit.bind(null, values));
        }, 3000);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Item>
        <Item style={{margin: 0}}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" loading={loading} className={styles['login-form-button']}>
            Log in
          </Button>
        </Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
