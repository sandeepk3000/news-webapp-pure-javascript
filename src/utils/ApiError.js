import { PRODUCTION } from "../constants/application.js";
import { ENV } from "../config/config.js";
class ApiError extends Error {
  constructor(
    req,
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    this.request = {
      ip: req.ip || null,
      method: req.method || null,
      url: req.originalUrl || null,
    };
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    console.info("ApiError", {
      meta: {
        statusCode,
        message,
        success: this.success,
        request: this.request,
      },
    });
    if (ENV === PRODUCTION) {
      delete this.stack;
      delete this.request.ip;
    }
  }
}

export default ApiError;
