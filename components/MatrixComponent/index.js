import styles from './MatrixComponent.module.scss';

const MatrixComponent = ({ children }) => {
  return <div className={styles['matrix-component']}>{children}</div>;
};

export default MatrixComponent;

export { MatrixComponent };
