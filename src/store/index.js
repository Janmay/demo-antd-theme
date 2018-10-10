import { createStore } from 'redux';
import reducers from '../reducers';

const configureStore = (preloadedState = {}) => {
    const store = createStore(
        reducers,
        preloadedState
    );

    return store;
}

export default configureStore;