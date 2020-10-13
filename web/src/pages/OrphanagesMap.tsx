import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/Local.svg';
// import { Container } from './styles';
import '../styles/pages/orphanages-map.css';

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato do mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>
        </footer>

        <div></div>
      </aside>
      <Link to="" className="create-orphanage">
        <FiPlus />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
