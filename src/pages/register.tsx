import  { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Guardar en localStorage
    const userData = { username, email, password };
    localStorage.setItem('user', JSON.stringify(userData));

    // Mostrar mensaje de éxito
    setSuccess(true);

    // Limpiar campos después del registro
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Registro de Usuario</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-600">Nombre de Usuario</label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Ingrese su nombre de usuario"
            />
          </div>

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

          <div>
            <label htmlFor="password" className="block text-gray-600">Contraseña</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Ingrese su contraseña"
              feedback={false}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-600">Confirmar Contraseña</label>
            <Password
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
              className="w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Confirme su contraseña"
              feedback={false}
            />
          </div>

          {error && (
            <Message severity="error" text={error} className="w-full mt-2" />
          )}
          {success && (
            <Message severity="success" text="¡Registro exitoso!" className="w-full mt-2" />
          )}
        </div>

        <Button
          label="Registrar"
          className="w-full p-button p-button-primary mt-4"
          onClick={handleRegister}
          disabled={!username || !email || !password || !confirmPassword}
        />
      </div>
    </div>
  );
}
