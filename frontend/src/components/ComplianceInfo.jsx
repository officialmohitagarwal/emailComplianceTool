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

            {/* ========================================
                COMPLIANCE INFO CAPSULE
            ======================================== */}

            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                className="
                    mx-auto
                    flex
                    w-fit
                    max-w-full
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#eadf9a]
                    bg-[#fffdf0]
                    px-4
                    py-2.5
                    text-center
                    text-xs
                    font-medium
                    text-[#756a2f]
                    shadow-[0_4px_16px_rgba(0,0,0,0.03)]
                    transition
                    hover:border-[#dfd17c]
                    hover:bg-[#fffbea]
                    focus:outline-none
                    focus:ring-4
                    focus:ring-[#e8d96f]/20
                "
            >

                {/* Question icon */}

                <span
                    className="
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f6edb8]
                        text-[11px]
                        font-bold
                        text-[#756a2f]
                    "
                >
                    ?
                </span>


                {/* Badge text */}

                <span className="truncate sm:truncate-none">
                    Not sure what CAN-SPAM, CASL, or GDPR mean?
                </span>


                {/* Arrow */}

                <span
                    className={`
                        shrink-0
                        text-sm
                        text-[#8a7d35]
                        transition-transform
                        duration-200
                        ${open ? "rotate-180" : ""}
                    `}
                >
                    ↓
                </span>

            </button>


            {/* ========================================
                BACKDROP / INFORMATION PANEL
            ======================================== */}

            {open && (

                <div
                    className="
                        mt-4
                        rounded-2xl
                        border
                        border-[#e8e4ce]
                        bg-[#fffef8]
                        p-4
                        shadow-[0_12px_40px_rgba(0,0,0,0.05)]
                        sm:p-6
                    "
                >

                    {/* Panel heading */}

                    <div className="mb-5">

                        <div className="flex items-start gap-3">

                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#f6edb8]
                                    text-sm
                                    font-bold
                                    text-[#756a2f]
                                "
                            >
                                ?
                            </div>


                            <div>

                                <h3 className="text-base font-bold text-[#17181a]">
                                    Email compliance standards
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-[#737780]">
                                    These checks help you understand the
                                    basic requirements associated with each
                                    selected jurisdiction.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ========================================
                        COMPLIANCE CARDS
                    ======================================== */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                        {complianceInfo.map((item) => (

                            <div
                                key={item.name}
                                className="
                                    rounded-xl
                                    border
                                    border-[#e5e7eb]
                                    bg-white
                                    p-4
                                    transition
                                    hover:border-[#ded9b8]
                                    hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)]
                                "
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

                                    <p
                                        className="
                                            mb-2
                                            text-[11px]
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            text-[#9a9fa7]
                                        "
                                    >
                                        Checks include
                                    </p>


                                    <ul className="space-y-2">

                                        {item.checks.map((check) => (

                                            <li
                                                key={check}
                                                className="
                                                    flex
                                                    items-start
                                                    gap-2
                                                    text-xs
                                                    leading-5
                                                    text-[#60656d]
                                                "
                                            >

                                                <span
                                                    className="
                                                        mt-1.5
                                                        h-1.5
                                                        w-1.5
                                                        shrink-0
                                                        rounded-full
                                                        bg-[#c9bd61]
                                                    "
                                                />

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