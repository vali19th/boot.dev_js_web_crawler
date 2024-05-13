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

async function crawl(base_url, url=base_url, pages={}){
    if (!url.includes(base_url)) {
        return pages;
    }

    const normalized = normalizeURL(url);
    if (pages[normalized]) {
        pages[normalized] += 1;
        return pages;
    }

    pages[normalized] = 1;

    const res = await fetch(url)
    if (res.status >= 400) {
        return;
    }

    if (!res.headers.get('content-type').includes('text/html')) {
        return;
    }

    const html = await res.text();
    for (let u of getURLsFromHTML(html, base_url)) {
        if (u.endsWith('/')) {
            u = u.slice(0, -1);
        }
        if (u === "https://www.wagslane.dev/tags/tags"){
            return pages;
        }
        await crawl(base_url, u, pages);
    }
    return pages
}

export { crawl, getURLsFromHTML, normalizeURL };

