/**
 * @fileOverview Useful interfaces for typescript
 */
export interface ServiceException {
    new(message: string): ServiceException;
    message?: string;
}

export interface ControllerError {
    new(exception: ServiceException): ControllerError;
}

export interface LegacyController {
    errors: Object;
    new(): LegacyController;
}
