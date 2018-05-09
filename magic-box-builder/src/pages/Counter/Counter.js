import React, {Component} from 'react';
import {increment, decrement, reset} from 'actions/counter';
import {connect} from 'react-redux';

const mapStateToProps = ({ counter }) => ({ ...counter });

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Counter extends Component {
    render() {
        const { count, increment, decrement, reset } = this.props;
        console.log(count);
        return (
            <div>
                <div>当前计数为{count}</div>
                <button onClick={increment}>自增</button>
                <button onClick={decrement}>自减ssss</button>
                <button onClick={reset}>重置</button>
            </div>
        )
    }
}
