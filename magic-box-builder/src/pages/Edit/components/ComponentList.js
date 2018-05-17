import React, {Component} from 'react';
import { Tree, Col, Row, Menu, Dropdown, Button, Icon, Input } from 'antd';
import styles from '../index.css';

const { TreeNode } = Tree;

export default class ComponentList extends Component {

    state = {
        selectCom: null
    }

    onSelect = selectedKeys => {
        const { components, saveComToSchemaToState } = this.props;
        const select = selectedKeys[0].split('-');
        if (select.length === 1) {
            this.setState({
                selectCom: 'selectCom'
            })
            return
        }
        select.shift();
        const length = select.length - 1;
        let x = components;
        select.map((item, key) => {
            if(key === length ){
                x = x[`${item}`]
                return
            }
            x = x[`${item}`]['components']
        })
        this.setState({
            selectCom: x
        })
        console.log(x);
        // x['data']['style'] = {...x['data']['style'], border: '3px solid rgb(255,0,0)'}
        // saveComToSchemaToState(components);
    }

    renderChild = (components, fatherId) => {
        return components.map((item, key) => React.createElement(TreeNode,
            { key: `${fatherId}-${key}`, title: item.type },
            this.renderChild(item.components, `${fatherId}-${key}`)))
    }

    handleMenuClick = e => {
        console.log('click', e);
    }

    menu = () => {
        return (
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">1st menu item</Menu.Item>
            <Menu.Item key="2">2nd menu item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
          </Menu>
        );
    }

    render() {
        const { selectCom } = this.state;
        const { components, saveComToSchemaToState} = this.props;
        return (
            <div>
                <Row type="flex" align="top" justify="center">
                    <Col span={5}>
                        <Tree
                          showLine
                          onSelect={this.onSelect}
                        >
                            {React.createElement(TreeNode, {key: "0", title: "页面"}, this.renderChild(components, "0"))}
                        </Tree>
                    </Col>
                    <Col span={18}>
                        {selectCom ?
                          <div>
                              <span>添加子组件：</span>
                              <Dropdown overlay={this.menu()}>
                                  <Button style={{ marginBottom: 8 }}>
                                      Button <Icon type="down" />
                                  </Button>
                              </Dropdown>
                              <br/>
                              <span>宽度：</span>
                              <Input
                                  style={{width: 200, marginBottom: 8}}
                                  value={selectCom['data']['style']['width']}
                                  onChange={e => {
                                      selectCom['data']['style']['width'] = e.target.value;
                                      this.setState({
                                          selectCom
                                      });
                                      saveComToSchemaToState(components);
                                  }}
                                />
                              <br/>
                              <span>高度：</span>
                              <Input
                                  style={{width: 200, marginBottom: 8}}
                                  value={selectCom['data']['style']['height']}
                                  onChange={e => {
                                      selectCom['data']['style']['height'] = e.target.value;
                                      this.setState({
                                          selectCom
                                      });
                                      saveComToSchemaToState(components);
                                  }}
                                />
                          </div> : <div>请选择组件进行编辑</div>}
                    </Col>
                </Row>
            </div>
        )
    }
}
