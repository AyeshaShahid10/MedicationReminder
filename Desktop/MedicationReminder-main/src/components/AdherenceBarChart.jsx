// data: [{ label: "M", percent: 80 }, ...]
export default function AdherenceBarChart({ data }) {
  const barWidth = 32;
  const gap = 16;
  const height = 120;
  const width = data.length * (barWidth + gap);

  return (
    <svg viewBox={`0 0 ${width} ${height + 34}`} className="h-auto w-full" role="img" aria-label="Adherence over the last 7 days">
      {data.map((d, i) => {
        const barHeight = Math.max((d.percent / 100) * height, 3);
        const x = i * (barWidth + gap) + gap / 2;
        const y = height - barHeight;
        const color = d.percent >= 80 ? "#16a34a" : d.percent >= 50 ? "#d97706" : d.percent > 0 ? "#dc2626" : "#94a3b8";

        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barHeight} rx={7} fill={color} opacity={0.9} />
            <text
              x={x + barWidth / 2}
              y={y - 6}
              textAnchor="middle"
              className="fill-slate-500 text-[10px] font-medium dark:fill-slate-400"
            >
              {d.percent}%
            </text>
            <text
              x={x + barWidth / 2}
              y={height + 20}
              textAnchor="middle"
              className="fill-slate-500 text-[11px] dark:fill-slate-400"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
