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

    // getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps);
    //     return {
    //       schema: JSON.stringify(nextProps.schema, null, 4)
    //     };
    // }
    //
    // componentWillUpdate(nextProps, nextState) {
    //     console.log(nextProps);
    //     this.setState({schema: JSON.stringify(nextProps.schema, null, 4)});
    // }
    //
    // shouldComponentUpdate(nextProps, nextState) {
    //   const next = JSON.stringify(nextState.schema, null, 4)
    //   const { schema } = this.state;
    //   console.log(next === schema);
    //   return  schema === next ? false : true;
    // }

    render() {
        const { sendMessage, saveSchemaState, schema } = this.props;
        console.log('render schema');
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
                        saveSchemaState(JSON.parse(jsonToObjEscape(editor)));
                        sendMessage(editor);
                    }}
                />
            </div>
        )
    }
}
