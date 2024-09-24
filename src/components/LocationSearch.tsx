import { Fragment, useState } from 'react';
import { Place } from '../api/Place';
import { search } from '../api/search';

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState<string>('');
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = await search(term);
    setPlaces(results);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className='font-bold' htmlFor='term'>
          Search
        </label>
        <input
          type='text'
          id='term'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className='border boder-gray-300 w-full px-4 py-2 rounded-md shadow-sm focus:border-indigo-400'
        />
      </form>

      <h1 className='mt-6 font-bold'>Found Locations</h1>
      <div className='grid grid-cols-[1fr_40px] gap-2 mt-2 items-center'>
        {places.map((place) => {
          return (
            <Fragment key={place.id}>
              <p className='text-sm'>{place.name}</p>
              <button
                className='bg-blue-500 text-xs text-white font-bold p-1 rounded'
                onClick={() => onPlaceClick(place)}
              >
                Go
              </button>
              <div className='border-b w-full col-span-2' />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
