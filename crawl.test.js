import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normalizeURL } from "./crawl.js";

test('normalizeURL', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
})

test('getURLsFromHTML', () => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        </head>

        <body>
        <a href="https://boot.dev/sqlite/">Learn SQLite</a>
        <div>
            <a href="http://boot.dev/python">Learn Python</a>
        </div>
        <a href="https://boot.dev/golang">Learn Go</a>
        <a href="/docker">Learn Docker</a>
        </body>
        </html>
    `

    expect(getURLsFromHTML(html, "boot.dev")).toStrictEqual([
        'boot.dev/sqlite',
        'boot.dev/python',
        'boot.dev/golang',
        'boot.dev/docker'
    ]);
})

