/* eslint-disable no-console, no-use-before-define, import/default */
import fs from "fs";
import path from "path";
import Express from "express";

import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from "../webpack.config.server";

import React from "react";
import {renderToString} from "react-dom/server";

import routes from "./routes";

const globalStyle = fs.readFileSync(
    path.resolve(__dirname, "../apps/global.css"),
    "utf8"
);

const app = new Express();
const port = 8080;

app.use(
    webpackDevMiddleware(webpack(webpackConfig), {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);
app.use(handleRoutes);

function handleRoutes(req, res) {
    const routeName = req.url.substr(1).split("/")[0];

    if (routeName === "") {
        res.send(renderIndex());
        return;
    }

    if (!routes[routeName]) {
        res.send(render404());
        return;
    }

    const App = routes[routeName].app;
    const title = routes[routeName].title;
    const html = renderToString(
        <App radiumConfig={{userAgent: req.headers["user-agent"]}} />
    );

    res.send(renderPage(routeName, html, title));
}

function renderIndex() {
    return `
        <!doctype html>
        <html>
            <head>
                <title>React GPT Examples</title>
                <style>${globalStyle}</style>
            </head>
            <body>
                <h1>React GPT Examples</h1>
                <ul>
                <li><a href="responsive/index.html">Responsive</a></li>
                <li><a href="single-request/index.html">Single Request</a></li>
                <li><a href="lazy-render/index.html">Lazy Render</a></li>
                <li><a href="infinite-scrolling/index.html">Infinite Scrolling</a></li>
                <li><a href="static-ad/index.html">Static Ad</a></li>
                <li><a href="interstitial/index.html">Interstitial</a></li>
                </ul>
            </body>
        </html>
    `;
}

function render404() {
    return `
        <!doctype html>
        <html>
            <head>
                <title>Page Not Found</title>
                <style>${globalStyle}</style>
            </head>
            <body>
                <h1>Page Not Found</h1>
                <a href="/">React GPT Examples</a>
            </body>
        </html>
    `;
}

function renderPage(name, html, title) {
    return `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <style>${globalStyle}</style>
        </head>
        <body>
            <h1 class="breadcrumbs"><a href="/">React GPT Examples</a> / ${title}</h1>
            <div id="example">${html}</div>
            <script src="/__build__/shared.js"></script>
            <script src="/__build__/${name}.js"></script>
        </body>
    </html>
    `;
}

app.listen(port, error => {
    if (error) {
        console.error(error);
    } else {
        console.info(
            `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
        );
    }
});
