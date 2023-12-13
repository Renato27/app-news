import React, { useEffect, useState } from 'react';
import { NewsAuthor, NewsCategory, NewsSource, ProviderItem, UserSetting } from '../types/types';
import './ArticleSearchFilter.css';
import { filters, saveAttributesKeycloak } from '../utils/api';
import { useKeycloak } from '@react-keycloak/web';

type Props = {
  categories: NewsCategory[];
  sources: NewsSource[];
  authors: NewsAuthor[];
  userSettingsFound: UserSetting | undefined;
  provider: ProviderItem | undefined;
  setResultNews: any;
};

function ArticleSearchFilter(props: Props) {
  const { keycloak } = useKeycloak();
  const token = keycloak.token;
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(props.userSettingsFound?.news_category_id || '');
  const [source, setSource] = useState(props.userSettingsFound?.news_source_id || '');
  const [author, setAuthor] = useState(props.userSettingsFound?.news_author_id || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saveToFeed, setSaveToFeed] = useState(false);
  console.log(source)
  const handleSearch = async () => {
    const filtersParams = new URLSearchParams({
      searchTerm: searchTerm,
      category: category as string,
      source: source as string,
      author: author as string,
      startDate: startDate,
      endDate: endDate,
      saveToFeed: String(saveToFeed),
    });
    
    const searchParams = `?${filtersParams.toString()}`;
    const providerId = String(props.provider?.id);
    const response = await filters(token, providerId, searchParams)
    props.setResultNews(response);
    
    setSearchTerm('')
    setCategory('')
    setSource('')
    setAuthor('')
    setStartDate('')
    setEndDate('') 
  };

  return (
    <div className='filters'>
      <label htmlFor='category' className='label'>Category:</label>
      <select id='category' className='select' value={category} onChange={(e) => setCategory(e.target.value)}>
        {!category && <option value=''>All</option>}
        {props.categories && props.categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor='source' className='label'>Source:</label>
      <select id='source' className='select' value={source} onChange={(e) => setSource(e.target.value)}>
        {!source && <option value=''>All</option>}
        {props.sources && props.sources.map((source, index) => (
          <option key={index} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>

      <label htmlFor='author' className='label'>Author:</label>
      <select id='author' className='select' value={author} onChange={(e) => setAuthor(e.target.value)}>
        {!author && <option value=''>All</option>}
        {props.authors && props.authors.map((author, index) => (
          <option key={index} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <label className='label'>Search Term:</label>
      <input type="text" className='input' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <label className='label'>Start Date:</label>
      <input type="date" className='input' value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label className='label'>End Date:</label>
      <input type="date" className='input' value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <div className="button-container">
      <div className="save-to-feed">
          <label>
            <input
              type="checkbox"
              checked={saveToFeed}
              onChange={() => setSaveToFeed(!saveToFeed)}
            />
            <span className="checkbox-icon">
              <i className={saveToFeed ? 'fas fa-check-square' : 'far fa-square'}></i>
            </span>
            Save to Feed
          </label>
        </div>

        <button className='button' onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default ArticleSearchFilter;
