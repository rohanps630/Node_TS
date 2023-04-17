import { Response } from 'express';

export interface CustomResponse extends Response {
  customJson: (data: any, message: string, status?: number) => void;
  customError: (error: any, message: string, status?: number) => void;
}
