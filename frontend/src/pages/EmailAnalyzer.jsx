import { useRef, useState } from "react";

import { analyzeEmail } from "../services/email.api";

import EmailForm from "../components/EmailForm";
import EmailPreview from "../components/EmailPreview";
import SendReadiness from "../components/SendReadiness";
import SectionScoreCard from "../components/SectionScoreCard";
import ComplianceResults from "../components/ComplianceResults";
import LinkResults from "../components/LinkResults";
import ComplianceInfo from "../components/ComplianceInfo";


const initialForm = {
    subject: "",
    fromName: "",
    fromEmail: "",
    content: "",
    jurisdictions: ["CAN-SPAM"],
    consent: false,
};


const EmailAnalyzer = () => {

    const [form, setForm] = useState(initialForm);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [analyzed, setAnalyzed] = useState(false);

    const previewRef = useRef(null);



    // UPDATE FORM


    const updateField = (field, value) => {

        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        /*
         * Any change to the email/form makes the
         * previous analysis stale.
         *
         * The results stay hidden until Analyze
         * Email is clicked again.
         */

        if (
            field === "content" ||
            field === "subject" ||
            field === "fromName" ||
            field === "fromEmail" ||
            field === "jurisdictions" ||
            field === "consent"
        ) {
            setAnalyzed(false);
            setResult(null);
        }
    };


    
    // GET SCORE
    

    const getScore = (value) => {

        if (typeof value === "number") {
            return value;
        }

        if (
            value &&
            typeof value === "object" &&
            typeof value.score === "number"
        ) {
            return value.score;
        }

        return 0;
    };


    
    // CALCULATE COMPLIANCE SCORE
    

    const calculateComplianceScore = (complianceResult) => {

        if (!complianceResult) {
            return 0;
        }


        const jurisdictions =
            Array.isArray(complianceResult?.jurisdictions)
                ? complianceResult.jurisdictions
                : [];


        
        if (jurisdictions.length === 0) {
            return 100;
        }


        let totalChecks = 0;

        let passedChecks = 0;


        jurisdictions.forEach((jurisdiction) => {

            const checks =
                Array.isArray(jurisdiction?.checks)
                    ? jurisdiction.checks
                    : [];


            checks.forEach((check) => {

                totalChecks++;


                if (
                    check?.status === "pass" ||
                    check?.passed === true
                ) {
                    passedChecks++;
                }

            });

        });


        if (totalChecks === 0) {
            return 100;
        }


        return Math.round(
            (passedChecks / totalChecks) * 100
        );
    };


    
    // CALCULATE LINK SCORE
    

    const calculateLinkScore = (linksResult) => {

        if (!linksResult) {
            return 100;
        }


        const statusDetails =
            linksResult?.linkStatus?.details;


        if (Array.isArray(statusDetails)) {

            if (statusDetails.length === 0) {
                return 100;
            }


            const workingLinks =
                statusDetails.filter(
                    (link) =>
                        link?.passed === true ||
                        (
                            typeof link?.status === "number" &&
                            link.status >= 200 &&
                            link.status < 400
                        )
                ).length;


            return Math.round(
                (workingLinks / statusDetails.length) * 100
            );
        }


        const linkDetails =
            linksResult?.links?.details;


        if (Array.isArray(linkDetails)) {

            if (linkDetails.length === 0) {
                return 100;
            }


            const validLinks =
                linkDetails.filter(
                    (link) => link?.passed === true
                ).length;


            return Math.round(
                (validLinks / linkDetails.length) * 100
            );
        }


        return getScore(linksResult?.score);
    };


    
    // ANALYZE EMAIL
    

    const handleAnalyze = async () => {

        setError("");

        setResult(null);

        setAnalyzed(false);


        
        // VALIDATION
        

        if (!form.subject.trim()) {

            setError(
                "Please enter an email subject."
            );

            return;
        }


        if (!form.fromName.trim()) {

            setError(
                "Please enter the sender name."
            );

            return;
        }


        if (!form.fromEmail.trim()) {

            setError(
                "Please enter the sender email."
            );

            return;
        }


        if (!form.content.trim()) {

            setError(
                "Please paste your email HTML/content."
            );

            return;
        }


        if (
            !form.jurisdictions ||
            form.jurisdictions.length === 0
        ) {

            setError(
                "Select at least one compliance jurisdiction."
            );

            return;
        }


        try {

            setLoading(true);


            
            // PAYLOAD
            

            const payload = {

                html: form.content,

                jurisdictions: form.jurisdictions,

                senderEmail: form.fromEmail,

                /*
                 * Send the actual CASL consent checkbox
                 * value instead of hardcoding false.
                 */

                consent: Boolean(form.consent),

            };


            // console.log(
            //     "EMAIL DATA BEING SENT:"
            // );

            // console.log(payload);


            
            // API
            

            const response =
                await analyzeEmail(payload);


            // console.log(
            //     "ANALYSIS RESULT FROM BACKEND:"
            // );

            // console.log(response);


            const backendResult =
                response?.result ?? response;


            
            // COMPLIANCE
            

            const complianceScore =
                calculateComplianceScore(
                    backendResult?.compliance
                );



            // LINKS


            const linksScore =
                calculateLinkScore(
                    backendResult?.links
                );


            
            // OVERALL SCORE
            

            let overallScore =
                getScore(
                    backendResult?.score
                );


            /*
             * If backend doesn't provide an overall
             * score, calculate it using only the two
             * sections currently displayed:
             *
             * Compliance
             * Link Health
             */

            if (
                typeof backendResult?.score !== "number" &&
                !(
                    backendResult?.score &&
                    typeof backendResult.score.score === "number"
                )
            ) {

                overallScore =
                    Math.round(
                        (
                            complianceScore +
                            linksScore
                        ) / 2
                    );

            }



            // COMPLIANCE CHECKS


            const complianceJurisdictions =
                Array.isArray(
                    backendResult?.compliance?.jurisdictions
                )
                    ? backendResult.compliance.jurisdictions
                    : [];


            const complianceChecks =
                Array.isArray(
                    backendResult?.compliance?.checks
                )
                    ? backendResult.compliance.checks
                    : [];



            // LINK RESULT


            const backendLinks =
                backendResult?.links ?? {};


            const linkStatusDetails =
                Array.isArray(
                    backendLinks?.linkStatus?.details
                )
                    ? backendLinks.linkStatus.details
                    : [];


            
            // NORMALIZED RESULT
            

            const normalizedResult = {

                score: overallScore,


            
                // COMPLIANCE
            

                compliance: {

                    ...backendResult?.compliance,

                    /*
                     * Use the actual individual check
                     * statuses rather than the backend's
                     * top-level binary score.
                     */

                    score: complianceScore,

                    jurisdictions:
                        complianceJurisdictions,

                    checks:
                        complianceChecks,

                },


                
                // LINKS
                

                links: {

                    ...backendLinks,

                    score: linksScore,

                    linkStatus: {

                        ...backendLinks?.linkStatus,

                        details:
                            linkStatusDetails,

                    },

                },

            };


            // console.log(
            //     "NORMALIZED RESULT FOR FRONTEND:"
            // );

            // console.log(normalizedResult);


            
            // SET RESULT
            

            setResult(normalizedResult);

            setAnalyzed(true);


            
            // SCROLL TO RESULTS
            

            requestAnimationFrame(() => {

                previewRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

            });

        } catch (err) {

            console.error(err);


            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while analyzing the email."
            );

        } finally {

            setLoading(false);

        }

    };



    // COMPLIANCE MESSAGE


    const getComplianceMessage = (score) => {

        if (score >= 90) {
            return "No major compliance issues.";
        }

        if (score >= 50) {
            return "Some compliance checks need attention.";
        }

        if (score > 0) {
            return "Several compliance checks need attention.";
        }

        return "Compliance issues need to be fixed.";
    };


    
    // LINK MESSAGE
    

    const getLinkMessage = (score) => {

        if (score >= 90) {
            return "All links look healthy.";
        }

        if (score >= 50) {
            return "Some links need attention.";
        }

        if (score > 0) {
            return "Several links need attention.";
        }

        return "No working links were found.";
    };



    // UI


    return (

        <main className="min-h-screen bg-[#f7f8fa] px-4 py-16 text-[#17181a]">

            <div className="mx-auto w-full max-w-4xl">


                
                    {/* HERO */}
                

                <div className="mb-6 text-center">

                    <div className="mb-4 inline-flex rounded-full bg-[#eef1f5] px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#60656d]">
                        EMAIL COMPLIANCE TOOL
                    </div>


                    <h1 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">

                        Email Health{" "}

                        <span className="text-[#6b6f76]">
                            Checker
                        </span>

                    </h1>


                    <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6b7078] sm:text-lg">

                        Check your email for compliance, broken
                        links, and rendering issues before you send
                        it.

                    </p>

                </div>


                
                    {/* COMPLIANCE INFO */}
                

                <ComplianceInfo />


                
                    {/* FORM */}
                

                <EmailForm
                    form={form}
                    loading={loading}
                    error={error}
                    onChange={updateField}
                    onSubmit={handleAnalyze}
                />


                
                    {/* RESULTS ONLY AFTER ANALYZE */}
                

                {analyzed && result && (

                    <div
                        ref={previewRef}
                        className="mt-8 space-y-5 scroll-mt-6"
                    >


                        
                            {/* EMAIL PREVIEW */}
                        

                        <EmailPreview
                            content={form.content}
                            fromName={form.fromName}
                            fromEmail={form.fromEmail}
                            subject={form.subject}
                        />


                        
                            {/* SEND READINESS */}
                        

                        <SendReadiness
                            score={result.score}
                        />



                            {/* SECTION SCORES */}
                        

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <SectionScoreCard
                                title="Compliance"
                                score={
                                    result.compliance.score
                                }
                                message={
                                    getComplianceMessage(
                                        result.compliance.score
                                    )
                                }
                            />


                            <SectionScoreCard
                                title="Link Health"
                                score={
                                    result.links.score
                                }
                                message={
                                    getLinkMessage(
                                        result.links.score
                                    )
                                }
                            />

                        </div>


                      
                            {/* COMPLIANCE RESULTS */}
                    

                        <ComplianceResults
                            result={
                                result.compliance
                            }
                        />


                        
                            {/* LINK RESULTS */}
                        

                        <LinkResults
                            result={
                                result.links
                            }
                        />

                    </div>

                )}

            </div>

        </main>

    );

};


export default EmailAnalyzer;
