import styles from './Skeleton.module.scss';

interface ISkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton = ({
  width = '100%',
  height = '16px',
  borderRadius = '4px',
  className = '',
}: ISkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

export default Skeleton;
