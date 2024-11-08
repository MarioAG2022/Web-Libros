// types/interfaces.ts

export interface EditionDoc {
    language?: string[];
}

export interface Editions {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: EditionDoc[];
}

export interface Book {
    author_name?: string[];
    cover_i?: number;
    edition_count?: number;
    first_publish_year?: number;
    key: string;
    title: string;
    editions?: Editions; // Aseguramos que editions es un objeto con la estructura correcta
}