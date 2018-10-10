import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
    <Footer style={{ padding: 0 }}>
        <GlobalFooter
          links={[
            {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true
            }
          ]}
          copyright={
            <Fragment>
              Copyright <Icon type="copyright" /> 2018
            </Fragment>
          }
        ></GlobalFooter>
    </Footer>
);

export default FooterView;