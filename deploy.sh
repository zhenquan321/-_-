#!/bin/bash
remotePath=/www/wwwroot/music.io-code.com
localPath=$(pwd)/dist
rm -rf dist && yarn build
ssh -f CVM2 "rm -f /www/wwwroot/music.io-code.com/**/*"
rsync -avz $localPath/* CVM2:$remotePath
ssh -f CVM2 "chown -R www:www /www/wwwroot/music.io-code.com/*"
echo -e "\033[32m 已同步到网站 \033[0m"
