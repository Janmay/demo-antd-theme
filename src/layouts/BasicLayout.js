import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Header from './Header';
import Footer from './Footer';
import SiderMenu from '@/components/SiderMenu';

const { Content } = Layout;

// Convert router to menu.
function formatter(data) {
    return data.map(item => {
        if (item.path) {
            const result = {
                ...item,
                locale: item.name || ''
            };
            if (item.routes) {
                const children = formatter(item.routes);
                result.children = children;
            }
            delete result.routes;
            return result;
        }

        return null;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
    'screen-xs': {
      maxWidth: 575,
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen-xl': {
      minWidth: 1200,
      maxWidth: 1599,
    },
    'screen-xxl': {
      minWidth: 1600,
    },
  };

class BasicLayout extends React.PureComponent {
    state = {
        menuData: this.getMenuData()
    };

    getMenuData() {
        const {
            route: { routes }
        } = this.props;
        return memoizeOneFormatter(routes);
    }

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };
    
    render() {
        const {
            children,
            location: { pathname },
            navTheme
        } = this.props;
        const { menuData } = this.state;
        const layout = (
            <Layout>
                <SiderMenu
                    theme={navTheme}
                    onCollapse={this.handleMenuCollapse}
                    menuData={menuData}
                    {...this.props}
                />
                <Layout style={{
                    minHeight: '100vh'
                }}>
                    <Header
                        handleMenuCollapse={this.handleMenuCollapse}
                    />
                    <Content>{children || 'a'}</Content>
                    <Footer/>
                </Layout>
            </Layout>
        )
        return (
            <React.Fragment>
                <DocumentTitle title='test'>
                    <ContainerQuery query={query}>
                        {(params) => (
                            <div className={classNames(params)}>{layout}</div>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </React.Fragment>
        )
    }
}

export default connect(({ global, setting }) => ({
    collapsed: global.collapsed,
    ...setting
}))(BasicLayout);