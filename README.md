# nginx-to-gor-converter
Simple converter nginx logs to the [goreplay](https://github.com/buger/goreplay) format(.gor)

## Installation

```
npm i -g nginx-to-gor-converter
```

## Usage

```
Usage of nginx-replay:

Options:
  -f, --filePath <path>  path of the nginx logs file
  -o, --output <path>    path of the output .gor file (default: "output.gor")
  --formatLog <string>   format of the nginx log file (default: "$remote_addr - $remote_user [$time_local] \"$request\" $status $body_bytes_sent \"$http_referer\" \"$http_user_agent\"")
  --formatTime <string>  format of the nginx time (default: "DD/MMM/YYYY:hh:mm:ss Z")
  -h, --help             display help for command


```

```bash
# Convert from nginx logs to the goreplay format
nginx-to-gor-converter -f nginx-access.log -o output.gor
```
