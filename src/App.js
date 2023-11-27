import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function Home() {
  return (
    <div>
      <h1>Bem-vindo à LR STORE!</h1>
      <div>
        <Link to="/cadastrar">
          <button className="button">Cadastrar Nova Placa</button>
        </Link>
        <Link to="/listar">
          <button className="button">Listar Placas</button>
        </Link>
      </div>
    </div>
  );
}


function Cadastro({ onAdicionarPlaca }) {
  const [novaPlaca, setNovaPlaca] = useState({
    nome: '',
    fabricante: '',
    preco: '',
    vram: '',
    imagem: '',
  });

  const adicionarPlaca = () => {

    const novaPlacaDeVideo = {
      id: uuidv4(),
      nome: novaPlaca.nome,
      fabricante: novaPlaca.fabricante,
      preco: novaPlaca.preco,
      vram: novaPlaca.vram,
      imagem: novaPlaca.imagem,
    };

    onAdicionarPlaca(novaPlacaDeVideo);
    setNovaPlaca({ nome: '', fabricante: '', preco: '', vram: '', imagem: '' });
  };

  return (
    <div>
      <h1>Cadastrar Nova Placa de Vídeo</h1>
      <div className="form-container">
        <div>
          <label htmlFor="nomePlaca">Nome da Placa de Vídeo:</label>
          <input
            type="text"
            id="nomePlaca"
            value={novaPlaca.nome}
            onChange={(e) => setNovaPlaca({ ...novaPlaca, nome: e.target.value })}
          />
        </div>
        <div className="imagem-container">
          <label htmlFor="imagemPlaca">Link da Imagem (ou faça upload):</label>
          <input
            type="text"
            id="imagemPlaca"
            value={novaPlaca.imagem}
            onChange={(e) => setNovaPlaca({ ...novaPlaca, imagem: e.target.value })}
          />
          <div>
            <label htmlFor="uploadImagem">Imagem:</label>
            <input type="file" id="uploadImagem" name="uploadImagem" accept="image/*" className="button" />
          </div>
        </div>
        <div>
          <label htmlFor="fabricantePlaca">Fabricante:</label>
          <select
            id="fabricantePlaca"
            value={novaPlaca.fabricante}
            onChange={(e) => setNovaPlaca({ ...novaPlaca, fabricante: e.target.value })}
          >
            {}
            <option value="">Selecione o Fabricante</option>
            <option value="ASUS">ASUS</option>
            <option value="GALAX">GALAX</option>
            <option value="GIGABYTE">GIGABYTE</option>
            <option value="PCYES">PCYES</option>
            <option value="XFX">XFX</option>
            <option value="MSI">MSI</option>
            <option value="AFOX">AFOX</option>
            <option value="EVGA">EVGA</option>
            <option value="PALIT">PALIT</option>
            <option value="PNY">PNY</option>
          </select>
        </div>
        <div>
          <label htmlFor="precoPlaca">Preço:</label>
          <input
            type="text"
            id="precoPlaca"
            value={novaPlaca.preco}
            onChange={(e) => setNovaPlaca({ ...novaPlaca, preco: e.target.value.replace(/\D/g, '') })}
          />
        </div>
        <div>
          <label htmlFor="vramPlaca">VRAM:</label>
          <input
            type="text"
            id="vramPlaca"
            value={novaPlaca.vram}
            onChange={(e) => setNovaPlaca({ ...novaPlaca, vram: e.target.value })}
          />
        </div>
        <button className="button" onClick={adicionarPlaca}>
          Adicionar Placa
        </button>
      </div>
      <Link to="/">
        <button className="button">Voltar para a Página Inicial</button>
      </Link>
    </div>
  );
}

function ListaPlacas({ placasDeVideo, onRemoverPlaca }) {
  const [placaEdit, setPlacaEdit] = useState(null);

  const editarPlaca = (placa) => {
    setPlacaEdit(placa);
  };

  return (
    <div className="lista-container">
      <h1>Listar Placas de Vídeo</h1>
      <ul>
        {placasDeVideo.map((placa) => (
          <li key={placa.id}>
            <div>
              {placa.imagem && <img src={placa.imagem} alt={placa.nome} style={{ width: '50px', height: '50px', marginRight: '10px' }} />}
              <strong>{placa.nome}</strong> ({placa.fabricante}) - VRAM: {placa.vram}GB, Preço: R${placa.preco}
            </div>
            <div>
              <button onClick={() => editarPlaca(placa)}>Editar</button>
              <button onClick={() => onRemoverPlaca(placa.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      {placaEdit && (
        <div>
          <h2>.</h2>
          {}
        </div>
      )}
      <Link to="/">
        <button>Voltar para a Página Inicial</button>
      </Link>
    </div>
  );
}

function App() {
  const [placasDeVideo, setPlacasDeVideo] = useState([]);

  const adicionarPlaca = (novaPlaca) => {
    setPlacasDeVideo([...placasDeVideo, novaPlaca]);
  };

  const removerPlaca = (id) => {
    const novaLista = placasDeVideo.filter((placa) => placa.id !== id);
    setPlacasDeVideo(novaLista);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Cadastro onAdicionarPlaca={adicionarPlaca} />} />
        <Route path="/listar" element={<ListaPlacas placasDeVideo={placasDeVideo} onRemoverPlaca={removerPlaca} />} />
      </Routes>
    </Router>
  );
}

export default App;
