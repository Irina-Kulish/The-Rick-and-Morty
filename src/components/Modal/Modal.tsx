import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Character } from "../../interface/character";
import { Loading } from "../Loading/Loading";
import { Location } from "../../interface/location";
import { Episode } from "../../interface/episode";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, character }) => {
  const [locationDetails, setLocationDetails] = useState<Location | null>(null);
  const [firstEpisode, setFirstEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (character.location.url) {
        const response = await fetch(character.location.url);
        const data = await response.json();
        setLocationDetails(data);
      }

      if (character.episode.length > 0) {
        const response = await fetch(character.episode[0]);
        const data = await response.json();
        setFirstEpisode(data);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, character]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <div 
        className="bg-gray-600 p-5 rounded-lg shadow-lg max-w-2xl w-full m-4"
      >
        <h2 
          className="text-xl font-bold mb-2 text-white"
        >
          {character.name}
        </h2>
        <div 
          className="flex flex-col md:flex-row md:items-start"
        >
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full md:w-1/3 rounded-lg shadow-md"
          />
          <div 
            className="md:ml-4 text-left text-gray-300"
          >
            <p>
              <strong>
                Status: 
              </strong> 
              {character.status}
            </p>
            <p>
              <strong>
                Species: 
              </strong> 
              {character.species}
            </p>
            <p>
              <strong>
                Gender: 
              </strong> 
              {character.gender}
            </p>
            <p>
              <strong>
                Type: 
              </strong> 
              {locationDetails 
                ? locationDetails.type 
                : <Loading />
              }
            </p>
            <p>
              <strong>
                Dimension: 
              </strong> 
              {locationDetails 
                ? locationDetails.dimension 
                : <Loading />
              }
            </p>
            <p>
              <strong>
                Last known location: 
              </strong> 
              {locationDetails 
                ? locationDetails.name 
                : <Loading />
              }
            </p>
            <p>
              <strong>
                First seen in episode: 
              </strong> 
                {firstEpisode 
                  ? firstEpisode.name 
                  : <Loading />
                }
            </p>
            <p>
              <strong>
                Air date: 
              </strong> 
              {firstEpisode 
                ? firstEpisode.air_date 
                : <Loading />
              }
            </p>
            <p>
              <strong>
                Number of Episodes: 
              </strong> 
              {character.episode.length}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            onClick={onClose} 
            className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-800 transition ease-in-out duration-150"
          >
              Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
