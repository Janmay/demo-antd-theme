import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

const GlobalFooter = ({ className, links, copyright }) => {
    const clsString = classNames(styles.globalFooter, className);console.log(styles.globalFooter)
    return (
        <div className={clsString}>
        {links && (
            <div className={styles.links}>
            {links.map(link => (
                <a
                key={link.key}
                title={link.title}
                target={link.blankTarget ? '_blank' : 'self'}
                href={link.href}>
                    {link.title}
                </a>
            ))}
            </div>
        )}
        {copyright && <div className={styles.copyright}>{copyright}</div>}
        </div>
    )
}

export default GlobalFooter;