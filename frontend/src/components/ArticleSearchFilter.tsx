import React, { useEffect, useState } from 'react';
import { NewsAuthor, NewsCategory, NewsSource } from '../types/types';
import './ArticleSearchFilter.css';

type Props = {
  categories: NewsCategory[];
  sources: NewsSource[];
  authors: NewsAuthor[];
};

function ArticleSearchFilter(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [author, setAuthor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const searchParams = {
      searchTerm,
      category,
      source,
      startDate,
      endDate,
    };

    fetch(`sua-api/articles?${new URLSearchParams(searchParams)}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Erro ao buscar artigos:', error));
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, category, source, startDate, endDate]);

  return (
    <div className='filters'>
      <label htmlFor='category' className='label'>Category:</label>
      <select id='category' className='select' value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>All</option>
        {props.categories && props.categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor='source' className='label'>Source:</label>
      <select id='source' className='select' value={source} onChange={(e) => setSource(e.target.value)}>
        <option value=''>All</option>
        {props.sources && props.sources.map((source, index) => (
          <option key={index} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>

      <label htmlFor='author' className='label'>Author:</label>
      <select id='author' className='select' value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value=''>All</option>
        {props.authors && props.authors.map((author, index) => (
          <option key={index} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <label className='label'>Start Date:</label>
      <input type="date" className='input' value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label className='label'>End Date:</label>
      <input type="date" className='input' value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <label className='label'>Search Term:</label>
      <input type="text" className='input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <button className='button' onClick={handleSearch}>Search</button>
    </div>
  );
}

export default ArticleSearchFilter;
