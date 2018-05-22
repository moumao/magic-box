import React, {Component} from 'react';
import { Input } from 'antd';
import styles from '../index.css';

export default class BaseData extends Component {

    state = {
        baseData: this.props.baseData,
        meta: this.props.meta
    }

    render() {
        const { meta, baseData } = this.state
        const { saveBaseToState } = this.props;
        return (
          <div>
              <span>页面名称：</span>
              <Input
                  style={{width: 500, marginBottom: 8}}
                  value={baseData['title']}
                  onChange={e => {
                      baseData['title'] = e.target.value;
                      this.setState({
                          baseData,
                      })
                      saveBaseToState(baseData);
                  }}
                />
              <br />
            <span>页面描述：</span>
              <Input
                  style={{width: 500, marginBottom: 8}}
                  value={baseData['description']}
                  onChange={e => {
                      baseData['description'] = e.target.value;
                      this.setState({
                          baseData,
                      })
                      saveBaseToState(baseData);
                  }}
                />
          </div>
        )
    }
}
