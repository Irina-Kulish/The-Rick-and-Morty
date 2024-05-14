import React, { useState } from 'react';
import { FilterParams } from '../../interface/filterParams';

type FiltersProps = {
  onChange: (filters: FilterParams) => void;
  getReset: () => void;
  genders: string[];
}

export const Filters: React.FC<FiltersProps> = ({ onChange, getReset, genders }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
    onChange({ name: e.target.value, gender: genderFilter, status: statusFilter });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(e.target.value);
    onChange({ name: nameFilter, gender: e.target.value, status: statusFilter });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    onChange({ name: nameFilter, gender: genderFilter, status: e.target.value });
  };

  const handleReset = () => {
    setNameFilter('');
    setGenderFilter('');
    setStatusFilter('');
    getReset();
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search by name...'
        value={nameFilter}
        onChange={handleInputChange}
        className="mb-4 bg-white w-full h-12 border-2 p-3 text-black"
      />
      <select
        className="mb-4 bg-white border-2 w-full p-3 text-black"
        value={genderFilter}
        onChange={handleGenderChange}
      >
        <option 
					value="All"
				>
					All Gender
				</option>
        {genders.map(gender => (
          <option 
						key={gender} 
						value={gender}
					>
						{gender}
					</option>
        ))}
      </select>
      <select
        className="mb-4 bg-white border-2 w-full p-3 text-black"
        value={statusFilter}
        onChange={handleStatusChange}
      >
        <option 
					value=""
				>
					All Statuses
				</option>
        <option 
					value="Alive"
				>
					Alive
				</option>
        <option 
					value="Dead"
				>
					Dead
				</option>
        <option 
					value="Unknown"
				>
					Unknown
				</option>
      </select>
      <button 
        className="border-2 w-full mt-4 h-12 text-black" 
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
