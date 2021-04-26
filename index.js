#!/usr/bin/env node
const NginxParser = require('nginxparser');
const Moment = require('moment');
const fs = require('fs');
const {program} = require('commander');
program.version(process.env.npm_package_version);

const defaultFormatLog = '$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
const defaultFormatTime = 'DD/MMM/YYYY:hh:mm:ss Z';

program
    .requiredOption('-f, --filePath <path>', 'path of the nginx logs file')
    .requiredOption('-o, --output <path>', 'path of the output .gor file', "output.gor")
    .option('--formatLog <string>', 'format of the nginx log file', defaultFormatLog)
    .option('--formatTime <string>', 'format of the nginx time', defaultFormatTime)

program.parse(process.argv);
const args = program.opts();
const parser = new NginxParser(args.formatLog);

const stream = fs.createWriteStream(args.output);
stream.once('open', () => {
    parser.read(args.filePath, function (row) {
        if (row.time_local && row.request) {
            stream.write(`1 ${getRandomId(40)} ${Moment(row.time_local, args.formatTime).unix() * 1000000000}\n`);
            stream.write(`${row.request}\r\n`)
            if (row.http_referer) stream.write(`Host: ${new URL(row.http_referer).hostname}\r\n`)
            if (row.http_user_agent) stream.write(`User-Agent: ${row.http_user_agent}\r\n`)
            stream.write(`\r\n`)
            stream.write(`\n`)
            stream.write(`🐵🙈🙉`)
            stream.write(`\n`)
        } else {
            console.log(`Invalid nginx log: ${JSON.stringify(row)}`)
        }
    }, function (err) {
        if (err) throw err;
        stream.end();
    });
});

function getRandomId(length) {
    let result = "";
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    [...Array(length)].forEach(_ => result += characters.charAt(Math.floor(Math.random() * characters.length)));
    return result;
}