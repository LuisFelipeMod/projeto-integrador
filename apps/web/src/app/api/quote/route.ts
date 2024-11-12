import puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';
// import {renderToStaticMarkup} from "react-dom/server";
import QuoteTemplate from "../../(app)/services-orders/_components/quote-template";
import React from "react";

export async function POST(request: Request, context: any) {
    try {
        const body = await request.json()
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.content();
        
        const ReactDOMServer = (await import('react-dom/server')).default;
        const html = ReactDOMServer.renderToStaticMarkup(React.createElement(QuoteTemplate, body.serviceOrder))

        await page.setContent(html, { waitUntil: 'networkidle0' });

        await page.emulateMediaType('screen');

        const fileName = body.fileName

        const pdf = await page.pdf({
            path: 'public/' + fileName,
            printBackground: true,
            format: 'A4',
        });

        await browser.close();

        return Response.json({
            statu: 200
        })
    } catch (err) {
        console.log(err)
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json()

        const filePath = path.join(process.cwd(), 'public', body.fileName);

        fs.unlink(filePath, (err) => {
            console.log(err)
        })

        return Response.json({
            status: 200
        })
    } catch (err) {
        console.log(err)
    }
}