import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

export const securityHandler = (app) => {
  app.use(mongoSanitize());
  app.use(helmet());
  app.use(xss());
  app.use(hpp());
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 5,
      limit: 1000
    })
  );
};