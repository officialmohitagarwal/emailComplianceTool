import CheckItem from "./CheckItem";
import ScoreRing from "./ScoreRing";

const AnalysisResults = ({ result }) => {
  if (!result) {
    return null;
  }

  const overallScore = result?.score?.score ?? 0;

  const statusText =
    result?.score?.status === "ready"
      ? "Ready to send"
      : overallScore >= 50
        ? "Needs attention"
        : "Not ready";

  const statusColor =
    overallScore >= 80
      ? "text-green-600"
      : overallScore >= 50
        ? "text-amber-600"
        : "text-red-600";

  const complianceScore =
    result?.compliance?.score ??
    (result?.compliance?.passed ? 100 : 0);

  const linksScore =
    result?.links?.score ??
    (
      result?.links?.passed &&
      result?.linkStatus?.passed
        ? 100
        : 0
    );

  const renderingScore =
    result?.rendering?.score ?? 100;

  const complianceChecks =
    result?.compliance?.checks || [];

  const renderingChecks =
    result?.rendering?.checks || [];

  const links = result?.links || {};

  const linkResults = links?.results || [];

  return (
    <section className="mt-8 space-y-5">

      
          {/* OVERALL SCORE */}
      

      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-8">

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

          <div>
            <p className="text-sm font-medium text-[#737780]">
              SEND READINESS
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Your email has been analyzed
            </h2>

            <p
              className={`mt-2 text-sm font-semibold ${statusColor}`}
            >
              {statusText}
            </p>
          </div>

          <ScoreRing score={overallScore} />

        </div>

      </div>


      {/* ========================================
          SECTION SCORES
      ======================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="flex h-[180px] flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#737780]">
              Compliance
            </h3>

            <span className="text-xl leading-none text-[#9aa0a8]">
              →
            </span>

          </div>

          <div className="mt-7">

            <div className="flex items-baseline gap-1">

              <span className="text-3xl font-bold tracking-[-0.03em]">
                {complianceScore}
              </span>

              <span className="text-sm text-[#9aa0a8]">
                / 100
              </span>

            </div>

            <p
              className={`mt-2 text-sm font-semibold ${
                complianceScore >= 90
                  ? "text-green-600"
                  : complianceScore >= 50
                    ? "text-orange-600"
                    : "text-red-600"
              }`}
            >
              {complianceScore >= 90
                ? "Looking good"
                : complianceScore >= 50
                  ? "Needs attention"
                  : "Issues detected"}
            </p>

          </div>

        </div>


        {/* Link Score */}

        <div className="flex h-[180px] flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#737780]">
              Link Health
            </h3>

            <span className="text-xl leading-none text-[#9aa0a8]">
              →
            </span>

          </div>

          <div className="mt-7">

            <div className="flex items-baseline gap-1">

              <span className="text-3xl font-bold tracking-[-0.03em]">
                {linksScore}
              </span>

              <span className="text-sm text-[#9aa0a8]">
                / 100
              </span>

            </div>

            <p
              className={`mt-2 text-sm font-semibold ${
                linksScore >= 90
                  ? "text-green-600"
                  : linksScore >= 50
                    ? "text-orange-600"
                    : "text-red-600"
              }`}
            >
              {linksScore >= 90
                ? "Looking good"
                : linksScore >= 50
                  ? "Needs attention"
                  : "Issues detected"}
            </p>

          </div>

        </div>


        {/* Rendering Score */}

        <div className="flex h-[180px] flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#737780]">
              Rendering
            </h3>

            <span className="text-xl leading-none text-[#9aa0a8]">
              →
            </span>

          </div>

          <div className="mt-7">

            <div className="flex items-baseline gap-1">

              <span className="text-3xl font-bold tracking-[-0.03em]">
                {renderingScore}
              </span>

              <span className="text-sm text-[#9aa0a8]">
                / 100
              </span>

            </div>

            <p
              className={`mt-2 text-sm font-semibold ${
                renderingScore >= 90
                  ? "text-green-600"
                  : renderingScore >= 50
                    ? "text-orange-600"
                    : "text-red-600"
              }`}
            >
              {renderingScore >= 90
                ? "Looking good"
                : renderingScore >= 50
                  ? "Needs attention"
                  : "Issues detected"}
            </p>

          </div>

        </div>

      </div>


     
          {/* COMPLIANCE RESULTS */}
     

      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-8">

        <div className="mb-2">

          <p className="text-xs font-bold uppercase tracking-wider text-[#737780]">
            COMPLIANCE
          </p>

          <h3 className="mt-1 text-lg font-bold">
            Compliance checks
          </h3>

          <p className="mt-1 text-sm text-[#737780]">
            Legal requirements detected in your email.
          </p>

        </div>

        <div className="mt-4">

          {complianceChecks.length > 0 ? (

            complianceChecks.map((check, index) => (

              <CheckItem
                key={`${check.name}-${index}`}
                check={check}
              />

            ))

          ) : (

            <div className="rounded-xl bg-[#f7f8fa] p-4 text-sm text-[#737780]">
              No compliance checks available.
            </div>

          )}

        </div>

      </div>


      
          {/* LINK HEALTH */}
      

      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-8">

        <div>

          <p className="text-xs font-bold uppercase tracking-wider text-[#737780]">
            LINKS
          </p>

          <h3 className="mt-1 text-lg font-bold">
            Link Health
          </h3>

          <p className="mt-1 text-sm text-[#737780]">
            {links.total ?? linkResults.length}{" "}
            {(links.total ?? linkResults.length) === 1
              ? "link"
              : "links"}{" "}
            found
          </p>

        </div>


        {/* Link summary */}

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="rounded-lg bg-[#f7f8fa] p-3">

            <p className="text-xs text-[#737780]">
              Total
            </p>

            <p className="mt-1 text-xl font-bold">
              {links.total ?? linkResults.length}
            </p>

          </div>


          <div className="rounded-lg bg-green-50 p-3">

            <p className="text-xs text-green-700">
              Working
            </p>

            <p className="mt-1 text-xl font-bold text-green-700">
              {links.working ?? 0}
            </p>

          </div>


          <div className="rounded-lg bg-red-50 p-3">

            <p className="text-xs text-red-700">
              Broken
            </p>

            <p className="mt-1 text-xl font-bold text-red-700">
              {links.broken ?? 0}
            </p>

          </div>

        </div>


        {/* Individual links */}

        {linkResults.length > 0 && (

          <div className="mt-5 divide-y divide-[#f0f1f3]">

            {linkResults.map((link, index) => (

              <div
                key={`${link.url}-${index}`}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="min-w-0">

                  <p className="break-all text-sm font-medium text-[#30343a]">
                    {link.url}
                  </p>

                  <p className="mt-1 text-xs text-[#8a8f97]">

                    {link.statusCode
                      ? `HTTP ${link.statusCode}`
                      : "Request failed"}

                    {link.responseTimeMs != null && (
                      <>
                        {" · "}
                        {link.responseTimeMs}ms
                      </>
                    )}

                  </p>

                </div>


                <span
                  className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    link.status === "working"
                      ? "bg-green-100 text-green-700"
                      : link.status === "redirect"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {link.status || "unknown"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      
          {/* RENDERING */}
      

      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-8">

        <div>

          <p className="text-xs font-bold uppercase tracking-wider text-[#737780]">
            RENDERING
          </p>

          <h3 className="mt-1 text-lg font-bold">
            Email Rendering
          </h3>

          <p className="mt-1 text-sm text-[#737780]">
            Potential compatibility issues found in your HTML.
          </p>

        </div>

        <div className="mt-4">

          {renderingChecks.length > 0 ? (

            renderingChecks.map((check, index) => (

              <CheckItem
                key={`${check.name}-${index}`}
                check={check}
              />

            ))

          ) : (

            <div className="rounded-xl bg-[#f7f8fa] p-4 text-sm text-[#737780]">
              Rendering analysis is currently unavailable.
            </div>

          )}

        </div>

      </div>

    </section>
  );
};

export default AnalysisResults;