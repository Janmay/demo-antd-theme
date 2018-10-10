import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Animate from 'rc-animate';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './Header.module.less';

const { Header } = Layout;

class HeaderView extends PureComponent {

    getHeaderWidth = () => {
        const { collapsed } = this.props;
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
    };

    render() {
        const { handleMenuCollapse, setting } = this.props;
        const { navTheme } = setting;
        const width = this.getHeaderWidth();
        return (
            <Animate component='' transitionName='fade'>
                <Header style={{ padding: 0, width }} className={styles.fixHeader}>
                    <GlobalHeader
                        onCollapse={handleMenuCollapse}
                    />
                </Header>
            </Animate>
        )
    }
}

export default connect(({ global, setting }) => ({
    collapsed: global.collapsed,
    setting
}))(HeaderView)