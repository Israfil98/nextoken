interface ILogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 32, className }: ILogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" fill="currentColor" />
      <circle
        cx="16"
        cy="16"
        r="11"
        fill="none"
        stroke="var(--bg-secondary)"
        strokeWidth="1.5"
      />
      <circle
        cx="16"
        cy="16"
        r="9"
        fill="none"
        stroke="var(--bg-secondary)"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fill="var(--bg-secondary)"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="12"
      >
        N
      </text>
      <line
        x1="14.5"
        y1="3"
        x2="14.5"
        y2="6"
        stroke="var(--bg-secondary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="17.5"
        y1="3"
        x2="17.5"
        y2="6"
        stroke="var(--bg-secondary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="14.5"
        y1="26"
        x2="14.5"
        y2="29"
        stroke="var(--bg-secondary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="17.5"
        y1="26"
        x2="17.5"
        y2="29"
        stroke="var(--bg-secondary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
