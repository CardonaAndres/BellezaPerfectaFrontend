export type GeneralProps = {
    meta: { total: number };
    limit: number;
    page: number;
    onLimitChange: (newLimit: number) => void;
};

export type SearchFormData = {
    searchTerm: string;
    searchProperty: string;
};

export type PaginationProps = {
    limit ?: number,
    page ?: number
}