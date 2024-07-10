import React from "react";

type EditFormProps = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  onClose: () => void;
  onUpdate: (updatedUser: { id: number; name: string; email: string }) => void;
};

const EditForm: React.FC<EditFormProps> = ({ user, onClose, onUpdate }) => {
  const [updatedName, setUpdatedName] = React.useState(user.name);
  const [updatedEmail, setUpdatedEmail] = React.useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ id: user.id, name: updatedName, email: updatedEmail });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
