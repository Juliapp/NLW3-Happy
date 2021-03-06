import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/Local.svg';
// import { Container } from './styles';

import '../styles/components/Sidebar.css';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <div>
      <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default Sidebar;
