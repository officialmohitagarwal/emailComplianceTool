import * as cheerio from "cheerio";



// CHECK LINK STATUS


async function checkLinkStatus(url) {

    try {

       
        // IGNORE NON-WEB LINKS
       

        if (
            url.startsWith("mailto:") ||
            url.startsWith("tel:") ||
            url.startsWith("#") ||
            url.startsWith("javascript:")
        ) {
            return {
                passed: true,
                url,
                status: null,
                message: "Non-web link"
            };
        }


        
        // ONLY CHECK HTTP / HTTPS
        

        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://")
        ) {
            return {
                passed: false,
                url,
                status: null,
                message: "Invalid URL"
            };
        }


        
        // TRY HEAD REQUEST
        

        let response;

        try {

            response = await fetch(url, {
                method: "HEAD",
                redirect: "follow"
            });

        } catch (error) {

            response = null;

        }


      
        // FALLBACK TO GET
      

        // Some servers do not support HEAD requests.
        // In that case, try a normal GET request.

        if (!response || response.status >= 400) {

            try {

                response = await fetch(url, {
                    method: "GET",
                    redirect: "follow"
                });

            } catch (error) {

                return {
                    passed: false,
                    url,
                    status: null,
                    message: "Link could not be reached"
                };

            }

        }


        
        // DETERMINE LINK HEALTH
        

        const isWorking =
            response.status >= 200 &&
            response.status < 400;


        return {

            passed: isWorking,

            url,

            status: response.status,

            message: isWorking
                ? "Link is working"
                : "Link is broken"

        };

    } catch (error) {

        return {

            passed: false,

            url,

            status: null,

            message: "Link could not be reached"

        };

    }

}



// ANALYZE LINKS


export const analyzeLinks = async (html) => {

    
    // LOAD HTML
    

    const $ = cheerio.load(html);


   
    // FIND ALL LINKS
   

    const linkUrls = [];

    $("a").each((_, link) => {

        const href = $(link)
            .attr("href")
            ?.trim() || "";

        linkUrls.push(href);

    });


    
    // CHECK URL EXISTENCE
    

    const linksResult = linkUrls.map((url) => {

        const hasUrl = url !== "";

        return {

            passed: hasUrl,

            url,

            message: hasUrl
                ? "Link URL found"
                : "Link URL is missing"

        };

    });


    
    // OVERALL URL CHECK
    

    const linksPassed =
        linkUrls.length === 0
            ? true
            : linksResult.every(
                (link) => link.passed
            );


    const linksMessage =
        linkUrls.length === 0
            ? "No links found"
            : linksPassed
                ? "All links have URLs"
                : "Some links are missing URLs";


    
    // CHECK LINK HEALTH
    

    const linkStatusResult = [];

    for (const url of linkUrls) {

        // Missing URL
        if (!url) {

            linkStatusResult.push({

                passed: false,

                url,

                status: null,

                message: "Link URL is missing"

            });

            continue;

        }


        const result =
            await checkLinkStatus(url);

        linkStatusResult.push(result);

    }


    
    // OVERALL LINK STATUS
    

    const linkStatusPassed =
        linkStatusResult.length === 0
            ? true
            : linkStatusResult.every(
                (link) => link.passed
            );


    const linkStatusMessage =
        linkStatusResult.length === 0
            ? "No links found"
            : linkStatusPassed
                ? "All links are working"
                : "Some links are broken or could not be reached";


    
    // RETURN
    

    return {

        links: {

            passed: linksPassed,

            message: linksMessage,

            details: linksResult

        },

        linkStatus: {

            passed: linkStatusPassed,

            message: linkStatusMessage,

            details: linkStatusResult

        }

    };

};