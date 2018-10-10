import React, { PureComponent } from 'react';
import SelectTheme from '../SelectTheme';
import styles from './index.module.less';

export default class GlobalHeaderRight extends PureComponent {
    render() {
        const { theme } = this.props;
        let className = styles.right;
        if (theme === 'dark') {
            className = `${styles.right}  ${styles.dark}`;
        }
        return (
            <div className={className}>
                <SelectTheme />
            </div>
        )
    }
}