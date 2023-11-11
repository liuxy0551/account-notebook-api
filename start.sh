# git clone https://github.com/liuxy0551/account-notebook-api.git
git add pm2 .env.json
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
