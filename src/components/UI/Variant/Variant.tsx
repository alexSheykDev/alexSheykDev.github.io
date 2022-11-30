import cx from 'classnames';
import classes from './Variant.module.css';

type VariantProps = {
  variantLabel: string;
  variantText: string;
  status: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Variant = (props: VariantProps) => {
  const { variantLabel, variantText, status, onClick } = props;

  return (
    <button
      className={cx(
        classes.variant,
        status === 'wrong' ? classes.variant_wrong : '',
        status === 'correct' ? classes.variant_correct : '',
        status === 'selected' ? classes.variant_selected : ''
      )}
      onClick={onClick}
    >
      <svg
        className={classes.variant_icon}
        viewBox="0 0 390 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={classes.variant_path}
          d="M23.8825 5.08639C26.055 2.19863 29.4585 0.5 33.0722 0.5H356.928C360.542 0.5 363.945 2.19863 366.118 5.08639L389.374 36L366.118 66.9136C363.945 69.8014 360.541 71.5 356.928 71.5H33.0722C29.4585 71.5 26.055 69.8014 23.8825 66.9136L0.625694 36L23.8825 5.08639Z"
          fill="white"
          stroke="#D0D0D8"
        />
        <text
          x="32px"
          y="50%"
          className={classes.variant_label}
          alignmentBaseline="middle"
          fill="#FF8B37"
        >
          {variantLabel}
        </text>
        <text
          x="50px"
          y="50%"
          className={classes.variant_text}
          fill="#1C1C21"
          textAnchor="start"
          alignmentBaseline="middle"
        >
          {variantText}
        </text>
      </svg>
      <div className={classes.variant_line}></div>
    </button>
  );
};

export default Variant;
