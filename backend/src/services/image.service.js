import * as cheerio from "cheerio";


export const analyzeImages = (html) => {

    
    // LOADING HTML USING CHEERIO
  

    // Cheerio allows us to parse the email HTML
    // and work with elements like <img>, <a>, etc.
    const $ = cheerio.load(html);


    
    // GET ALL IMAGES
    

    const images = $("img");



    // ANALYZE EACH IMAGE
   

    const imagesResult = images.map((_, image) => {

        const src = $(image).attr("src") || "";

        const alt = $(image).attr("alt") || "";


        // Check whether the image has alt text
        const hasAltText = alt.trim() !== "";


        return {
            passed: hasAltText,

            src,

            message: hasAltText
                ? "Alt text found"
                : "Alt text is missing"
        };

    }).get();


    
    // OVERALL IMAGE CHECK
    

    // If there are no images, consider the check passed.
    const imagesPassed = images.length === 0
        ? true
        : imagesResult.every((image) => image.passed);


    
    // OVERALL MESSAGE
    

    const imagesMessage = images.length === 0
        ? "No images found"
        : imagesPassed
            ? "All images have alt text"
            : "Some images are missing alt text";


    
    // RETURN RESULT
    

    return {
        passed: imagesPassed,

        message: imagesMessage,

        details: imagesResult
    };
};

