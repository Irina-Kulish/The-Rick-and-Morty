import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { Filters } from '../Filters/Filters';
import { Header } from '../Header/Header';
import { Loading } from '../Loading/Loading';
import { ErrorComponent } from '../ErrorComponent/Error';
import { Pagination } from '../Pagination/Pagination';
import { Character } from '../../interface/character';
import { FilterParams } from '../../interface/filterParams';

export const Dashboard = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [genders, setGenders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`);
        setCharacters(response.data.results);
        setFilteredCharacters(response.data.results);
        const uniqueGenders = Array.from(new Set(
          response.data.results.map((character: Character) => character.gender))) as string[];
        setGenders(uniqueGenders);
        setTotalPages(response.data.info.pages);
        setIsLoading(false);

      } catch (err) {
        console.error(err);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleFilterChange = (filters: FilterParams) => {
    let updatedCharacters = characters;
    if (filters.name) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.gender) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    if (filters.status) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    setFilteredCharacters(updatedCharacters);
  };

  const getReset = () => {
    setFilteredCharacters(characters);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const hasData = filteredCharacters.length > 0;

  return (
    <>
      <Header/>
      <div 
        className="flex flex-row gap-5 flex-grow bg-white"
      >
        <div 
          className="w-1/5 min-h-full p-5 flex-shrink-0 mt-3"
        >
          <Filters 
            onChange={handleFilterChange} 
            getReset={getReset} 
            genders={genders} 
          />
        </div>
        <div 
          className='flex flex-wrap justify-center gap-4 flex-grow'
        >
          {isLoading ? (
            <Loading />
          ) : error ? (
            <ErrorComponent 
              error={error} 
            />
          ) : hasData ? (
            filteredCharacters.map(character => (
              <CharacterCard 
                key={character.id} 
                character={character} 
              />
            ))
          ) : (
            <h2 
              className="text-black mt-4 font-bold text-xl"
            >
              Nothing found
            </h2>
          )}
        </div>
      </div>
      {hasData && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      )}
    </>
  );
};
