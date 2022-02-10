const helmet = require('helmet');
const helmetConfig = {
  config: (app) => {
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'http://localhost:3000'],
        },
      })
    );
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.permittedCrossDomainPolicies());
    app.use(helmet.referrerPolicy());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.xssFilter());
  },
};
module.exports = helmetConfig;
