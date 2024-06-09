import { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    matricula: 'not specified',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/users', {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Registro</h2>
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <input
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
          />
          <input
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
          />
          <input
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            type="text"
            name="age"
            placeholder="Edad"
            onChange={handleChange}
          />
          <select
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="" disabled>Seleccione Género</option>
            <option value="Male">Hombre</option>
            <option value="Female">Mujer</option>
          </select>
          <input
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            type="text"
            name="address"
            placeholder="Dirección"
            onChange={handleChange}
          />
          <input
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-200"
            type="text"
            name="matricula"
            placeholder="Matrícula"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full h-10 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
