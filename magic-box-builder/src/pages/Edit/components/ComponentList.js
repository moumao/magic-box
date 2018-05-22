import React, {Component} from 'react';
import { Tree, Col, Row, Menu, Dropdown, Button, Icon, Input } from 'antd';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import styles from '../index.css';

const { TextArea } = Input;
const { TreeNode } = Tree;
const { Item } = Menu;

export default class ComponentList extends Component {

    state = {
        selectCom: null,
        selectIndex: ''
    }

    onSelect = selectedKeys => {
        const { components, saveComToState } = this.props;
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
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
              },
              props: {},
              domProps: {},
              nativeOn: {},
              attrs: {},
              on: {}
          },
          components: []
      })

    handleMenuClick = ({ key }) => {
        if (key){
            const { selectCom } = this.state;
            const { components, saveComToState} = this.props;
            Array.isArray(selectCom)
              ? selectCom.push(this.getBase(key))
              : selectCom['components'].push(this.getBase(key));
            this.setState({
                selectCom
            });
            saveComToState(components);
        }
    }

    menu = () => {
        return (
          <Menu onClick={this.handleMenuClick}>
              <Item key="div">盒子</Item>
              <Item key="button">按钮</Item>
              <Item key="span">标签</Item>
              <Item key="br">换行</Item>
              <Item key="nav">导航</Item>
              <Item key="ul">ul</Item>
              <Item key="li">li</Item>
              <Item key="p">文字段落</Item>
              <Item key="a">连接</Item>
              <Item key="h1">一号标题</Item>
              <Item key="h2">二号标题</Item>
              <Item key="h3">三号标题</Item>
              <Item key="h4">四号标题</Item>
              <Item key="h5">五号标题</Item>
              <Item key="h6">六号标题</Item>
          </Menu>
        );
    }

    render() {
        const { selectCom, selectIndex } = this.state;
        const { components, saveComToState} = this.props;
        return (
            <div>
                <Row type="flex" align="top" justify="center">
                    <Col span={5}>
                        <Tree
                          showLine
                          onSelect={this.onSelect}
                          treeDefaultExpandAll={true}
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
                                          }}
                                        />
                                      <br/>
                                      <span>背景图片：</span>
                                      <Input
                                          style={{width: 200, marginBottom: 8}}
                                          value={selectCom['data']['style']['background-image']}
                                          onChange={e => {
                                              selectCom['data']['style']['background-image'] = e.target.value;
                                              this.setState({
                                                  selectCom
                                              });
                                              saveComToState(components);
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
                                                      saveComToState(components);
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
                                                      saveComToState(components);
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
                                              saveComToState(components);
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
                                              saveComToState(components);
                                          }}
                                        >删除该组件</Button>
                                  </div>
                              )}
                          </div>) : <div>请选择组件进行编辑</div>}
                    </Col>
                    <Col span={9}>{selectCom && !Array.isArray(selectCom) && (
                            <div>
                                <span>href属性：</span>
                                <Input
                                    style={{width: 200, marginBottom: 8}}
                                    value={selectCom['data']['domProps']['href'] || ''}
                                    onChange={e => {
                                        selectCom['data']['domProps']['href'] = e.target.value;
                                        this.setState({
                                            selectCom
                                        });
                                        saveComToState(components);
                                    }}
                                  />
                                <br/>
                                <span>点击事件：</span>
                                <Input
                                    style={{width: 200, marginBottom: 8}}
                                    value={selectCom['data']['nativeOn']['click'] || ''}
                                    onChange={e => {
                                        selectCom['data']['nativeOn']['click'] = e.target.value;
                                        selectCom['data']['on']['click'] = e.target.value;
                                        this.setState({
                                            selectCom
                                        });
                                        saveComToState(components);
                                    }}
                                  />
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}
