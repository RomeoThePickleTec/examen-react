import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrevDescription from "./components/PrevDescription";
import CardInfo from "./components/CardInfo";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    description: '',
    prescription: '',
    userd_id: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const { id } = useParams();

  const fetchDescription = async () => {
    const response = await fetch('http://localhost:3000/description/' + id);
    const data = await response.json();
    setDescriptions(data);
    return data;
  };

  const fetchUserById = async () => {
    const response = await fetch('http://localhost:3000/users/' + id);
    const data = await response.json();
    setUser(data[0]);
    return data[0];
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (res.status === 200) {
        alert('Registro exitoso');
      } else {
        alert('Error al registrar');
      }
    } catch (error) {
      alert('Error al registrar');
      throw new Error('Error al registrar');
    }
  };

  const handleGenerateHelp = async () => {
    const prompt = {
      prompt: form.description,
    };
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });
      const data = await response.json();
      setForm({ ...form, prescription: data.response });
      handleSubmitForm(form);
      console.log(form);
      return data;
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserById();
    fetchDescription();
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-6xl space-y-4">
        <div className="flex flex-row space-x-4">
          <CardInfo user={user} />
          <div className="flex flex-col w-full">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800">Descripciones Previas</h2>
              <div className="max-w-full overflow-x-auto">
                <PrevDescription descriptions={descriptions} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-lg text-gray-800" htmlFor="description">Descripción</label>
            <textarea
              className="p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              id="description"
              value={form.description}
              name="description"
              onChange={handleInputChange}
              rows="4"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-bold text-lg text-gray-800" htmlFor="prescription">Prescripción</label>
            <textarea
              className="p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
              id="prescription"
              value={form.prescription}
              name="prescription"
              onChange={handleInputChange}
              rows="4"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              className={`h-12 w-44 bg-gray-800 text-white font-bold text-center rounded-md ${isLoading ? 'cursor-not-allowed' : 'hover:bg-gray-700'} transition`}
              disabled={isLoading}
              onClick={handleGenerateHelp}
            >
              {isLoading ? 'Cargando...' : 'Generar Ejercicio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
