import React from 'react'
import { NewsAuthor, NewsCategory, NewsSource } from '../types/types';
import './UserFilters.css'

type Props = {
    categories: NewsCategory[];
	sources: NewsSource[];
	authors: NewsAuthor[];
}

function UserFilters(props: Props) {
    return (
        <div className='filters'>
            <label htmlFor='category'>Category:</label>
            <select id='category'>
                <option value=''>All</option>
                {props.categories && props.categories?.map((category, index) => (
                    <option key={index} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor='source'>Source:</label>
            <select id='source'>
                <option value=''>All</option>
                {props.sources && props.sources?.map((source, index) => (
                    <option key={index} value={source.id}>
                        {source.name}
                    </option>
                ))}
            </select>

            <label htmlFor='author'>Author:</label>
            <select id='author'>
                <option value=''>All</option>
                {props.authors && props.authors?.map((author, index) => (
                    <option key={index} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default UserFilters