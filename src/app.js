const { setupApp } = require('./config/express');
const serverPort = 8080;

function createApp() {
  return setupApp();
}

function startApp(app) {
  app.listen(serverPort, () => {
    const serverInfo = {
      serverPort,
    }
    console.log('server:started', serverInfo);
  });
  return app;
}

module.exports = {
  createApp,
  startApp,
}