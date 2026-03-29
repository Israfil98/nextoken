interface ISparklineProps {
  data: number[];
  width?: number;
  height?: number;
  positive?: boolean;
}

const Sparkline = ({
  data,
  width = 120,
  height = 36,
  positive = true,
}: ISparklineProps) => {
  if (!data.length) return null;

  // Calculate the SVG path from price data points
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // Avoid division by zero for flat lines

  // Map each price to an x,y coordinate
  // x: spread evenly across the width
  // y: scale price to fit within the height (inverted — SVG y=0 is top)
  const points = data.map((price, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((price - min) / range) * height;
    return `${x},${y}`;
  });

  // Build the SVG polyline points string
  const polylinePoints = points.join(' ');

  const color = positive ? 'var(--color-gain)' : 'var(--color-loss)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
    >
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;
