import React, {Component} from 'react';
import styles from '../index.css';
import { jsonToObjEscape } from 'util/json'
import { Button } from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

export default class SchemaData extends Component {
    state = {
        components: JSON.stringify(this.props.components, null, 4)
    }

    render() {
        const { saveComToState, components } = this.props;
        return (
            <div className={styles['schema-data']}>
                <CodeMirror
                    value={this.state.components}
                    options={{
                      scrollbarStyle: null,
                      mode: 'javascript',
                      theme: 'material',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({components: value});
                    }}
                    onChange={(editor, data, value) => {
                        saveComToState(JSON.parse(jsonToObjEscape(editor)));
                        // sendMessage(editor);
                    }}
                />
            </div>
        )
    }
}
