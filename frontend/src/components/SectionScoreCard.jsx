const SectionScoreCard = ({
  title,
  score,
  message,
}) => {
  const getStatus = () => {
    if (score >= 90) {
      return {
        label: "Looking good",
        className: "text-green-600",
      };
    }

    if (score >= 50) {
      return {
        label: "Needs attention",
        className: "text-orange-600",
      };
    }

    return {
      label: "Issues detected",
      className: "text-red-600",
    };
  };

  const status = getStatus();

  return (
    <div className="flex h-[230px] flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#737780]">
          {title}
        </h3>

        <span className="text-xl leading-none text-[#9aa0a8]">
          →
        </span>
      </div>

      {/* Score section */}
      <div className="mt-7">

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-[-0.03em] text-[#17181a]">
            {score}
          </span>

          <span className="text-sm text-[#9aa0a8]">
            / 100
          </span>
        </div>

        <p
          className={`mt-2 text-sm font-semibold ${status.className}`}
        >
          {status.label}
        </p>

      </div>

      {/* Bottom area */}
      <div className="mt-auto">

        {/* Divider */}
        <div className="border-t border-[#e5e7eb]" />

        {/* Message */}
        <p className="pt-4 text-sm leading-5 text-[#8a8f97]">
          {message}
        </p>

      </div>

    </div>
  );
};

export default SectionScoreCard;