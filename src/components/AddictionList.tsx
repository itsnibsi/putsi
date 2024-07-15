import React from 'react';
import { useAddictionContext } from '../contexts/AddictionContext';
import AddictionItem from './AddictionItem';

const AddictionList: React.FC = () => {
  const { addictions } = useAddictionContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Addictions</h2>
      {addictions.length === 0 ? (
        <p>You haven't added any addictions yet. Start by adding one!</p>
      ) : (
        <ul className="space-y-2">
          {addictions.map((addiction) => (
            <li key={addiction.id}>
              <AddictionItem addiction={addiction} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddictionList;