import React, {Component} from 'react';
import { Tree, Col, Row, Menu, Dropdown, Button, Icon, Input } from 'antd';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import styles from '../index.css';

const { TextArea } = Input;
const { TreeNode } = Tree;

export default class ComponentList extends Component {

    state = {
        selectCom: null,
        selectIndex: ''
    }

    onSelect = selectedKeys => {
        const { components, saveComToSchemaToState } = this.props;
        const select = selectedKeys[0].split('-');
        if (select.length === 1) {
            this.setState({
                selectCom: components,
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
            selectCom: x,
            selectIndex: select
        })
    }

    renderChild = (components, fatherId) => {
        return components.map((item, key) => {
            if(typeof item === 'string') {
                return
            }
            return React.createElement(TreeNode,
                { key: `${fatherId}-${key}`, title: item.type },
                this.renderChild(item.components, `${fatherId}-${key}`))
        })
    }

    getBase = type => ({
          type: type,
          data: {
              style: {
                  width: "200px",
                  height: "300px"
              },
              props: {}
          },
          components: []
      })

    handleMenuClick = ({key}) => {
        const { selectCom } = this.state;
        const { components, saveComToSchemaToState} = this.props;
        switch (key) {
          case 'div':
              Array.isArray(selectCom)
                ? selectCom.push(this.getBase('div'))
                : selectCom['components'].push(this.getBase('div'));
              this.setState({
                  selectCom
              });
              saveComToSchemaToState(components);
          case 'button':

          default:

        }
    }

    menu = () => {
        return (
          <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="div">div</Menu.Item>
            <Menu.Item key="button">button</Menu.Item>
          </Menu>
        );
    }

    render() {
        const { selectCom, selectIndex } = this.state;
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
                    <Col span={9}>
                        {selectCom ?
                          (<div>
                              <span>添加子组件：</span>
                              <Dropdown overlay={this.menu()}>
                                  <Button style={{ marginBottom: 8 }}>
                                      组件列表 <Icon type="down" />
                                  </Button>
                              </Dropdown>
                              {Array.isArray(selectCom) ? null : (
                                  <div>
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
                                      <br/>
                                      <span>行高：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['line-height']}
                                          onChange={e => {
                                              selectCom['data']['style']['line-height'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>字体粗细：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['font-weight']}
                                          onChange={e => {
                                              selectCom['data']['style']['font-weight'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>字体大小：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['font-size']}
                                          onChange={e => {
                                              selectCom['data']['style']['font-size'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>对齐方向：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['text-align']}
                                          onChange={e => {
                                              selectCom['data']['style']['text-align'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>外部填充：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['margin']}
                                          onChange={e => {
                                              selectCom['data']['style']['margin'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>内部填充：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['padding']}
                                          onChange={e => {
                                              selectCom['data']['style']['padding'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>边框：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['border']}
                                          onChange={e => {
                                              selectCom['data']['style']['border'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>边角：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['border-radius']}
                                          onChange={e => {
                                              selectCom['data']['style']['border-radius'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        />
                                      <br/>
                                      <div style={{width: 200, marginBottom: 8}}>
                                          <span style={{float: 'left'}}>背景颜色：</span>
                                              <ColorPicker
                                                  animation="slide-up"
                                                  color={selectCom['data']['style']['background-color'] || '#fff'}
                                                  onChange={({ color }) => {
                                                      selectCom['data']['style']['background-color'] = color;
                                                      this.setState({
                                                          selectCom
                                                      });
                                                      saveComToSchemaToState(components);
                                                  }}
                                                />
                                      </div>
                                      <div style={{width: 200, marginBottom: 8}}>
                                          <span style={{float: 'left'}}>文字颜色：</span>
                                              <ColorPicker
                                                  animation="slide-up"
                                                  color={selectCom['data']['style']['color'] || '#fff'}
                                                  onChange={({ color }) => {
                                                      selectCom['data']['style']['color'] = color;
                                                      this.setState({
                                                          selectCom
                                                      });
                                                      saveComToSchemaToState(components);
                                                  }}
                                                />
                                      </div>
                                      <span style={{float: 'left'}}>内容：</span>
                                      <TextArea
                                          rows={4}
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['components'][0]}
                                          onChange={e => {
                                              selectCom['components'][0] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                      />
                                      <Button
                                          type="danger"
                                          onClick={() => {
                                              const length = selectIndex.length - 1;
                                              let x = components;
                                              selectIndex.map((item, key) => {
                                                  if(key === length ){
                                                      x.splice(item, 1)
                                                      return
                                                  }
                                                  x = x[`${item}`]['components']
                                              })
                                              this.setState({
                                                  selectCom: ''
                                              });
                                              saveComToSchemaToState(components);
                                          }}
                                        >删除该组件</Button>
                                  </div>
                              )}
                          </div>) : <div>请选择组件进行编辑</div>}
                    </Col>
                    <Col span={9}>{selectCom && (
                            <div>
                                其他
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}
