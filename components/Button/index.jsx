import classNames from 'classnames';
import Link from 'next/link';
import styles from './Button.module.scss';

const Button = ({
  children,
  href = null,
  className,
  modWrapper,
  modAlt,
  modDark,
  onClick = null,
}) => {
  const classes = classNames(
    styles['button'],
    modAlt && styles['button--alt'],
    modDark && styles['button--dark'],
    className,
  );

  if (modWrapper) {
    return (
      <div className={classes} onClick={onClick}>
        {children}
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href}>
        <a className={classes}>{children}</a>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;

export { Button };
