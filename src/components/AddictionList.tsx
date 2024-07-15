import React from 'react';
import AddictionItem from './AddictionItem';
import { useAddictionsStore } from '../stores/addictions';

const AddictionList: React.FC = () => {
  const { addictions } = useAddictionsStore();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Addictions</h2>
      {addictions.length === 0 ? (
        <p>You haven't added any addictions yet. Start by adding one!</p>
      ) : (
        <ul className="space-y-4">
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