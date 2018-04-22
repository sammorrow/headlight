import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// constants

const defaultState = {queries: []}

// action creators


// thunks


// reducer 


const reducer = (state = defaultState, action) => {
    let newState = {...state}
    switch (action.type){
        case "NEW":
            return newState;
        default:
            return newState;
    }
}

export default createStore(reducer, applyMiddleware(thunk));