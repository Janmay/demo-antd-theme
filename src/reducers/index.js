import { handleActions } from 'redux-actions';
import models, { model } from '../models';
import { combineReducers } from 'redux';

let replaceModel;
const reducers = {};
models.forEach(m => {
    replaceModel = model(m);
    reducers[replaceModel.namespace] = handleActions(replaceModel.reducers || {}, replaceModel.state);
});

export default combineReducers(reducers);