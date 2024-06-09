import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    const dat = JSON.parse(data);
    setUsers(dat);
    setFilteredUsers(dat);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="bg-gray-800 rounded-xl text-white text-3xl font-semibold p-4">
          <div className="flex justify-center">
            Lista de Usuarios
          </div>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          className="p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 w-64"
        />
      </div>
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={() => navigate('/register')}
          className="bg-gray-800 text-white font-bold text-center rounded-md h-12 w-44 hover:bg-gray-700 transition"
        >
          Registrar Usuario
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredUsers?.map((user) => (
          <div key={user.id} className="p-4">
            <Card user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
