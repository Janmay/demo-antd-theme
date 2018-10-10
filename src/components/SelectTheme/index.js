import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Dropdown } from 'antd';
import styles from './index.module.less';

const Tag = ({ color, check, ...rest }) => (
    <div
      {...rest}
      style={{
        backgroundColor: color,
      }}
    >
      {check ? <Icon type="check" /> : ''}
    </div>
);

@connect(({ setting }) => ({ setting }))
class SelectTheme extends PureComponent {

    colorList = [
        {
          key: 'dust',
          color: '#F5222D',
        },
        {
          key: 'volcano',
          color: '#FA541C',
        },
        {
          key: 'sunset',
          color: '#FAAD14',
        },
        {
          key: 'cyan',
          color: '#13C2C2',
        },
        {
          key: 'green',
          color: '#52C41A',
        },
        {
          key: 'daybreak',
          color: '#1890FF',
        },
        {
          key: 'geekblue',
          color: '#2F54EB',
        },
        {
          key: 'purple',
          color: '#722ED1',
        },
    ];

    onChange = (value) => {
        const { setting } = this.props;
        const nextState = { ...setting };
        const colorItem = this.colorList.find(c => c.key === value);
        nextState.primaryColor = colorItem.color;
        this.setState(nextState, () => {
            const { dispatch } = this.props;
            dispatch({
                type: 'setting/changeSetting',
                payload: this.state,
            })
        })
    }

    render() {
        const { setting } = this.props;
        const { primaryColor } = setting;
        const themeMenu = (
            <Menu onClick={({ key }) => this.onChange(key)}>
                {this.colorList.map(({ key, color }) => (
                    <Menu.Item key={key}>
                        <Tag
                            className={styles.colorBlock}
                            color={color}
                            check={primaryColor === color}
                        />
                    </Menu.Item>
                ))}
            </Menu>
        );
        return (
            <Dropdown overlay={themeMenu}>
                <span className={styles.dropdown}>
                    <span>主题</span>
                    <Icon type="down" />
                </span>
            </Dropdown>
        )
    }
}

export default SelectTheme;