import classNames from 'classnames';
import styles from './Text.module.scss';
import ReactMarkdown from 'react-markdown';

const Text = ({ children, className, modLarge = false, modWysiwyg = false }) => {
  const classes = classNames(styles.text, modLarge && styles['text--large'], className);

  if (modWysiwyg) {
    return (
      <div className={classes}>
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    );
  }

  return <div className={classes}>{children}</div>;
};

export default Text;

export { Text };
