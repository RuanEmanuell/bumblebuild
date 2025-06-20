import puppeteer, { Page, Browser } from "puppeteer";

export class ScraperService {
  async getPartPrice(partLinks: string[]): Promise<string | null> {
    let browser: Browser | undefined;
    let page: Page | undefined;

    try {
      const isAmazon = partLinks.some(link => link.includes('amazon'));

      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: isAmazon ? true : false,
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


            const elements = await page.$$('div, span, p, strong');

            for (const el of elements) {
              const text = await el.evaluate(el => el.textContent?.trim() || '');
              if (text.startsWith('R$')) {
                const numericText = text.replace('R$', '').replace('.', '').replace(',', '.').trim();
                const priceNumber = parseFloat(numericText);
                if (!isNaN(priceNumber) && priceNumber > 10) {
                  priceLink = priceNumber.toString();
                  break;
                }
              }
            }


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
