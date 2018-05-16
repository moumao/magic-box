import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Icon , Col, Row, Tabs, Card } from 'antd';
import Iframe from 'react-iframe'
import { saveSchema } from 'actions/schema';
import BaseData from './components/BaseData'
import SchemaData from './components/SchemaData'
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
        iFrame: null,
        schema: this.props.edit.schema,
        id: this.props.match.params.id
    }

    componentDidMount() {
        const iFrame = document.getElementById('myIframe');
        this.setState({
            iFrame
        })
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

    back = () => {
        const { history } = this.props
        const { push } = history;
        push(`/`)
    }

    render() {
        const { edit, saveSchema, match } = this.props;
        const { schema, url } = edit;
        const { baseData, components, meta } = schema;
        const { params } = match;

        return(
            <div>
                <Row type="flex" align="top" justify="center">
                    <Col span={2}>
                        <Card className={styles['component-list']} bodyStyle={{padding: 12}}>
                            <Icon type="left" onClick={this.back} className={styles['component-box']} />
                            <Icon type="save" onClick={saveSchema.bind(null, JSON.stringify(this.state.schema), this.state.id)} className={styles['component-box']} />
                        </Card>
                    </Col>
                    <Col span={8}>
                            <Iframe
                                className={styles['iframe-box']}
                                url={params.id === "new" ? "http://127.0.0.1:3001/new" : url}
                                id="myIframe"
                                width="400px"
                                height="650px"
                                display="initial"
                                position="relative"
                                className={styles['iframe']}
                                allowFullScreen/>
                    </Col>
                    <Col span={14}>
                        <Tabs defaultActiveKey="1" onChange={() => {}}>
                            <TabPane tab="基本信息" key="1">
                                <BaseData baseData={baseData} meta={meta} />
                            </TabPane>
                            <TabPane tab="组件配置" key="2">Content of Tab Pane 2</TabPane>
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
