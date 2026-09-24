import {ReactNode, useState} from 'react';

type ContentCarouselProps<T> = {
   items: T[];
   pageSize: number;
   className: string;
   label: string;
   renderItem: (item: T, index: number) => ReactNode;
};

export function ContentCarousel<T>({items, pageSize, className, label, renderItem}: ContentCarouselProps<T>) {
   const [page, setPage] = useState(0);
   const pageCount = Math.ceil(items.length / pageSize);
   const visibleItems = items.slice(page * pageSize, page * pageSize + pageSize);
   return <><div className={className}>{visibleItems.map((item, index) => renderItem(item, page * pageSize + index))}</div>{pageCount > 1 && <div className="content-pager" aria-label={`${label} pages`}><button type="button" onClick={() => setPage((page - 1 + pageCount) % pageCount)} aria-label={`Previous ${label} page`}>←</button>{Array.from({length: pageCount}, (_, index) => <button type="button" key={index} onClick={() => setPage(index)} aria-label={`Show ${label} page ${index + 1}`} aria-current={page === index ? 'page' : undefined} className={page === index ? 'active' : ''}>{index + 1}</button>)}<button type="button" onClick={() => setPage((page + 1) % pageCount)} aria-label={`Next ${label} page`}>→</button></div>}</>;
}
