import CheckItem from "./CheckItem";

const ComplianceResults = ({ result }) => {
    if (!result) {
        return null;
    }

    const jurisdictions =
        Array.isArray(result?.jurisdictions)
            ? result.jurisdictions
            : [];

    return (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8">

            {/* Header */}

            <div>
                <h3 className="text-lg font-bold">
                    Compliance
                </h3>

                <p className="mt-1 text-sm text-[#737780]">
                    Legal requirements detected in your email.
                </p>
            </div>


            {/* Compliance Standards */}

            <div className="mt-5 space-y-5">

                {jurisdictions.length > 0 ? (

                    jurisdictions.map((jurisdiction, jurisdictionIndex) => {

                        /*
                         * Backend may return either:
                         *
                         * {
                         *   name: "CAN-SPAM"
                         * }
                         *
                         * or:
                         *
                         * {
                         *   jurisdiction: "CAN-SPAM"
                         * }
                         */

                        const jurisdictionName =
                            jurisdiction?.name ||
                            jurisdiction?.jurisdiction ||
                            `Jurisdiction ${jurisdictionIndex + 1}`;


                        const checks =
                            Array.isArray(jurisdiction?.checks)
                                ? jurisdiction.checks
                                : [];


                        return (
                            <div
                                key={`${jurisdictionName}-${jurisdictionIndex}`}
                                className="rounded-xl border border-[#e5e7eb] p-4"
                            >

                                {/* Jurisdiction name */}

                                <div className="mb-3 flex items-center justify-between">

                                    <h4 className="text-sm font-bold">
                                        {jurisdictionName}
                                    </h4>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            jurisdiction?.passed
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {jurisdiction?.passed
                                            ? "Passed"
                                            : "Needs attention"}
                                    </span>

                                </div>


                                {/* Checks */}

                                <div className="space-y-2">

                                    {checks.length > 0 ? (

                                        checks.map((check, index) => (

                                            <CheckItem
                                                key={`${check?.name || check?.type || "check"}-${index}`}
                                                check={check}
                                            />

                                        ))

                                    ) : (

                                        <div className="rounded-lg bg-[#f7f8fa] p-3 text-sm text-[#737780]">
                                            No compliance checks available.
                                        </div>

                                    )}

                                </div>

                            </div>
                        );

                    })

                ) : (

                    <div className="rounded-xl bg-[#f7f8fa] p-4 text-sm text-[#737780]">
                        No compliance checks available.
                    </div>

                )}

            </div>

        </section>
    );
};

export default ComplianceResults;

