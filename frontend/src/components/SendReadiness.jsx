import ScoreRing from "./ScoreRing";

const SendReadiness = ({ score }) => {
  const safeScore =
    typeof score === "number"
      ? score
      : score?.score ?? 0;

  const color =
    safeScore >= 80
      ? "text-green-600"
      : safeScore >= 50
        ? "text-amber-600"
        : "text-red-600";

  const status =
    safeScore >= 80
      ? "Ready to send"
      : safeScore >= 50
        ? "Needs attention"
        : "Not ready";

  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-8">

      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

        {/* Left side */}
        <div>
          <p className="text-sm font-medium text-[#737780]">
            SEND READINESS
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#17181a]">
            Your email has been analyzed
          </h2>

          <p className={`mt-2 text-sm font-semibold ${color}`}>
            {status}
          </p>
        </div>

        {/* Right side */}
        <ScoreRing score={safeScore} />

      </div>

    </div>
  );
};

export default SendReadiness;