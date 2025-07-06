import React, { useState } from 'react';

const ShishaFilters = ({ filters, setFilters }) => {
  const [dropDownFlavor, setDropDownFlavor] = useState(true);
  const [dropDownSize, setDropDownSize] = useState(true);

  const selectedFlavor = filters.flavor || "";
  const selectedSize = filters.size || "";

  return (
    <div className="queries mt-3 flex flex-col mx-auto w-fit md:w-full h-fit bg-primary text-tertiary text-start">
      <div className="ml-4 mt-4 cursor-pointer text-center text-4xl font-bold text-secondary">Filter</div>

      <div className="ml-4">
        <span className="cursor-pointer" onClick={() => setDropDownFlavor(!dropDownFlavor)}>
          Color
          <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownFlavor ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </span>
        <ul
          className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownFlavor ? 'max-h-40' : 'max-h-0'}`}
        >
          {['', 'black', 'red', 'green', 'blue'].map((flavor) => (
            <li
              key={flavor || 'all'}
              className={`pl-2 cursor-pointer ${selectedFlavor === flavor ? 'text-secondary' : ''}`}
              onClick={() => setFilters((prev) => ({ ...prev, flavor }))}
            >
              {flavor ? flavor.charAt(0).toUpperCase() + flavor.slice(1) : 'All Flavors'}
            </li>
          ))}
        </ul>
      </div>

      <div className="ml-4 pb-10">
        <span className="cursor-pointer" onClick={() => setDropDownSize(!dropDownSize)}>
          Size
          <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownSize ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </span>
        <ul
          className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownSize ? 'max-h-40' : 'max-h-0'}`}
        >
          {['', 'small', 'medium', 'large'].map((size) => (
            <li
              key={size || 'all'}
              className={`pl-2 cursor-pointer ${selectedSize === size ? 'text-secondary' : ''}`}
              onClick={() => setFilters((prev) => ({ ...prev, size }))}
            >
              {size
                ? `${size.charAt(0).toUpperCase() + size.slice(1)} (${size === 'small' ? '50g' : size === 'medium' ? '250g' : '1000g'})`
                : 'All Sizes'}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="mb-3 bg-secondary text-tertiary hover:opacity-90 active:opacity-85 w-3/6 m-auto rounded-md font-medium"
        onClick={() => setFilters({})}
      >
        Reset
      </button>
    </div>
  );
};

export default ShishaFilters;
