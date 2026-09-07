import CheckItem from "./CheckItem";

const RenderingResults = ({
  result,
  onPreviewClient,
}) => {
  const checks = result?.checks || [];

  const hasOutlookIssue = checks.some(
    (check) =>
      check.status !== "pass" &&
      check.message
        ?.toLowerCase()
        .includes("outlook")
  );

  return (
    <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">

      <div>
        <h3 className="text-lg font-bold">
          Email Rendering
        </h3>

        <p className="mt-1 text-sm text-[#737780]">
          Potential compatibility issues found in your
          HTML.
        </p>
      </div>

      <div className="mt-4">
        {checks.length > 0 ? (
          checks.map((check, index) => (
            <div key={`${check.name}-${index}`}>

              <CheckItem check={check} />

              {check.status !== "pass" &&
                check.message
                  ?.toLowerCase()
                  .includes("outlook") && (
                  <div className="-mt-2 mb-3 ml-10">
                    <button
                      type="button"
                      onClick={() =>
                        onPreviewClient("Outlook")
                      }
                      className="text-xs font-semibold text-[#555a62] underline underline-offset-2 hover:text-[#17181a]"
                    >
                      View in Outlook
                    </button>
                  </div>
                )}

            </div>
          ))
        ) : (
          <div className="rounded-xl bg-[#f7f8fa] px-4 py-5 text-sm text-[#737780]">
            No rendering checks available.
          </div>
        )}
      </div>

      {hasOutlookIssue && (
        <div className="mt-5 rounded-lg bg-[#f7f8fa] p-4">
          <p className="text-xs leading-5 text-[#737780]">
            <strong className="text-[#30343a]">
              Tip:
            </strong>{" "}
            Outlook has limited support for some modern
            CSS. Check the Outlook preview before sending.
          </p>
        </div>
      )}

    </section>
  );
};

export default RenderingResults;