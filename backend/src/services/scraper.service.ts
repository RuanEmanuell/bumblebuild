import puppeteer, { Page, Browser } from "puppeteer";

export class ScraperService {
    async getPartPrice(partLinks: string[]): Promise<string | null> {
    let browser: Browser | undefined; 
    let page: Page | undefined; 

    try {
      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true, 
      });

      let currentPrice: string | null = null;

      async function choosePrice(links: string[]) {
        let price = currentPrice;

        if (browser) {
          page = await browser.newPage();
        }

        for (const link of links) {
          if (link !== '' && page) {
            await page.goto(link, { waitUntil: 'domcontentloaded' });

            let priceLink = '0.0';

            if (link.includes('pichau')) {
              const possibleDivs = ['.jss258', '.jss266', '.jss267', '.jss272'];
              for (let i = 0; i < possibleDivs.length; i++) {
                if (await page.$(possibleDivs[i])) {
                  priceLink = await page.$eval(possibleDivs[i], (div) => (div as HTMLElement).innerText.substring(3));
                  if (priceLink.length < 15) {
                    break;
                  }
                }
              }
            } else if (link.includes('kabum')) {
              if (await page.$('.sc-5492faee-2.ipHrwP.finalPrice')) {
                priceLink = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', (h4) => (h4 as HTMLElement).innerText.substring(3));
              }
            } else if (link.includes('terabyte')) {
              if (await page.$('#valVista')) {
                priceLink = await page.$eval('#valVista', (p) => (p as HTMLElement).innerText.substring(3));
              }
            } else if (link.includes('amazon')) {
              if (await page.$('.a-offscreen')) {
                priceLink = await page.$eval('.a-offscreen', (span) => (span as HTMLElement).innerText.substring(2));
              }
            }

            priceLink = priceLink.replace('.', '');

            if (parseFloat(priceLink) !== parseFloat(price || '0') && parseFloat(priceLink) > 0) {
              price = priceLink;
            }
          }
        }

        return price;
      }

      currentPrice = await choosePrice(partLinks);

      if (page) await page.close();
      if (browser) await browser.close();

      return currentPrice;
    } catch (error) {
      console.error("Erro ao pegar o preço:", error);
      if (browser) await browser.close();
      return null;
    }
  }
}
