/**
 * @fileOverview Useful interfaces for typescript
 */
export interface ServiceException {
    new(message: string): ServiceException;
};

export interface ControllerError {
    new(exception: ServiceException): ControllerError;
};

export interface ActiveRecord {
    update(data: any): ActiveRecord;
    destroy(): ActiveRecord;
    toJSON(): any;
};

export interface LegacyController {
    errors: Object;
    new(): LegacyController
};
