import { useState } from "react";


const complianceInfo = [
    {
        name: "CAN-SPAM",
        region: "United States",
        description:
            "A U.S. standard for commercial email that focuses on giving recipients control and providing clear sender information.",
        checks: [
            "Unsubscribe link is present",
            "Physical mailing address is present",
            "Sender email is present",
            "Email links are working",
        ],
    },
    {
        name: "GDPR",
        region: "European Union",
        description:
            "A European data protection standard that focuses on lawful processing of personal data and appropriate consent for communications.",
        checks: [
            "Appropriate consent is obtained",
            "Recipients can withdraw consent",
            "Sender and processing information is clear",
            "Personal data is handled appropriately",
        ],
    },
    {
        name: "CASL",
        region: "Canada",
        description:
            "A Canadian standard for commercial electronic messages that focuses on consent, sender identification, and unsubscribe mechanisms.",
        checks: [
            "Recipient consent is available",
            "Sender information is identifiable",
            "Unsubscribe mechanism is present",
            "Unsubscribe requests can be respected",
        ],
    },
];


const ComplianceInfo = () => {

    const [open, setOpen] = useState(false);


    return (
        <div className="mb-6 w-full">

            {/* Capsule */}

            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-[#e1e4e8] bg-white px-4 py-2.5 text-center text-xs font-medium text-[#60656d] shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition hover:border-[#cdd1d6] hover:bg-[#fafafa] focus:outline-none focus:ring-4 focus:ring-black/[0.04]"
            >

                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef1f5] text-[11px] font-bold text-[#60656d]">
                    ?
                </span>

                <span>
                    Not sure what CAN-SPAM, CASL, or GDPR mean?
                </span>

                <span
                    className={`text-sm transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                >
                    ↓
                </span>

            </button>


            {/* Information Panel */}

            {open && (

                <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-6">

                    <div className="mb-5">

                        <h3 className="text-base font-bold text-[#17181a]">
                            Email compliance standards
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[#737780]">
                            These checks help you understand the basic
                            requirements associated with each selected
                            jurisdiction.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {complianceInfo.map((item) => (

                            <div
                                key={item.name}
                                className="rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4"
                            >

                                {/* Header */}

                                <div className="mb-3 flex items-start justify-between gap-3">

                                    <div>

                                        <h4 className="text-sm font-bold text-[#17181a]">
                                            {item.name}
                                        </h4>

                                        <p className="mt-0.5 text-xs font-medium text-[#8a8f97]">
                                            {item.region}
                                        </p>

                                    </div>

                                </div>


                                {/* Description */}

                                <p className="mb-4 text-xs leading-5 text-[#737780]">
                                    {item.description}
                                </p>


                                {/* Checks */}

                                <div>

                                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[#9a9fa7]">
                                        Checks include
                                    </p>

                                    <ul className="space-y-2">

                                        {item.checks.map((check) => (

                                            <li
                                                key={check}
                                                className="flex items-start gap-2 text-xs leading-5 text-[#60656d]"
                                            >

                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a9fa7]" />

                                                <span>
                                                    {check}
                                                </span>

                                            </li>

                                        ))}

                                    </ul>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>
    );
};


export default ComplianceInfo;