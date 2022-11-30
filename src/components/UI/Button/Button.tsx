import cx from 'classnames';
import classes from './Button.module.css';

type Props = {
  children: JSX.Element | string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: Props) => {
  const { children, onClick, ...rest } = props;

  return (
    <button
      type="button"
      className={cx(classes.button, classes.button_primary)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
