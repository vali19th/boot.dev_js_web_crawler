import { crawl } from './crawl.js'

async function main() {
    if (process.argv.length != 3) {
        console.log('Usage: node index.js <URL>')
        return
    }

    let url = process.argv[2];
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    let pages = await crawl(url);
    pages = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    console.table(pages);
}

main()

