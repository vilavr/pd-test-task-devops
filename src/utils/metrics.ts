import { Request, Response, NextFunction } from 'express';

let requestCount = 0;
const requestDurations: number[] = [];

export const requestMetrics = {
  startTimer: (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();
    res.on('finish', () => {
      const duration = process.hrtime(start);
      const milliseconds = duration[0] * 1000 + duration[1] / 1e6;
      requestDurations.push(milliseconds);
      requestCount++;
    });
    next();
  },
  getMetrics: () => ({
    meanRequestDuration: requestDurations.reduce((a, b) => a + b, 0) / requestDurations.length || 0,
    totalRequests: requestCount,
  }),
};
