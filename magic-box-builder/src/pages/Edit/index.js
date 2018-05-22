import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Icon , Col, Row, Tabs, Card, Modal, Upload, message, Button } from 'antd';
import { jsonToObjEscape } from 'util/json'
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
        hadAddImage: false,
        uploadVisible: false,
        fileList: []
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

    saveSchemaState = components => {
      const { schema } = this.state;
      schema['components'] = components;
      this.sendMessage(JSON.stringify(schema));
        this.setState({
            schema,
        });
    }

    saveComToState = components => {
        const { schema } = this.state;
        schema['components'] = components;
        this.sendMessage(JSON.stringify(schema));
        this.setState({
            schema,
        });
    }

    saveBaseToState = components => {
        const { schema } = this.state;
        schema['baseData'] = components;
        this.setState({
            schema,
        });
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

    showUploadModal = () => {
        this.setState({
          uploadVisible: true,
        });
    }

    uploadHandleCancel = () => {
        this.setState({
          uploadVisible: false,
        });
    }

    uploadHandleOk = () => {
        this.setState({
          uploadVisible: false,
        });
    }

    handleChange = info => {
        let fileList = info.fileList;

        fileList = fileList.map((file) => {
         if (file.response) {
           file.url = file.response.data.pictureUrl;
         }
         return file;
        });

        // // 3. filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //  if (file.response) {
        //    return file.response.status === 'success';
        //  }
        //  return true;
        // });

        this.setState({ fileList });
    }

    render() {
        const { schema, uploadVisible, list, fileList} = this.state;
        const { edit, saveSchema, match } = this.props;
        const { url } = edit;
        const { baseData, components, meta } = schema;
        const { params } = match;
        const uploadProps = {
            accept: 'image',
            action: 'http://my.magic.com/api/picture/upload',
            onChange: this.handleChange,
            multiple: true,
        };

        return(
            <div>
                <Row type="flex" align="top" justify="center">
                    <Col span={2}>
                        <Card className={styles['component-list']} bodyStyle={{padding: 12}}>
                            <Icon type="left" onClick={this.back} className={styles['component-box']} />
                            <Icon type="save" onClick={this.getImageThenSaveSchema} className={styles['component-box']} />
                            <Icon type="upload"  onClick={this.showUploadModal} className={styles['component-box']}/>
                            <Modal
                                title="上传图片"
                                visible={uploadVisible}
                                onOk={this.uploadHandleOk}
                                onCancel={this.uploadHandleCancel}
                              >
                                  <Upload {...uploadProps} fileList={fileList}>
                                      <Button>
                                          请选择文件
                                      </Button>
                                  </Upload>
                            </Modal>
                      </Card>
                    </Col>
                    <Col span={8}>
                            <div>
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
                                <BaseData baseData={baseData} meta={meta} saveBaseToState={this.saveBaseToState}/>
                            </TabPane>
                            <TabPane tab="组件配置" key="2">
                                <ComponentList saveComToState={this.saveComToState} components={components} />
                            </TabPane>
                            <TabPane tab="schema信息" key="5">
                                <SchemaData components={components} saveComToState={this.saveComToState} />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>

        )
    }
}
