# Deploying to Heroku

Run `npm run dist` to generate/update `dist/bundle.js`.

Commit changes and then push to heroku.
git push heroku master
heroku open

Notes:

- The production-server.js is used for heroku.
- The server.js is used only for local webpack dev server
- the npm run dist command uses webpack to compile a single bundle.js

