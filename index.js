import { crawl } from './crawl.js'

function main() {
    if (process.argv.length != 3) {
        console.log('Usage: node index.js <URL>')
        return
    }

    const url = process.argv[2];
    crawl(url);
}

main()

