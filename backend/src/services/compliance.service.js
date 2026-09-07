import { checkCanSpam } from "./canspan.service.js";
import { checkCasl } from "./casl.service.js";
import { checkGdpr } from "./gdpr.service.js";

import { renderEmail } from "./render.service.js";

import { analyzeLinks } from "./link.service.js";
import { analyzeImages } from "./image.service.js";

import { calculateScore } from "./score.service.js";



// ANALYZE EMAIL


export const analyzeEmailService = async ({
    html,
    jurisdictions,
    senderEmail,
    consent
}) => {

   
    // 1. RENDER EMAIL
   

    const { browser, page } = await renderEmail({
        html
    });


    
    // 2. GET VISIBLE TEXT
    

    const pageText = await page.evaluate(() => {
        return document.body.innerText;
    });


    
    // 3. ANALYZE IMAGES
    

    const imagesResult = analyzeImages(html);


    
    // 4. ANALYZE LINKS
    

    const linksResult = await analyzeLinks(html);


   
    // 5. CLOSE BROWSER
   

    await browser.close();


    
    // 6. COMPLIANCE CHECKS
    

    const complianceResults = [];


   
    // CAN-SPAM
   

    if (jurisdictions.includes("CAN-SPAM")) {

        const result = checkCanSpam({

            html,

            linkUrls: linksResult.links.details.map(
                (link) => link.url
            ),

            pageText,

            senderEmail

        });

        complianceResults.push({
            jurisdiction: "CAN-SPAM",
            ...result
        });
    }


    
    // GDPR
    

    if (jurisdictions.includes("GDPR")) {

        const result = checkGdpr({
            html,
            senderEmail
        });

        complianceResults.push({
            jurisdiction: "GDPR",
            ...result
        });
    }


    
    // CASL
    

    if (jurisdictions.includes("CASL")) {

        const result = checkCasl({
            html,
            consent,
            senderEmail
        });

        complianceResults.push({
            jurisdiction: "CASL",
            ...result
        });
    }



    // OVERALL COMPLIANCE


    const compliancePassed =
        complianceResults.length > 0 &&
        complianceResults.every(
            (result) => result.passed
        );


    const complianceScore =
        complianceResults.length === 0
            ? 0
            : Math.round(
                complianceResults.filter(
                    (result) => result.passed
                ).length /
                complianceResults.length *
                100
            );


    
    // 7. LINK SCORE
    

    const linksScore =
        linksResult.links.passed &&
        linksResult.linkStatus.passed
            ? 100
            : 0;


    
    // 8. IMAGE SCORE
    

    const imagesScore =
        imagesResult.passed
            ? 100
            : 0;



    // 9. OVERALL SCORE


    const score = calculateScore({

        compliance: complianceScore,

        links: linksScore,

        images: imagesScore

    });


    
    // 10. FINAL RESPONSE
    

    return {

      
        // OVERALL SCORE
      

        score,



        // COMPLIANCE


        compliance: {

            passed: compliancePassed,

            score: complianceScore,

            jurisdictions: complianceResults,

            // Keeping checks convenient for frontend
            checks: complianceResults.flatMap(
                (result) =>
                    result.checks.map((check) => ({
                        ...check,
                        jurisdiction:
                            result.jurisdiction
                    }))
            )

        },



        // IMAGE ANALYSIS


        images: {

            ...imagesResult,

            score: imagesScore

        },


        
        // LINK ANALYSIS
        

        links: {

            ...linksResult,

            score: linksScore

        }

    };
};
