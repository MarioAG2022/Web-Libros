// Definimos la estructura de los datos esperados (opcional)
export interface Book {
    version?: string;
    author_name?: string[];
    cover_i?: number;
    edition_count?: number;
    first_publish_year?: number;
    key: string;
    editions?: string[];
    editions_language?: string[];
    title: string;
  }
  