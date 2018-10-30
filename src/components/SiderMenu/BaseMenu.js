import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import memorizeOne from 'memoize-one';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../utils/pathTools';
import styles from './index.module.less';

const { SubMenu } = Menu;

const getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
        return <img src={icon} alt='icon' className={styles.icon} />;
    }
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
}

export const getMenuMatches = memorizeOne(
    (flatMenuKeys, path) => flatMenuKeys.filter(item => item && pathToRegexp(item).test(path)),
    isEqual
);

export const getFlatMenuKeys = menuData => 
    menuData.reduce((keys, item) => {
        if (item.children) {
            keys = keys.concat(getFlatMenuKeys(item.children));
        }
        keys.push(item.path);
        return keys;
    }, []);

export default class BaseMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.getSelectedMenuKeys = memorizeOne(this.getSelectedMenuKeys, isEqual);
        this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    }

    // Get the currently selected menu
    getSelectedMenuKeys = pathname =>
        urlToList(pathname).map(itemPath => getMenuMatches(this.flatMenuKeys, itemPath).pop());

    /* 获得菜单子节点 */
    getNavMenuItems = (menusData) => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                const ItemDom = this.getSubMenuOrItem(item);
                return ItemDom;
            })
            .filter(item => item);
    };

    getSubMenuOrItem = item => {
        if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
            const name = item.name;
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                                {getIcon(item.icon)}
                                <span>{name}</span>
                            </span>
                        ) : (
                            name
                        )
                    }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            )
        }
        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    };

    /* 判断是否是http链接.返回 Link 或 a */
    getMenuItemPath = item => {
        const name = item.name;
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const { location } = this.props;
        return (
            <Link
                to={itemPath}
                target={target}
                replace={itemPath === location.pathname}
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };
    
    render() {
        const {
            openKeys,
            theme,
            location: { pathname }
        } = this.props;
        // if pathname can't match, use the nearest parent's key
        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        let props = {};
        if (openKeys) {
            props = {
                openKeys,
            };
        }
        const { handleOpenChange, menuData } = this.props;
        return (
            <Menu
                key="menu"
                mode="inline"
                theme={theme}
                onOpenChange={handleOpenChange}
                selectedKeys={selectedKeys}
                {...props}
            >
                {this.getNavMenuItems(menuData)}
            </Menu>
        )
    }
}