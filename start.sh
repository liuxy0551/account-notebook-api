# git clone https://gitee.com/jizhangla/jizhangla-api.git
git add config/db.config.js
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
