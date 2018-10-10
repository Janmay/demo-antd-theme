import { NAMESPACE_SEP } from './constants';

function prefix(obj, namespace, type) {
    return Object.keys(obj).reduce((memo, key) => {
        const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
        memo[newKey] = obj[key];
        return memo;
    }, {});
}

export default function prefixNamespace(model) {
    const {
        namespace,
        reducers,
    } = model;

    if (reducers) {
        model.reducers = prefix(reducers, namespace, 'reducer');
    }

    return model;
}