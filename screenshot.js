const { chromium } = require('playwright');
require('dotenv').config();

(async () => {
    const browser = await chromium.launch({ headless: true, slowMo: 100 });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // ===== LOGIN ONCE =====
        console.log("Logging in...");
        await page.goto('https://unusualflow.com/login', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });

        await page.fill('input[name="email"]', process.env.LOGIN_USER);
        await page.fill('input[name="password"]', process.env.LOGIN_PASS);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 });
        console.log("✅ Logged in successfully!");

        // ============ PAGE 1: Heatmap ============
        console.log("Opening Heatmap...");
        await page.goto('https://unusualflow.com/heatmap', { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForSelector('#canvas-wrapper', { timeout: 60000, state: 'visible' });
        let removeElement = await page.$('.intercom-lightweight-app');
        if (removeElement) await removeElement.evaluate((el) => el.remove());
        let section = await page.$('#canvas-wrapper');
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await section.screenshot({ path: `screenshot-heatmap-${Date.now()}.png` });
        console.log("✅ Heatmap screenshot saved!");

        // ============ PAGE 2: Hottest Contracts ============

        console.log("Opening Hottest Contracts...");
        await page.goto('https://unusualflow.com/hottest-contracts', { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForSelector('.ag-center-cols-container .ag-row', {
            timeout: 60000,
            state: 'visible'
        });

        removeElement = await page.$('.intercom-lightweight-app');
        if (removeElement) await removeElement.evaluate((el) => el.remove());
        section = await page.$('.app-card');
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await section.screenshot({ path: `screenshot-hottest-contracts-${Date.now()}.png` });
        console.log("✅ Hottest Contracts screenshot saved!");

        // ============ PAGE 3: Unusualflow Picks ============
        console.log("Opening Unusualflow Picks...");
        await page.goto('https://unusualflow.com/unusual-flow-picks', { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForSelector('.ag-center-cols-container .ag-row', {
            timeout: 60000,
            state: 'visible'
        });

        removeElement = await page.$('.intercom-lightweight-app');
        if (removeElement) await removeElement.evaluate((el) => el.remove());
        section = await page.$('.app-card');
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await section.screenshot({ path: `screenshot-unusualflow-picks-${Date.now()}.png` });
        console.log("✅ Unusualflow Picks screenshot saved!");

        // ============ PAGE 4: Top Performers ============
        console.log("Opening Top Performers...");
        await page.goto('https://unusualflow.com/top-gainer-loser', { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForSelector('.ag-center-cols-container .ag-row', {
            timeout: 60000,
            state: 'visible'
        });

        removeElement = await page.$('.intercom-lightweight-app');
        if (removeElement) await removeElement.evaluate((el) => el.remove());
        section = await page.$('.app-card');
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await section.screenshot({ path: `screenshot-top-performers-${Date.now()}.png` });
        console.log("✅ Top Performers screenshot saved!");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await browser.close();
    }
})();
