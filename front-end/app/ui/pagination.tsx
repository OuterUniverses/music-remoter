'use client'

import React from "react";
import {Pagination as Pg} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Pagination(
    {totalPages}: { totalPages: number }
) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const {replace} = useRouter()
    const createPageURL = (pageNumber: Number | String) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}#queue`, {scroll: true})
    }

    return (
        <Pg
            classNames={{
                cursor: 'rounded-full'
            }}
            className={'w-fit mx-auto'}
            total={totalPages}
            color="success"
            variant={'light'}
            siblings={2}
            page={currentPage}
            onChange={createPageURL}
        />
    );
}
