import { PRODUCTION } from "../constants/application.js";
import { ENV } from "../config/config.js";

class ApiResponse {
  constructor(req, statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.request = {
      ip: req.ip || null,
      method: req.method || null,
      url: req.originalUrl || null,
    };
     console.info("ApiResponse",{
       meta:{
         statusCode,
         message,
         success: this.success,
         request: this.request
       }
     })
    if (ENV === PRODUCTION) {
      delete this.request.ip;
    }
    
  }
}
export default ApiResponse;
