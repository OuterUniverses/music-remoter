'use client'

import {Input} from "@nextui-org/react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
    const searchParams = useSearchParams();
    const pathName = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams()
        console.log(term);
        params.set('page', '1');
        if (term) params.set('query', term)
        else params.delete('query')
        replace(`${pathName}?${params.toString()}`)
    }, 300)

    return <div className={'flex flex-nowrap items-center'}>
        <Input
            radius={'none'}
            onChange={e => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
            label={'搜索'}
            labelPlacement={'inside'}
            className={'h-fit'}
        />
    </div>
}