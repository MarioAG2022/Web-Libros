import React from 'react';
import { useLocation } from 'react-router-dom';
import { Book } from '../types/interfaces';


export default function BookDetails  () {
  const location = useLocation();
  const { book } = location.state as { book: Book };

  if (!book) {
    return <p>No se han proporcionado detalles del libro.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">Autor: {book.author_name?.join(', ') || 'Desconocido'}</p>
      <p className="text-lg mb-2">Año de Publicación: {book.first_publish_year || 'Desconocido'}</p>
      {/* Más detalles según disponibilidad */}
    </div>
  );
};
