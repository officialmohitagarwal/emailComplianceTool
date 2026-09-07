export const checkGdpr = ({
    html,
    senderEmail
}) => {

    
    // 1. Unsubscribe
    

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


    
    // 2. Sender Information
    

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


    
    // 3. CHECKS
    

    const checks = [

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


    
    // 4. OVERALL
    

    const passed =
        unsubscribeResult.passed &&
        senderResult.passed;


    return {

        passed,

        checks,

        unsubscribe: unsubscribeResult,

        sender: senderResult

    };
};