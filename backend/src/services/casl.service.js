export const checkCasl = ({
    html,
    consent,
    senderEmail
}) => {

    
    // 1. CONSENT
    

    const consentResult = {

        name: "Consent",

        passed: consent === true,

        message: consent === true
            ? "Consent provided"
            : "Consent is missing"

    };


    
    // 2. UNSUBSCRIBE
    

    const hasUnsubscribe =
        html
            .toLowerCase()
            .includes("unsubscribe");


    const unsubscribeResult = {

        name: "Unsubscribe",

        passed: hasUnsubscribe,

        message: hasUnsubscribe
            ? "Unsubscribe option found"
            : "Unsubscribe option is missing"

    };


    
    // 3. SENDER
    

    const hasSenderEmail =
        typeof senderEmail === "string" &&
        senderEmail.trim() !== "";


    const senderResult = {

        name: "Sender Information",

        passed: hasSenderEmail,

        message: hasSenderEmail
            ? `Sender email found: ${senderEmail}`
            : "Sender information is missing"

    };


    
    // 4. CHECKS
    

    const checks = [

        {
            name: consentResult.name,
            status: consentResult.passed
                ? "pass"
                : "fail",
            message: consentResult.message
        },

        {
            name: unsubscribeResult.name,
            status: unsubscribeResult.passed
                ? "pass"
                : "fail",
            message: unsubscribeResult.message
        },

        {
            name: senderResult.name,
            status: senderResult.passed
                ? "pass"
                : "fail",
            message: senderResult.message
        }

    ];


    
    // 5. OVERALL
    

    const passed =
        consentResult.passed &&
        unsubscribeResult.passed &&
        senderResult.passed;


    return {

        passed,

        checks,

        consent: consentResult,

        unsubscribe: unsubscribeResult,

        sender: senderResult

    };
};
