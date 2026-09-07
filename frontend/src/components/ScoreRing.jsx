const ScoreRing = ({ score, size = "large" }) => {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  const radius = size === "large" ? 48 : 34;
  const stroke = size === "large" ? 8 : 6;

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (safeScore / 100) * circumference;

  const color =
    safeScore >= 80
      ? "text-green-600"
      : safeScore >= 50
        ? "text-amber-600"
        : "text-red-600";

  const dimensions =
    size === "large"
      ? "h-32 w-32"
      : "h-20 w-20";

  return (
    <div
      className={`relative shrink-0 ${dimensions} ${color}`}
    >
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 120 120"
      >

        {/* Background ring */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="opacity-10"
        />

        {/* Progress ring */}
        {safeScore > 0 && (
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        )}

      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span
          className={`font-bold tracking-tight ${
            size === "large"
              ? "text-3xl"
              : "text-xl"
          }`}
        >
          {safeScore}
        </span>

        <span
          className={`text-[#9a9fa7] ${
            size === "large"
              ? "text-[11px]"
              : "text-[9px]"
          }`}
        >
          / 100
        </span>

      </div>
    </div>
  );
};

export default ScoreRing;