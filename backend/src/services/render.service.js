import puppeteer from "puppeteer";

export const renderEmail = async ({ html }) => {

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: "domcontentloaded",
        timeout: 10000
    });

    return {
        browser,
        page
    };
};