import {useState} from "react";

export default function usePageController() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    return {
        page,
        setPage,
        totalPages,
        setTotalPages,
    };
}