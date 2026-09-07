const LinkResults = ({ result }) => {

  const links =
    result?.links?.details || [];

  const linkStatuses =
    result?.linkStatus?.details || [];


  const total =
    links.length;


  const working =
    linkStatuses.filter(
      (link) => link.passed === true
    ).length;


  const broken =
    linkStatuses.filter(
      (link) => link.passed === false
    ).length;


  return (

    <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">


      {/* Header */}

      <div>

        <h3 className="text-lg font-bold">
          Link Health
        </h3>

        <p className="mt-1 text-sm text-[#737780]">

          {total}{" "}

          {total === 1
            ? "link"
            : "links"}{" "}

          found

        </p>

      </div>


      {/* Summary */}

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">


        {/* Total */}

        <div className="rounded-lg bg-[#f7f8fa] p-3">

          <p className="text-xs text-[#737780]">
            Total
          </p>

          <p className="mt-1 text-xl font-bold">
            {total}
          </p>

        </div>


        {/* Working */}

        <div className="rounded-lg bg-green-50 p-3">

          <p className="text-xs text-green-700">
            Working
          </p>

          <p className="mt-1 text-xl font-bold text-green-700">
            {working}
          </p>

        </div>


        {/* Broken */}

        <div className="rounded-lg bg-red-50 p-3">

          <p className="text-xs text-red-700">
            Broken
          </p>

          <p className="mt-1 text-xl font-bold text-red-700">
            {broken}
          </p>

        </div>

      </div>


      {/* Link list */}

      {total > 0 && (

        <div className="mt-5 divide-y divide-[#f0f1f3]">

          {linkStatuses.map(
            (link, index) => {

              const originalLink =
                links[index];


              const url =
                link.url ||
                originalLink?.url ||
                "";


              return (

                <div
                  key={`${url}-${index}`}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >


                  {/* URL */}

                  <div className="min-w-0">

                    <p className="break-all text-sm font-medium text-[#30343a]">
                      {url || "Missing URL"}
                    </p>


                    <p className="mt-1 text-xs text-[#8a8f97]">

                      {link.status
                        ? `HTTP ${link.status}`
                        : link.message}

                    </p>

                  </div>


                  {/* Status */}

                  <span
                    className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      link.passed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {link.passed
                      ? "working"
                      : "broken"}

                  </span>

                </div>

              );

            }
          )}

        </div>

      )}


      {/* No links */}

      {total === 0 && (

        <div className="mt-5 rounded-xl bg-[#f7f8fa] px-4 py-5 text-sm text-[#737780]">
          No links found in this email.
        </div>

      )}

    </section>
  );
};


export default LinkResults;