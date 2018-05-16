import React, {Component} from 'react';
import styles from '../index.css';

export default class BaseData extends Component {

    render() {
        const { meta, baseData } = this.props;
        return (
            <div className={styles['base-data']}>基础内容</div>
        )
    }
}
