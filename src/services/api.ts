// services/apiService.ts
import axios from 'axios';
import { Book } from '../types/interfaces';

// URL base para todas las solicitudes
const BASE_URL = 'https://openlibrary.org/search.json?';


export default class ApiService {
  // Método para obtener libros por título
  async fetchBooksByTitle(query: string, page: number ): Promise<Book[]> {
    const url = `${BASE_URL}q=${encodeURIComponent(query)}&fields=version,author_name,cover_i,edition_count,first_publish_year,key,editions,editions.language,title&limit=15&page=${page}`;
    
    try {
      const response = await axios.get(url);
      return response.data.docs as Book[];
    } catch (error) {
      throw new Error('Error al obtener libros por título');
    }
  }

  // Método para obtener libros por autor
  async fetchBooksByAuthor(query: string, page: number ): Promise<Book[]> {
    const url = `${BASE_URL}author=${encodeURIComponent(query)}&q&sort=new&fields=version,author_name,cover_i,first_publish_year,key,title&limit=15&page=${page}`;
    
    try {
      const response = await axios.get(url);
      return response.data.docs as Book[];
    } catch (error) {
      throw new Error('Error al obtener libros por autor');
    }
  }
}
