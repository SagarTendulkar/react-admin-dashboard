export const sortData = (data, field, direction) => {
    if (!field) return data;

    return [...data].sort((a, b) => {
        const valueA = a[field]?.toString().toLowerCase();
        const valueB = b[field]?.toString().toLowerCase();

        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
    });
};