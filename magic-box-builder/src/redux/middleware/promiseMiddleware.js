import axios from 'axios';

export default  store => next => action => {
    const {dispatch, getState} = store;
    /*如果dispatch来的是一个function，此处不做处理，直接进入下一级*/
    if (typeof action === 'function') {
        action(dispatch, getState);
        return;
    }
    /*解析action*/
    const {
        promise,
        types,
        filterResult,
        afterSuccess,
        ...rest
    } = action;

    /*没有promise，证明不是想要发送ajax请求的，就直接进入下一步*/
    if (!action.promise) {
        return next(action);
    }

    /*解析types*/
    const { requset, success, fail } = types;

    /*开始请求的时候，发一个action*/
    next({
        ...rest,
        type: requset
    });
    /*定义请求成功时的方法*/
    const onFulfilled = result => {
        if (filterResult) {
            result = filterResult(result)
        }
        next({
            ...rest,
            result,
            type: success
        });
        if (afterSuccess) {
            afterSuccess(dispatch, getState, result);
        }
    };
    /*定义请求失败时的方法*/
    const onRejected = error => {
        next({
            ...rest,
            error,
            type: fail
        });
        res;
    };

    return promise(axios).then(onFulfilled, onRejected).catch(error => {
        console.error('MIDDLEWARE ERROR:', error);
        onRejected(error)
    })
}
