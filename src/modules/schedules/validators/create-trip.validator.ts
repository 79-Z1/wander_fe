import * as zod from 'zod';

export const CreateTripValidator = zod.object({
  topic: zod.string().min(1, 'Không được để trống tiêu đề'),
  description: zod.string().min(1, 'Không được để trống mô tả'),
  startDate: zod.date().optional().default(new Date()),
  endDate: zod.date().optional().default(new Date()),
  plans: zod
    .array(
      zod.object({
        address: zod.string().min(1, 'Không được để trống điểm đến'),
        startAt: zod.string().min(1, 'Không được để trống thời gian'),
        title: zod.string().min(1, 'Không được để trống tên'),
        cost: zod.number().min(1, 'Không được để trống chi phí')
      })
    )
    .optional()
});
