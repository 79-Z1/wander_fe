import * as zod from 'zod';

export const CreateTripValidator = zod
  .object({
    title: zod.string().min(1, 'Title is required'),
    location: zod.string().min(1, 'Location is required'),
    startDate: zod.date().optional().default(new Date()),
    endDate: zod.date().optional().default(new Date()),
    description: zod.string().min(1, 'Description is required'),
    image: zod.string()
  })
  .refine(data => data.startDate < data.endDate, {
    message: 'Start date must be before end date',
    path: ['endDate']
  });
