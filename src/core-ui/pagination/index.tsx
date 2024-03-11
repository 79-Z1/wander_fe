'use client';

import React, {FC, memo, useMemo} from 'react';
import classNames from 'classnames';

import {ICoreUIBaseProps} from '../types';
import {generatePagination} from '../utils/pager';

export interface IPagination extends ICoreUIBaseProps {
  type?: 'minimal' | 'compact' | 'hidePrevNextButton';
  totalItems: number;
  currentPage?: number;
  itemPerPage?: number;
  pageVisible?: number;
  onChange?: (page: number) => void;
  pageItemClassNames?: string;
  activePageItemClassNames?: string;
  allowShowOnePage?: boolean;
}

const Pagination: FC<IPagination> = memo(
  ({
    className,
    totalItems,
    currentPage = 1,
    itemPerPage = 5,
    pageVisible = 5,
    activePageItemClassNames,
    allowShowOnePage = false,
    pageItemClassNames,
    type,
    visible = true,
    onChange,
    ...rest
  }) => {
    const pager = useMemo(
      () => generatePagination({totalItems, currentPage, itemPerPage, pageVisible}),
      [totalItems, currentPage, itemPerPage, pageVisible]
    );

    const setPage = (page: number) => {
      if (page === currentPage) return;
      onChange?.(page);
    };

    const renderPageNumber = () => {
      if (type === 'minimal') return null;

      return pager.pages.map((page, index: number) => (
        <li
          key={index}
          className={classNames(
            'abc-pagination__item',
            'abc-pagination__number',
            pager.currentPage === page
              ? ` ${activePageItemClassNames} abc-pagination__item--active`
              : `${pageItemClassNames}`
          )}
        >
          <button
            className={typeof page === 'number' ? '' : 'cursor-default'}
            onClick={e => {
              if (typeof page === 'number') {
                setPage(page);
              }
              e.preventDefault();
            }}
          >
            {page}
          </button>
        </li>
      ));
    };

    const renderFirstButton = () => {
      if (type === 'minimal' || type === 'compact' || type === 'hidePrevNextButton') return null;

      return (
        <li
          className={classNames(
            'abc-pagination__item',
            'abc-pagination__icon',
            pager.currentPage === 1 ? 'abc-pagination__item--disabled' : ''
          )}
        >
          <button onClick={() => setPage(1)} disabled={pager.currentPage === 1} data-testid="abc-pagination-prev">
            <i className="ico-angles-left-small"></i>
          </button>
        </li>
      );
    };

    const renderLastButton = () => {
      if (type === 'minimal' || type === 'compact' || type === 'hidePrevNextButton') return null;

      return (
        <li
          className={classNames(
            'abc-pagination__item',
            'abc-pagination__icon',
            pager.currentPage === pager.totalPages ? 'abc-pagination__item--disabled' : ''
          )}
        >
          <button
            onClick={() => setPage(pager.totalPages)}
            disabled={pager.currentPage === pager.totalPages}
            data-testid="abc-pagination-last"
          >
            <i className="ico-angles-right-small"></i>
          </button>
        </li>
      );
    };

    const renderPreviousButton = () => {
      if (type === 'hidePrevNextButton') return null;
      return (
        <li
          className={classNames(
            'abc-pagination__item',
            'abc-pagination__icon',
            'abc-pagination__prev',
            pager.currentPage === 1 ? 'abc-pagination__item--disabled' : ''
          )}
        >
          <button
            onClick={() => setPage(pager.currentPage - 1)}
            disabled={pager.currentPage === 1}
            data-testid="abc-pagination-prev"
          >
            <i className="ico-angle-left-small"></i>
          </button>
        </li>
      );
    };

    const renderNextButton = () => {
      if (type === 'hidePrevNextButton') return null;
      return (
        <li
          className={classNames(
            'abc-pagination__item',
            'abc-pagination__icon',
            'abc-pagination__next',
            pager.currentPage === pager.totalPages ? 'abc-pagination__item--disabled' : ''
          )}
        >
          <button
            onClick={() => setPage(pager.currentPage + 1)}
            disabled={pager.currentPage === pager.totalPages}
            data-testid="abc-pagination-next"
          >
            <i className="ico-angle-right-small"></i>
          </button>
        </li>
      );
    };

    if (!visible) return null;
    if (!totalItems) return null;
    if (!currentPage) return null;
    if (pager && (!pager.pages || (!allowShowOnePage && pager.pages.length <= 1))) return null;

    return (
      <div className={classNames('abc-pagination', className)} data-testid="abc-pagination" {...rest}>
        <ul className="abc-pagination__list">
          {renderFirstButton()}
          {renderPreviousButton()}
          {renderPageNumber()}
          {renderNextButton()}
          {renderLastButton()}
        </ul>
      </div>
    );
  }
);

Pagination.displayName = 'ABCPagination';

export default Pagination;
