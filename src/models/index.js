import prefixNamespace from '../utils/prefixNamespace';
import globalModel from './global';
import settingModel from './setting';

const models = [
    globalModel,
    settingModel
];

export function model(m) {
    const prefixedModel = prefixNamespace({ ...m });
    return prefixedModel;
}

export default models;