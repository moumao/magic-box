import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.css';

const { Item } = Form;

class NormalSigninForm extends Component {
  state = {
    loading: false,
    confirmDirty: false,
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, signinHandleSubmit } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false }, signinHandleSubmit.bind(null, values));
        }, 3000);
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
            rules: [{
              required: true, message: 'Please input your Password!'
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Item>
        <Item
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" type="lock" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
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

const WrappedNormalSigninForm = Form.create()(NormalSigninForm);

export default WrappedNormalSigninForm;
