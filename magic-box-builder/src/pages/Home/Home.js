import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Icon , Col, Row } from 'antd';
import { getSchemaList, deleteSchemaById } from 'actions/schema';
import { PageCard, AddCard } from './components/cards'
import styles from './index.css';

const mapStateToProps = ({ user, schema }) => ({ user, schema });

const mapDispatchToProps = dispatch => {
    return {
        getSchemaList: () => dispatch(getSchemaList()),
        deleteSchemaById: id => dispatch(deleteSchemaById(id))
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

    render() {
        const { user, schema, deleteSchemaById } = this.props;
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
                                  <AddCard userInfo={userInfo}/>
                                </Col>
                                {schemaList.map(item => (
                                  <Col span={6}>
                                    <PageCard deleteSchemaById={deleteSchemaById} schemaData={item}/>
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
