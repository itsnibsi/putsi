import { addictionTypes } from '../data/addictionTypes';
import { useForm } from 'react-hook-form';
import { addAddiction, editAddiction } from '../stores/addictions';
import { Addiction } from '../types';

type AddictionFormFields = {
  typeId: string;
  quitDate: string;
  weeklyCost: string;
};

type AddictionFormProps = {
  addiction?: Addiction;
  onHandleCancel?: () => void;
  onHandleSubmit?: (addiction: Addiction) => void;
};

function AddictionForm({ addiction, onHandleCancel, onHandleSubmit }: AddictionFormProps) {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<AddictionFormFields>();

  const onSubmit = (data: AddictionFormFields) => {
    const { typeId, quitDate, weeklyCost } = data;

    if (addiction) {
      const updatePayload = { typeId, quitDate, weeklyCost: parseFloat(weeklyCost) }
      editAddiction(addiction.id, updatePayload);
      onHandleSubmit?.({ ...addiction, ...updatePayload });
    }
    else {
      const newAddiction = { id: Date.now().toString(), typeId, quitDate, weeklyCost: parseFloat(weeklyCost) }
      addAddiction(newAddiction);
      onHandleSubmit?.(newAddiction);
    }

    reset();
  };

  const onCancel = () => {
    onHandleCancel?.();
    reset();
  };

  const initialValues = {
    typeId: addiction?.typeId,
    quitDate: addiction?.quitDate,
    weeklyCost: addiction?.weeklyCost.toString(),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Add New Addiction</h2>
      <div className="dark:text-gray-300">
        <label htmlFor="typeId" className="block mb-1">Addiction Type:</label>
        <select
          id="typeId"
          {...register("typeId", { required: true })}
          className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:text-gray-700"
          defaultValue={initialValues.typeId}
        >
          {addictionTypes.map(type => (
            <option key={type.id} value={type.id} className="dark:text-gray-300">{type.name}</option>
          ))}
        </select>
        {errors.typeId && <p className="text-red-500">This field is required</p>}
      </div>
      <div className="dark:text-gray-300">
        <label htmlFor="quitDate" className="block mb-1">Quit Date and Time:</label>
        <input
          type="datetime-local"
          id="quitDate"
          {...register("quitDate", { required: true })}
          className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:text-gray-700"
          defaultValue={initialValues.quitDate}
        />
        {errors.quitDate && <p className="text-red-500">This field is required</p>}
      </div>
      <div className="dark:text-gray-300">
        <label htmlFor="weeklyCost" className="block mb-1">Weekly Cost ($):</label>
        <input
          type="number"
          id="weeklyCost"
          {...register("weeklyCost", { required: false })}
          className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:text-gray-700"
          defaultValue={initialValues.weeklyCost}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md dark:bg-blue-700">Add</button>
        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md dark:bg-red-700" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default AddictionForm