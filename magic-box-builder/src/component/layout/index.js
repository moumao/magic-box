import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo, login, logOut, signIn } from "actions/user";
import WrappedNormalLoginForm from './loginForm'
import WrappedNormalSigninForm from './signinForm'
import { Menu, Dropdown, Button, Layout, Avatar, Modal, notification } from 'antd';
import styles from './index.css';

const { Item } = Menu;
const { Header, Content, Footer } = Layout;

const openNotification = (type, message) => {
  notification[type]({
    message: type,
    description: message,
    duration: 1,
  });
};

const UserManage = ({ name, header, logOut }) => {
  return (
    <div className={styles['manage']}>
      <Dropdown overlay={(
        <Menu>
          <Item>
            <a target="_blank" rel="noopener noreferrer">{name}</a>
          </Item>
          <Item>
            <a target="_blank" onClick={logOut} rel="noopener noreferrer">log out</a>
          </Item>
        </Menu>
      )} placement="bottomCenter">
        <Avatar src={header} className={styles['manage-avatar']} />
      </Dropdown>
    </div>
  )
}

const UserEntrance = ({ loginVisible, showLoginModal, loginHandleSubmit, loginHandleCancel,
                        signinVisible, showSigninModal, signinHandleSubmit, signinHandleCancel, login }) => {
  return (
    <div className={styles['entrance']}>
      <span className={styles['entrance-item']} onClick={showLoginModal}>log in</span>
      <Modal
          title="Log in"
          visible={loginVisible}
          onCancel={loginHandleCancel}
          footer={null}
        >
        <WrappedNormalLoginForm loginHandleSubmit={loginHandleSubmit} login={login} />
      </Modal>
      <span className={styles['entrance-item']} style={{ cursor: 'default' }}>|</span>
      <span className={styles['entrance-item']} onClick={showSigninModal}>sign in</span>
      <Modal
          title="Sign in"
          visible={signinVisible}
          onCancel={signinHandleCancel}
          footer={null}
        >
        <WrappedNormalSigninForm signinHandleSubmit={signinHandleSubmit} />
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    login: params => dispatch(login(params)),
    logOut: () => dispatch(logOut()),
    signIn: params => dispatch(signIn(params))
  }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class MainLayout extends Component {
  state = {
    loginVisible: false,
    signinVisible: false
  }

  showLoginModal = () => {
    this.setState({
      loginVisible: true,
    });
  }

  showSigninModal = () => {
    this.setState({
      signinVisible: true,
    });
  }

  loginHandleSubmit = async userInfo => {
    const res = await this.props.login(userInfo);
    const state_code = res['data']['state_code'];
    if (state_code === '0') {
      this.setState({
        loginVisible: false,
      }, openNotification.bind(null, 'success', 'login success'));
    } else {
      openNotification('error', state_code)
    }
  }

  signinHandleSubmit = async userInfo => {
    const res = await this.props.signIn(userInfo);
    const state_code = res['data']['state_code'];
    if (state_code === '0') {
      this.setState({
        signinVisible: false,
      }, openNotification.bind(null, 'success', 'sign in success'));
    } else {
      openNotification('error', state_code)
    }
  }

  loginHandleCancel = e => {
    this.setState({
      loginVisible: false,
    });
  }

  signinHandleCancel = e => {
    this.setState({
      signinVisible: false,
    });
  }

  componentDidMount() {
    const { user, getUserInfo } = this.props;
    const { hasLogin } = user;
    hasLogin && getUserInfo();
  }

  render() {
    const { loginVisible, signinVisible } = this.state;
    const { user, login, logOut } = this.props;
    const { userInfo, hasLogin } = user;

    return (
      <Layout className={styles['layout']}>
        <Header className={styles['header']}>
          <div className="logo" className={styles['logo']}>Magic Box</div>
          {hasLogin
            ? (<UserManage {...userInfo} logOut={logOut} />)
            : (<UserEntrance
                loginVisible={loginVisible}
                showLoginModal={this.showLoginModal}
                loginHandleSubmit={this.loginHandleSubmit}
                loginHandleCancel={this.loginHandleCancel}
                signinVisible={signinVisible}
                showSigninModal={this.showSigninModal}
                signinHandleSubmit={this.signinHandleSubmit}
                signinHandleCancel={this.signinHandleCancel}
              />)}
        </Header>
        <Content className={styles['Content-bg']}>
          <div className={styles['Content']}>
            {this.props.children}
          </div>
        </Content>
        <Footer className={styles['footer']}>
          Magic Box ©2018 Created by 某猫
        </Footer>
      </Layout>
    )
  }
}
