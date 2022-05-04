import styles from './MatrixComponent.module.scss';
import classNames from 'classnames';

const MatrixComponent = ({ children, even = false, header = false }) => {
  return (
    <div
      className={classNames(
        styles['matrix-component'],
        even && styles['matrix-component--even'],
        header && styles['matrix-component--header'],
      )}
    >
      {children}
    </div>
  );
};

export default MatrixComponent;

export { MatrixComponent };
