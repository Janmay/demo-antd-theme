const { injectBabelPlugin } = require('react-app-rewired');
const rewireLessWithModule = require('react-app-rewire-less-with-modules');
const MergeLessPlugin = require('antd-pro-merge-less');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = (config, env) => {
    const outFile = resolve('.temp/ant-design.less');
    const stylesDir = resolve('src');

    config = rewireLessWithModule(config, env, {
        javascriptEnabled: true
    });
    config = injectBabelPlugin('transform-decorators-legacy', config);
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config.plugins.push(new MergeLessPlugin({
        stylesDir,
        outFile
    }));
    config.plugins.push(new AntDesignThemePlugin({
        antDir: resolve('node_modules/antd'),
        stylesDir,
        varFile: resolve('node_modules/antd/lib/style/themes/default.less'),
        mainLessFile: outFile,
        indexFileName: 'index.html'
    }));
    config.resolve.alias = {
        '@': resolve('src'),
        'antd': resolve('node_modules/antd')
    };
    return config;
}