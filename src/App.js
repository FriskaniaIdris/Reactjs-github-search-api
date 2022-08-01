import './App.css';
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from 'react';

function App() {
  const [dataList, setDataList] = useState([]);
  const [filterBy, setFilterBy] = useState('user');
  const [keyword, setKeyword] = useState('');
  const handleFilterChange = e => {
    setFilterBy(e.target.value);
  }
  const handleKeywordChange = e => {
    setKeyword(e.target.value);
  }
  useEffect(() => {
    const doFilter = async () => {
      let response = null;
  
      if(filterBy === "repositories"){
        response = await fetch(`https://api.github.com/search/repositories?q=${keyword}`).catch(error => {return console.log(error)});
      }
      if(filterBy === "user"){
        response = await fetch(`https://api.github.com/search/users?q=${keyword}`).catch(error => {return console.log(error)});
      }
      const json = await response.json();
      console.log(filterBy, json)
      setDataList(json.items);
    }

    doFilter();
  }, [keyword, filterBy])
  function craftContentCard() {
      return dataList.map(function (data, index) {
        if(filterBy === 'repositories'){
          return (
            <div 
              style={{
                display:'inline-block', 
                minHeight: '20vh', 
                maxWidth: '25%', 
                width: '25%', 
                margin: '1rem', 
                padding: '1rem', 
                backgroundColor: '#dddddd'
              }} 
              key={index}>
              <h3>{data.name}</h3> 
              <p>{data.owner.login}</p>
              <p>{data.stargazers_count}</p>
            </div>
          )
        }
        return(
          <div
            style={{
              display:'inline-block', 
              minHeight: '20vh', 
              maxWidth: '25%', 
              width: '25%', 
              margin: '1rem', 
              padding: '1rem', 
              backgroundColor: '#dddddd'
            }} 
            key={index}>
            <img 
              src={data.avatar_url} 
              alt="avatar"
              style={{
                height: '80px', 
                width: '80px',
                borderRadius: '100%',
                border: '10px',
                borderColor: 'white',
                margin: '1rem', 
                backgroundColor: '#dddddd'
              }}/>
            <h3>{data.login}</h3>
            <p>Repositories Link: <a href={data.html_url} target="_blank" rel="noreferrer">Link</a></p>
          </div>
        )
      })
  }
  return (
    <div style={{ textAlign: 'Left', padding: '5vh 10vw'}}>
      <input type="text" id="search_input" onChange={handleKeywordChange} style={{ margin: '0 1rem', fontSize: '1rem'}}></input>
      <select value={filterBy} onChange={handleFilterChange}>
        <option value="user">User</option>
        <option value="repositories">Repositories</option>
      </select>
      <section style={{}}>
        { dataList !== undefined ? craftContentCard(): '' }
      </section>
      {/* <ReactPaginate></ReactPaginate> */}
    </div>
  );
}

export default App;
