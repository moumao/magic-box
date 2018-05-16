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
        schema: JSON.stringify(this.props.schema, null, 4)
    }

    render() {
        const { sendMessage, saveSchemaState } = this.props;

        return (
            <div className={styles['schema-data']}>
                <CodeMirror
                    value={this.state.schema}
                    options={{
                      scrollbarStyle: null,
                      mode: 'javascript',
                      theme: 'material',
                      lineNumbers: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        this.setState({schema: value});
                    }}
                    onChange={(editor, data, value) => {
                        saveSchemaState(JSON.parse(jsonToObjEscape(editor)))
                        sendMessage(editor)
                    }}
                />
            </div>
        )
    }
}
