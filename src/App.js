import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repos,setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{});
    setRepos([...repos,response.data]);
  }

  async function handleRemoveRepository(id) {
    const response =  await api.delete(`repositories/${id}`);
    
    const indexOfInterest = repos.findIndex((repo) => repo.id == id);
    const remainingRepos = repos;

    remainingRepos.splice(indexOfInterest,1)
    
    setRepos([...remainingRepos]);
  
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        
        {
          repos.map(repo => 
            <li key={repo.id}> 
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}> Remover </button>
            </li> 
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
