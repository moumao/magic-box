import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Icon , Col, Row } from 'antd';
import { getSchemaList, deleteSchemaById, getEditSchema } from 'actions/schema';
import { PageCard, AddCard } from './components/cards'
import { jsonToObjEscape } from 'util/json'
import styles from './index.css';

const mapStateToProps = ({ user, schema }) => ({ user, schema });

const mapDispatchToProps = dispatch => {
    return {
        getSchemaList: () => dispatch(getSchemaList()),
        deleteSchemaById: id => dispatch(deleteSchemaById(id)),
        getEditSchema: editSchema => dispatch(getEditSchema(editSchema))
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {

    state = {
        alreadyGetSchema: false
    }

    componentDidMount() {
        const { user, getSchemaList } = this.props;
        const { hasLogin, userInfo } = user;
        hasLogin && this.setState({
            alreadyGetSchema: true
        }, getSchemaList);
    }

    componentDidUpdate() {
        const { user, getSchemaList } = this.props;
        const { alreadyGetSchema } =this.state;
        const { hasLogin, userInfo } = user;
        hasLogin && !alreadyGetSchema && this.setState({
            alreadyGetSchema: true
        }, getSchemaList);
        !hasLogin && alreadyGetSchema && this.setState({
            alreadyGetSchema: false
        });
    }

    getEditSchema = id => {
        const { schema, getEditSchema, history, user } = this.props;
        const { userInfo } = user;
        const { name } = userInfo;
        const { push } = history;
        if( id === 'new' ) {
            getEditSchema({
                author: name,
                schema: {
                  baseData: {
                  		title: "newPage",
                  		description: "this is my new page",
                  		bg: ""
                  	},
                  	meta: {

                  	},
                  	components: []
                }
            });
            push(`/edit/new`)
            return
        }
        const { schemaList } = schema;
        const [ editSchema ] = schemaList.filter(item => item.id === id);
        getEditSchema(editSchema);
        push(`/edit/${id}`);
    }

    render() {
        const { user, schema, deleteSchemaById, history } = this.props;
        const { push } = history;
        const { schemaList } = schema;
        const { userInfo, hasLogin } = user;

        return (
            <div>
                { hasLogin
                    ? (
                        <div>
                          <div className={styles['title']}>我的模版</div>
                          <div>
                            <Row type="flex" align="middle">
                                <Col span={6}>
                                    <AddCard userInfo={userInfo} getEditSchema={this.getEditSchema}/>
                                </Col>
                                {schemaList.map(item => (
                                  <Col span={6}>
                                    <PageCard getEditSchema={this.getEditSchema} deleteSchemaById={deleteSchemaById} schemaData={item}/>
                                  </Col>
                                ))}
                            </Row>
                          </div>
                        </div>)
                    : (<div className={styles['title']}>您还没有登陆，请登陆！  <Icon type="frown" /></div>)
                }
            </div>
        )
    }
}
