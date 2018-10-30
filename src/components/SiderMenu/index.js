import React, { PureComponent } from 'react';
import { Layout, Avatar } from 'antd';
import BaseMenu, { getMenuMatches, getFlatMenuKeys } from './BaseMenu';
import { urlToList } from '../utils/pathTools';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const { Sider } = Layout;

/* 获得菜单子节点 */
const getDefaultCollapsedSubMenus = props => {
    const {
        location: { pathname },
        menuData
    } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return urlToList(pathname)
        .map(item => getMenuMatches(flatMenuKeys, item)[0])
        .filter(item => item);
};

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname } = state;
        if (props.location.pathname !== pathname) {
            return {
                pathname: props.location.pathname,
                openKeys: getDefaultCollapsedSubMenus(props)
            }
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
        });
    };

    render() {
        const { theme, collapsed, onCollapse } = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys };

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint='lg'
                onCollapse={onCollapse}
                width={256}
                theme={theme}
            >
                <div id="logo" className={styles.logo}>
                    <Link to='/'>
                        <Avatar size='large' icon="user" />
                        <h1>Demo</h1>
                    </Link>
                </div>
                <BaseMenu
                    {...this.props}
                    handleOpenChange={this.handleOpenChange}
                    onOpenChange={this.handleOpenChange}
                    style={{ padding: '16px 0', width: '100%', overflowX: 'hidden' }}
                    {...defaultProps}
                />
            </Sider>
        )
    }
}