'use client'

import {Button, Input} from "@nextui-org/react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import {useState} from "react";

export default function Search() {
    const [value, setValue] = useState<string>('')
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

    return <div className={'mt-10 flex flex-nowrap items-center'}>
        <Input
            onChange={e => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
            label={'曲名'}
            labelPlacement={'inside'}
            className={'h-fit'}
        />
    </div>
}