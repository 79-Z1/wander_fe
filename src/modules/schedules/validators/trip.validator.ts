import * as zod from 'zod';

export const TripValidator = zod
  .object({
    topic: zod.string().min(1, 'Không được để trống tiêu đề'),
    description: zod.string().min(1, 'Không được để trống mô tả'),
    startDate: zod.date().optional(),
    endDate: zod.date().optional(),
    total: zod.number().optional().default(0),
    imageUrl: zod.string().optional(),
    plans: zod
      .array(
        zod.object({
          address: zod.string().min(1, 'Không được để trống điểm đến'),
          startAt: zod.string().min(1, 'Không được để trống thời gian'),
          title: zod.string().min(1, 'Không được để trống tên'),
          cost: zod.number().default(0)
        })
      )
      .optional()
  })
  .superRefine((data, ctx) => {
    const {total, plans} = data;

    if (total !== undefined && plans) {
      const totalCost = plans.reduce((acc, plan) => acc + (plan.cost || 0), 0);

      if (totalCost > total) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Tổng số chi phí kế hoạch không được lớn hơn Tổng chi phí lịch trình',
          path: ['total']
        });
      }
    }
  });
