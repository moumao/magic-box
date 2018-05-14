import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Icon , Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { getSchemaList, deleteSchemaById } from 'actions/schema';
import styles from './index.css';

export default class Edit extends Component {

    render() {
        const { match } = this.props;
        console.log(match);

        return(
            <Link to='/'>back</Link>
        )
    }
}
