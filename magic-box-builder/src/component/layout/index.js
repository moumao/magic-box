import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
import WrappedNormalLoginForm from './loginForm'
import WrappedNormalSigninForm from './signinForm'
import { Menu, Dropdown, Button, Layout, Avatar, Modal } from 'antd';
import styles from './index.css';

const { Item } = Menu;
const { Header, Content, Footer } = Layout;

const UserManage = ({ name, header }) => {
  return (
    <div className={styles['manage']}>
      <Dropdown overlay={(
        <Menu>
          <Item>
            <a target="_blank" rel="noopener noreferrer">{name}</a>
          </Item>
          <Item>
            <a target="_blank" rel="noopener noreferrer">log out</a>
          </Item>
        </Menu>
      )} placement="bottomCenter">
        <Avatar src={header} className={styles['manage-avatar']} />
      </Dropdown>
    </div>
  )
}

const UserEntrance = ({ loginVisible, showLoginModal, loginHandleSubmit, loginHandleCancel,
                        signinVisible, showSigninModal, signinHandleSubmit, signinHandleCancel }) => {
  return (
    <div className={styles['entrance']}>
      <span className={styles['entrance-item']} onClick={showLoginModal}>log in</span>
      <Modal
          title="Log in"
          visible={loginVisible}
          onCancel={loginHandleCancel}
          footer={null}
        >
        <WrappedNormalLoginForm loginHandleSubmit={loginHandleSubmit} />
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

const mapStateToProps = ({ userInfo }) => ({ userInfo });

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: () => {
            dispatch(getUserInfo())
        }
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

  loginHandleSubmit = userInfo => {
    this.setState({
      loginVisible: false,
    });
    console.log('Received values of log in: ', userInfo);
  }

  signinHandleSubmit = userInfo => {
    this.setState({
      signinVisible: false,
    });
    console.log('Received values of sign in: ', userInfo);
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
    const { userInfo, getUserInfo } = this.props;
    const { hasLogin } = userInfo;
    hasLogin && getUserInfo();
  }

  render() {
    const { loginVisible, signinVisible } = this.state;
    const { userInfo, hasLogin } = this.props.userInfo;

    return (
      <Layout className={styles['layout']}>
        <Header className={styles['header']}>
          <div className="logo" className={styles['logo']}>Magic Box</div>
          {hasLogin
            ? (<UserManage {...userInfo}/>)
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
