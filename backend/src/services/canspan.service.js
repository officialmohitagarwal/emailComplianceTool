export const checkCanSpam = ({
    html,
    linkUrls,
    pageText,
    senderEmail
}) => {

    
    // 1. Unsubscribe
    

    
    const unsubscribePatterns = [
        "unsubscribe",
        "opt out",
        "opt-out",
        "remove me",
        "stop receiving",
        "stop emails",
        "email preferences",
        "manage preferences",
        "manage subscriptions",
        "subscription preferences"
    ];


    let hasUnsubscribe = false;


    if (Array.isArray(linkUrls)) {

        hasUnsubscribe = linkUrls.some((link) => {

            const url =
                typeof link === "string"
                    ? link
                    : link?.url || "";

            const text =
                typeof link === "object"
                    ? link?.text ||
                      link?.label ||
                      link?.anchorText ||
                      ""
                    : "";


            const combinedText =
                `${url} ${text}`.toLowerCase();


            return unsubscribePatterns.some(
                (pattern) =>
                    combinedText.includes(pattern)
            );

        });

    }


    if (!hasUnsubscribe && typeof html === "string") {

        const anchorMatches =
            html.match(
                /<a\b[^>]*href\s*=\s*["'][^"']+["'][^>]*>[\s\S]*?<\/a>/gi
            ) || [];


        hasUnsubscribe =
            anchorMatches.some((anchor) => {

                const normalized =
                    anchor
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .toLowerCase();


                return unsubscribePatterns.some(
                    (pattern) =>
                        normalized.includes(pattern)
                );

            });

    }


   
    if (!hasUnsubscribe && typeof pageText === "string") {

        const normalizedPageText =
            pageText
                .replace(/\s+/g, " ")
                .toLowerCase();


        hasUnsubscribe =
            unsubscribePatterns.some(
                (pattern) =>
                    normalizedPageText.includes(pattern)
            );

    }


    const unsubscribeResult = {

        name: "Unsubscribe",

        passed: hasUnsubscribe,

        message: hasUnsubscribe
            ? "Unsubscribe link found"
            : "Unsubscribe link is missing"

    };


    
    // 2. Physical Address
    
    const hasAddress =
        /\d+ .+/.test(pageText);


    const addressResult = {

        name: "Physical Address",

        passed: hasAddress,

        message: hasAddress
            ? "Physical address found"
            : "Physical address is missing"

    };


    
    // 3. Sender Email
    

    const hasSenderEmail =
        typeof senderEmail === "string" &&
        senderEmail.trim() !== "";


    const senderResult = {

        name: "Sender Email",

        passed: hasSenderEmail,

        message: hasSenderEmail
            ? `Sender email found: ${senderEmail}`
            : "Sender email is missing"

    };


    
    // 4. ALL CHECKS
    

    const checks = [

        {

            name: unsubscribeResult.name,

            status: unsubscribeResult.passed
                ? "pass"
                : "fail",

            message: unsubscribeResult.message

        },

        {

            name: addressResult.name,

            status: addressResult.passed
                ? "pass"
                : "fail",

            message: addressResult.message

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
        unsubscribeResult.passed &&
        addressResult.passed &&
        senderResult.passed;


    return {

        passed,

        checks,

        unsubscribe: unsubscribeResult,

        address: addressResult,

        sender: senderResult

    };

};