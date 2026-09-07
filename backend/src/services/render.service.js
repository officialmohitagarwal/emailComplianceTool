import puppeteer from "puppeteer";

export const renderEmail = async ({ html }) => {

    const executablePath = await puppeteer.executablePath();

    const browser = await puppeteer.launch({

        headless: true,

        executablePath,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ]

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