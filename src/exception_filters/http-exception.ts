import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // Safely retrieve the status code, defaulting to 500 if unavailable
        const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
        // Extract the error response or provide a generic fallback
        const errorResponse = exception.getResponse?.();
        const errorDetails =
            typeof errorResponse === "string"
                ? { message: errorResponse }
                : (errorResponse as Record<string, any>) || { message: "Unexpected error occurred" };

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: errorDetails.message || "An error occurred",
            details: errorDetails.details || null,
        });
    }
}

// export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest<Request>();
//         const status = exception.getStatus();

//         response
//             .status(status)
//             .json({
//                 statusCode: status,
//                 timestamp: new Date().toISOString(),
//                 path: request.url,
//             });
//     }
// }


//Tutors default
// export class HttpExceptionFilter implements ExceptionFilter {
//     constructor(private logger: Logger) { }
//     catch(exception: any, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const request = ctx.getRequest<Request>();
//         const status = exception.getStatus();
//         this.logger.error(`${request.method} ${request.originalUrl} ${status} error: ${exception.message}`)
//         const errorDetails = exception.getResponse();
//         response.status(status).json({ error: true, errorDetails })
//     }
// }