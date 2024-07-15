import DarkModeToggle from './DarkModeToggle';

const Settings: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div>
        <label className="block mb-1">Dark Mode:</label>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Settings;