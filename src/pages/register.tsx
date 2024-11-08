import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Otro', value: 'Otro' },
  ];

  const handleSave = () => {
    setError('');
    setSuccess(false);

    if (!validateEmail(email)) {
      setError('Ingrese un correo electrónico válido');
      return;
    }

    const userData = { firstName, lastName, phone, email, birthDate, age, gender };
    localStorage.setItem('user', JSON.stringify(userData));

    setSuccess(true);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setBirthDate(null);
    setAge(null);
    setGender(null);
  };

  const validateFirstName = (name: string) => /^[a-zA-Z\s]*$/.test(name);
  const validateLastName = (name: string) => /^[a-zA-Z\s]*$/.test(name);
  const validatePhone = (number: string) => /^[0-9]{0,10}$/.test(number);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const calculateAge = (birthDate: Date | null) => {
    if (birthDate) {
      const ageDiff = new Date().getFullYear() - birthDate.getFullYear();
      setAge(ageDiff);
    }
  };

  return (
    <div className="flex justify-center items-center pt-10 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Registro de Usuario</h2>
        
        <div className="space-y-4">
          {/* Nombres */}
          <div>
            <label htmlFor="firstName" className="block text-gray-600">Nombres</label>
            <InputText
              id="firstName"
              value={firstName}
              onChange={(e) => validateFirstName(e.target.value) && setFirstName(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Ingrese su nombre"
            />
          </div>

          {/* Apellidos */}
          <div>
            <label htmlFor="lastName" className="block text-gray-600">Apellidos</label>
            <InputText
              id="lastName"
              value={lastName}
              onChange={(e) => validateLastName(e.target.value) && setLastName(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Ingrese su apellido"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-gray-600">Teléfono</label>
            <InputText
              id="phone"
              value={phone}
              onChange={(e) => validatePhone(e.target.value) && setPhone(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Ingrese su teléfono"
              maxLength={10}
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label htmlFor="email" className="block text-gray-600">Correo Electrónico</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Ingrese su correo electrónico"
            />
          </div>

          {/* Fecha de Nacimiento y Edad */}
          <div>
            <label htmlFor="birthDate" className="block text-gray-600">Fecha de Nacimiento</label>
            <Calendar
              id="birthDate"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.value as Date);
                calculateAge(e.value as Date);
              }}
              className="w-full "
              placeholder="Seleccione su fecha de nacimiento"
              showIcon
              dateFormat="dd/mm/yy"
            />
            {age !== null && (
              <p className="text-gray-700 mt-2">Edad: {age} años</p>
            )}
          </div>

          {/* Género */}
          <div>
            <label htmlFor="gender" className="block text-gray-600">Género</label>
            <Dropdown
              id="gender"
              value={gender}
              options={genderOptions}
              onChange={(e) => setGender(e.value)}
              placeholder="Seleccione su género"
              className="w-full border-2 border-gray-300 rounded-lg "
            />
          </div>

          {error && (
            <Message severity="error" text={error} className="w-full mt-2" />
          )}
          {success && (
            <Message severity="success" text="¡Datos guardados exitosamente!" className="w-full mt-2" />
          )}
        </div>

        {/* Botón Guardar */}
        <Button
          label="Guardar"
          className="w-full p-button p-button-primary mt-4"
          onClick={handleSave}
          disabled={!firstName || !lastName || !phone || !email || !birthDate || !gender}
        />
      </div>
    </div>
  );
}
