import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDLnCd1su3fcE5q_z1sFPPasLEATPObC2E" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "i want to make some elements in a next js 14 application i am giving you the details give me the code for that elemet, according to the details i am giving you, i just wnat to the code do not give event an extra discription above or below the code snippet, discription: headline: we sell best carptet, subhead: we have the best carpet in the market, button: buy now, CTA link: /buy-now, image: https://unsplash.com/photos/glacier-sits-atop-an-arid-rocky-landscape-h-huws0YRo8, background color: #f5f5f5, text color: #000000 also give me use client string at the top of the file if it is a client side code always give the code in js and do not install any npm package in it",
  });
  console.log(response.text);
}

await main();