import React, {Component} from 'react';

export default class Home extends Component {
    state = {
        count: 0
    }

    _handleClick = () => {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        const { count } = this.state
        return (
            <div>
                当前计数：{count}<br/>
                <button onClick={this._handleClick}>自增</button>
            </div>
        )
    }
}
