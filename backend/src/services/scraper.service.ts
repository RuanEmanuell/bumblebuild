import puppeteer, { Page, Browser } from "puppeteer";

export class ScraperService {
  async getPartInfo(partLinks: string[]): Promise<{ price: string | null; image: string | null }> {
    let browser: Browser | undefined;
    let page: Page | undefined;

    try {
      const isAmazon = partLinks.some(link => link.includes('amazon'));

      browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: isAmazon ? true : false,
      });

      let currentPrice: string | null = null;
      let currentImage: string | null = null;

      async function chooseInfo(links: string[]) {
        let price = currentPrice;
        let image = currentImage;

        if (browser) {
          page = await browser.newPage();
        }

        for (const link of links) {
          if (link !== '' && page) {
            await page.goto(link, { waitUntil: 'domcontentloaded' });

            const rawPrice = await page.evaluate(() => {
              const candidates = Array.from(document.querySelectorAll("span, div, p, strong, h1, h2, h3, h4, h5, h6"));

              const prices = candidates
                .map(el => {
                  const text = el.textContent?.trim() || "";
                  const style = window.getComputedStyle(el);
                  const fontSize = parseFloat(style.fontSize) || 0;
                  const isStrikethrough = style.textDecoration.includes("line-through");
                  const isHidden = el.getAttribute("aria-hidden") === "true";
                  return { text, fontSize, isStrikethrough, isHidden };
                })
                .filter(item =>
                  item.text.startsWith("R$") &&
                  !item.isStrikethrough &&
                  !item.isHidden &&
                  item.fontSize > 10 &&
                  /\d/.test(item.text)
                )
                .sort((a, b) => {
                  const fontDiff = b.fontSize - a.fontSize;
                  if (fontDiff !== 0) return fontDiff;
                  return a.text.length - b.text.length;
                });

              return prices.length > 0 ? prices[0].text : null;
            });

            let priceLink = "0.0";
            if (rawPrice) {
              priceLink = rawPrice
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim();
            }

            const imageLink = await page.$$eval('img', imgs => {
              function isValidImage(url: string) {
                return /\.(jpg|jpeg|png|webp)$/i.test(url);
              }

              const filtered = imgs
                .map(img => {
                  const { width, height } = img.getBoundingClientRect();
                  const src = img.src || '';
                  const aspectRatio = width / height;
                  return { src, width, height, area: width * height, aspectRatio };
                })
                .filter(img =>
                  img.area > 100 * 100 &&
                  img.src.startsWith('http') &&
                  isValidImage(img.src) &&
                  img.aspectRatio > 0.6 &&
                  img.aspectRatio < 1.8
                )
                .sort((a, b) => b.area - a.area);

              return filtered.length > 0 ? filtered[0].src : null;
            });


            if (parseFloat(priceLink) !== parseFloat(price || '0') && parseFloat(priceLink) > 0) {
              price = priceLink;
            }

            if (imageLink && imageLink.length > 0) {
              image = imageLink;
            }
          }
        }

        return { price, image };
      }

      const { price, image } = await chooseInfo(partLinks);

      if (page) await page.close();
      if (browser) await browser.close();

      return { price, image };
    } catch (error) {
      console.error("Erro ao pegar as informações:", error);
      if (browser) await browser.close();
      return { price: null, image: null };
    }
  }
}
