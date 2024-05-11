import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    url = new URL(url);
    url = url.hostname + url.pathname
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    return url
}

function getURLsFromHTML(html, base_url){
    const anchors = new JSDOM(html).window.document.querySelectorAll('a');

    let urls = [];
    for (let a of anchors) {
        let url = a.href;
        if (url.startsWith('/')) {
            urls.push(`${base_url}${url}`)
            continue
        }

        url = normalizeURL(url);
        if (url.startsWith(base_url)) {
            urls.push(url);
        }
    }

    return urls;
}

function crawl(baseURL, currentURL=baseURL, pages={}){
    console.log(`Crawling ${url}`)
    fetch(url).then(async (response) => {
        if (response.status >= 400) {
            console.error(`Error: ${response.status}`);
            return;
        }

        if (!response.headers.get('content-type').includes('text/html')) {
            console.error('Error: not an HTML page');
            return;
        }

        const html = await response.text();
        const urls = getURLsFromHTML(html, url);
        console.table(urls);
    });
}

export { crawl, getURLsFromHTML, normalizeURL };

