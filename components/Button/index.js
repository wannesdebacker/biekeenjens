import classNames from 'classnames';
import Link from 'next/link';
import styles from './Button.module.scss';

const Button = ({ children, href = null, className, onClick = null }) => {
  const classes = classNames(styles['button'], className);
  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
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
