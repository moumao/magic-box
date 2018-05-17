import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Icon , Col, Row, Tabs, Card } from 'antd';
import Iframe from 'react-iframe'
import { saveSchema } from 'actions/schema';
import BaseData from './components/BaseData';
import SchemaData from './components/SchemaData';
import ComponentList from './components/ComponentList';
import styles from './index.css';


const TabPane = Tabs.TabPane;

const mapStateToProps = ({ schema }) => ({ edit: schema.edit });

const mapDispatchToProps = dispatch => {
    return {
        saveSchema: (schema, id) => dispatch(saveSchema(schema, id))
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Edit extends Component {
    state = {
        bg: '',
        iFrame: null,
        schema: this.props.edit.schema,
        id: this.props.match.params.id,
        hadAddImage: false
    }

    componentDidMount() {
        const iFrame = document.getElementById('myIframe');
        this.setState({
            iFrame
        })
        window.addEventListener("message", this.receiveMessageFromIframe, false);
    }

    receiveMessageFromIframe = event => {
        const { data } = event;
        const { schema } = this.state;
        if(typeof data === 'string'){
            schema['baseData']['bg'] = data;
            this.setState({
                schema,
                hadAddImage: true
            })
        }
    }

    sendMessage = mes => {
        const { iFrame } = this.state;
        iFrame.contentWindow.postMessage(mes, '*');
    }

    saveSchemaState = schema => {
        this.setState({
            schema,
        })
    }

    saveComToSchemaToState = components => {
        const { schema } = this.state;
        schema['components'] = components;
        this.sendMessage(JSON.stringify(schema));
        this.setState({
            schema,
        })
    }

    getImageThenSaveSchema = () => {
        const { iFrame } = this.state;
        iFrame.contentWindow.postMessage('saveImage', '*');
        const getBg =  setInterval(() => {
            const { saveSchema } = this.props;
            const { schema, id, hadAddImage } = this.state
            if(hadAddImage) {
              saveSchema(JSON.stringify(schema), id);
              this.setState({
                  hadAddImage: false
              })
              clearInterval(getBg);
            }
        }, 50)
    }

    back = () => {
        const { history } = this.props
        const { push } = history;
        push(`/`)
    }

    render() {
        const { schema } = this.state;
        const { edit, saveSchema, match } = this.props;
        const { url } = edit;
        const { baseData, components, meta } = schema;
        const { params } = match;

        return(
            <div>
                <Row type="flex" align="top" justify="center">
                    <Col span={2}>
                        <Card className={styles['component-list']} bodyStyle={{padding: 12}}>
                            <Icon type="left" onClick={this.back} className={styles['component-box']} />
                            <Icon type="save" onClick={this.getImageThenSaveSchema} className={styles['component-box']} />
                            <Icon type="upload" className={styles['component-box']}/>
                      </Card>
                    </Col>
                    <Col span={8}>
                            <div >
                                <Iframe
                                    url={params.id === "new" ? "http://127.0.0.1:3001/new" : url}
                                    id="myIframe"
                                    width="400px"
                                    height="650px"
                                    display="initial"
                                    position="relative"
                                    className={styles['iframe']}
                                    allowFullScreen/>
                            </div>
                    </Col>
                    <Col span={14}>
                        <Tabs defaultActiveKey="1" onChange={() => {}}>
                            <TabPane tab="基本信息" key="1">
                                <BaseData baseData={baseData} meta={meta} />
                            </TabPane>
                            <TabPane tab="组件配置" key="2">
                                <ComponentList saveComToSchemaToState={this.saveComToSchemaToState} components={components} />
                            </TabPane>
                            <TabPane tab="事件配置" key="3">Content of Tab Pane 3</TabPane>
                            <TabPane tab="全局配置" key="4">Content of Tab Pane 3</TabPane>
                            <TabPane tab="schema信息" key="5">
                                <SchemaData schema={schema} saveSchemaState={this.saveSchemaState} sendMessage={this.sendMessage} />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>

        )
    }
}
