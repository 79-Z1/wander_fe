export const formatPlanStatus = (status: string) => {
  switch (status) {
    case 'done':
      return 'Đã xong';
    case 'in_coming':
      return 'Đang chờ';
    default:
      return 'Đang tiến hành';
  }
};
