import React, {Component} from 'react';
import  styles from './Page1.css';
import { Button } from 'antd';

export default class Page1 extends Component {
    render() {
        return (
            <Button type="primary" className={styles['page-box']} >Page1~</Button>
        )
    }
}
