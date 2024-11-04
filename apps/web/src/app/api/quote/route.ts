import puppeteer from "puppeteer";
import handlebars from "handlebars";

export async function POST() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.content();

        const html = "a";

        const data = {};

        // const template = handlebars.compile(html);
        // const processedHtml = template(data);

        await page.setContent("teste aaaaaaaaaaaaaaaaaaa", { waitUntil: 'networkidle0' });

        await page.emulateMediaType('screen');

        const fileName = 'result.pdf'

        const pdf = await page.pdf({
            path: 'public/' + fileName,
            printBackground: true,
            format: 'A4',
        });

        await browser.close();

        return Response.json({
            path: fileName
        })
    } catch (err) {
        console.log(err)
    }
}
