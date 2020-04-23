import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);


  async function handleAddRepository() {
    // TODO
    const newRepo = {
      title: `Novo Repositório ${Date.now()}`,
      url: `https://teste.com`,
      techs: [
        `tech número=${Date.now()}`,
        `Outra tech número=${Date.now()}`,
      ]
    }
    await api.post('repositories', newRepo).then(response => {

      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    // TODO
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    repositories.splice(repoIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>

          <div key={repository.id}>
            <li>{repository.title}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>

        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
