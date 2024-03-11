interface IPager {
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

export interface IPageParams {
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  pageVisible: number;
}

export const generatePagination = ({totalItems, currentPage, itemPerPage, pageVisible}: IPageParams): IPager => {
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const middle = Math.floor(pageVisible / 2);
  const preMiddle = middle - 1;
  const nextMiddle = middle + 1;
  const isOdd = pageVisible % 2 === 0;

  let startPage: number, endPage: number;

  if (totalPages <= pageVisible) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= nextMiddle) {
      startPage = 1;
      endPage = pageVisible;
    } else if (currentPage + preMiddle >= totalPages) {
      startPage = totalPages - (pageVisible - 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - middle;
      endPage = currentPage + (isOdd ? preMiddle : middle);
    }
  }

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = Math.min(startIndex + itemPerPage - 1, totalItems - 1);
  // eslint-disable-next-line prefer-spread
  const pages = Array.apply(null, {length: endPage + 1 - startPage} as unknown[]).map((_, i) => startPage + i);

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    itemPerPage: itemPerPage,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  } as IPager;
};
