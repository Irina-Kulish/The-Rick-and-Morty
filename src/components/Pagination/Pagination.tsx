import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  goToNextPage, 
  goToPreviousPage 
}) => {
  return (
    <div 
      className="footer text-black flex justify-end items-center mb-4"
    >
      <div className="flex items-center ">
        <label>Page: {currentPage} of {totalPages}</label>
      </div>
      <button 
        onClick={goToPreviousPage} 
        disabled={currentPage === 1}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          id="arrow-circle-down" 
          viewBox="0 0 24 24" 
          width="30" 
          height="30"
        >
          <path 
            d="M0,12A12,12,0,1,1,12,24,12.013,12.013,0,0,1,0,12Zm22,0A10,10,0,1,0,12,22,10.011,10.011,0,0,0,22,12ZM8.586,13.414,13.3,18.126l1.414-1.414L10,12l4.673-4.673L13.259,5.913,8.586,10.586a2,2,0,0,0,0,2.828Z"
          />
        </svg>
      </button>
      <button 
        onClick={goToNextPage} 
        disabled={currentPage === totalPages} 
        className='mr-4'
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          id="arrow-circle" 
          viewBox="0 0 24 24" 
          width="30" 
          height="30"
        >
          <path 
            d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm22,0A10,10,0,1,1,12,2,10.011,10.011,0,0,1,22,12Z"
          />
          <path 
            d="M16,12a2.993,2.993,0,0,1-.752,1.987c-.291.327-.574.637-.777.84L11.647,17.7a1,1,0,1,1-1.426-1.4L13.05,13.42c.187-.188.441-.468.7-.759a1,1,0,0,0,0-1.323c-.258-.29-.512-.57-.693-.752L10.221,7.7a1,1,0,1,1,1.426-1.4l2.829,2.879c.2.2.48.507.769.833A2.99,2.99,0,0,1,16,12Z"
          />
        </svg>
      </button>
    </div>
  );
};
