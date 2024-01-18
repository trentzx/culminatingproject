const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

// Initialize Firebase Admin SDK
// Note: This assumes you have already set up your Firebase project with the necessary credentials.
admin.initializeApp();

exports.scheduledFunction = functions.pubsub.schedule('every 12 hours').onRun(async (context) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessary for running on Cloud Functions
    });
    const page = await browser.newPage();

    // Scrape NBC
    await page.goto('https://www.nbcnews.com');
    const nbcScreenshotBuffer = await page.screenshot();
    // Save to Storage Bucket
    await saveScreenshot('nbc_screenshot.png', nbcScreenshotBuffer);

    // Scrape CNN
    await page.goto('https://www.cnn.com');
    const cnnScreenshotBuffer = await page.screenshot();
    // Save to Storage Bucket
    await saveScreenshot('cnn_screenshot.png', cnnScreenshotBuffer);

    await browser.close();
});

async function saveScreenshot(filename, buffer) {
    const bucket = admin.storage().bucket(); // Specify your bucket name here if it's not the default bucket
    const file = bucket.file(filename);
    await file.save(buffer, {
        metadata: { contentType: 'image/png' },
    });
}
