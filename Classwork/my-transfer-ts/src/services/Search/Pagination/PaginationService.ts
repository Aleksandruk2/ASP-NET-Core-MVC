export const getPages = (
    current: number,
    total: number,
    delta = 2
) => {
    const pages: (number | string)[] = [];

    const rangeStart = Math.max(2, current - delta);
    const rangeEnd = Math.min(total - 1, current + delta);

    pages.push(1);

    if (rangeStart > 2) {
        pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
    }

    if (rangeEnd < total - 1) {
        pages.push("...");
    }

    if (total > 1) {
        pages.push(total);
    }

    return pages;
};
