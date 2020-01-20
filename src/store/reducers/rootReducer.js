import { combineReducers } from 'redux';
import burgerBuilderReducer from './burgerBuilderReducer';
import orderReducer from './orderReducer';

const initialState = {};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    };
};

const rootReducer = combineReducers({
    main: mainReducer,
    burger: burgerBuilderReducer,
    order: orderReducer,
});

export default rootReducer;