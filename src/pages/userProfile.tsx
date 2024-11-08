import  { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';


interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  age: number;
  gender: string;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4">
      {userData ? (
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          {/* Banner con Avatar y descripción */}
          <div className="flex flex-col items-center p-8 bg-gray-200 rounded-t-lg w-full">
            <Avatar
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
              className="bg-gray-300 text-gray-700"
              style={{ width: '120px', height: '120px' }} // Tamaño personalizado del avatar
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-gray-600 text-center text-justify mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
            </p>
          </div>

          {/* Información detallada del usuario */}
          <div className="p-8 space-y-2">
            <p className="text-gray-600"><strong>Teléfono:</strong> {userData.phone}</p>
            <p className="text-gray-600"><strong>Correo Electrónico:</strong> {userData.email}</p>
            <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {userData.birthDate}</p>
            <p className="text-gray-600"><strong>Edad:</strong> {userData.age} años</p>
            <p className="text-gray-600"><strong>Género:</strong> {userData.gender}</p>
          </div>

         
        </div>
      ) : (
        <p className="text-center text-gray-600">No se encontró información del usuario.</p>
      )}
    </div>
  );
}
