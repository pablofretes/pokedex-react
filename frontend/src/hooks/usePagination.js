import { useMemo } from "react";

export const DOTS = '...';

//THIS CREATES AN ARRAY AND SETS THE ELEMENTS FROM START TO END
const range = (start, end) => {
    let length = end - start + 1;
    //SO IF FOR EXPAMPLE LENGTH IS 5 THEN THE ARRAY PRODUCED WOULD BE [1, 2, 3, 4, 5]
    return Array.from({ length }, (_, idx) => idx + start);
}

export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        //IF THE NUMBER OF PAGES IF LESS THAN WHAT WE WANT TO SHOW IN OUR COMPONENT (DOESN'T APPLY TO OUR APP), WE RETURN THIS.
        if(totalPageNumbers >= totalPageCount){
            return range(1, totalPageCount);
        };

        //CALCULATE LEFT ND RIGHT SIBLING INDEX
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        //WE ONLY WANT TO SHOW DOTS IF THE DIFFERENCE BETWEEN OUR FIRST/LAST PAGE AND ITS SIBLING INDEX IS MORE THAN 2 
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        //IF WE ONLY WANT TO SHOW RIGHT DOTS
        if(!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        };

        //IF WE ONLY WANT TO SHOW LEFT DOTS
        if(!shouldShowRightDots && shouldShowLeftDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            return [firstPageIndex, DOTS, ...rightRange];
        };

        //WE WANT TO SHOW DOTS RIGHT AND LEFT
        if(shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);

            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        };

    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};