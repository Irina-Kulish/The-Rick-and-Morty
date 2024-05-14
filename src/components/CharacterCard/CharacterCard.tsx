import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Character } from '../../interface/character';

type CharacterCardProps = {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div 
      className='flex flex-wrap justify-center mt-3'
    >
      <div 
        className='m-4 transition-transform transform hover:scale-110 text-black'
      >
        <div 
          className="card card-compact w-60 h-60 shadow-xl flex"
        >
          <figure>
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-32 h-32 mr-4 mt-2" 
            />
          </figure>
          <div 
            className="card-body flex flex-col justify-between p-4"
          >
            <div>
              <h2 
                className="text-xl mb-2 text-center"
              >
                {character.name}
              </h2>
            </div>
            <button 
              onClick={openModal} 
              className='btn bg-gray-600'
            >
              Details
            </button>
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        character={character} 
      />
    </div>
  );
};
