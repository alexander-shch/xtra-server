import { Response } from 'express';

export function SuccessfulResponse<T extends object>(
  res: Response,
  data: T | string
): Response {
  return res
    .status(200)
    .json(typeof data === 'string' ? { message: data } : data);
}

export function BadRequest(res: Response, message: any = ''): Response {
  return res.status(400).json({
    error:
      message ||
      "Your request can't be processed, please check the request data",
  });
}

export function NotFound(res: Response, message: any = ''): Response {
  return res.status(404).json({
    error: message || 'Not found',
  });
}

export function ServerError(res: Response, message: any = ''): Response {
  return res.status(500).json({
    error: message || 'Some server error occurred',
  });
}

export function SuccessOrNotFound(
  res: Response,
  data: any,
  message: any = ''
): Response {
  if (!data) {
    return NotFound(res, message);
  }
  return SuccessfulResponse(res, message);
}
