import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

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
            location: { pathname }
        } = this.props;
        const layout = (
            <Layout>
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