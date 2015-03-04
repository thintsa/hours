# hours

## install

Clone it first from http://github.com/thintsa/hours

$ git clone http://github.com/thintsa/hours

Install dependencies

$ cd hours
$ npm install

Run it with our favourite node tool

$ pm2 start ./bin/www

Note that it hijacks port :80 so you have to have privileges for it

$ sudo setcap cap_net_bind_service=+ep /path/to/node
