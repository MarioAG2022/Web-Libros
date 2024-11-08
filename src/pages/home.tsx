import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Sidebar } from "primereact/sidebar";
import { ProgressSpinner } from "primereact/progressspinner";
import ApiService from "../services/api";
import { Book } from "../types/interfaces";
import banner from "../assets/banner.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const apiService = new ApiService();

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchBy, setSearchBy] = useState<"title" | "author">("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        setCurrentPage(1);
        fetchBooks(1);
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchBy]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchBooks(currentPage);
    }
  }, [currentPage]);
  
  useEffect(() => {
    const img = new Image();
    img.src = banner;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const results =
        searchBy === "title"
          ? await apiService.fetchBooksByTitle(searchTerm, page)
          : await apiService.fetchBooksByAuthor(searchTerm, page);

      setBooks(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const openSidebar = (book: Book) => {
    setSelectedBook(book);
    setIsSidebarVisible(true);
  };

  const header = (
    <div className="flex flex-col md:flex-row w-3/4 md:w-2/4 items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex gap-2">
        <Button
          icon="pi pi-book"
          onClick={() => setSearchBy("title")}
          className={`p-button-rounded ${
            searchBy === "title" ? "p-button-primary" : "p-button-secondary"
          }`}
          aria-label="Buscar por título"
        />
        <Button
          icon="pi pi-user"
          onClick={() => setSearchBy("author")}
          className={`p-button-rounded ${
            searchBy === "author" ? "p-button-primary" : "p-button-secondary"
          }`}
          aria-label="Buscar por autor"
        />
      </div>
      <InputText
        placeholder="Escribe el nombre del libro o autor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-4/5 border-2 border-gray-300 rounded-lg p-2"
      />
    </div>
  );

  const bookTemplate = (book: Book) => {
    const [isCarouselImageLoading, setIsCarouselImageLoading] = useState(true);
    const coverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : null;
    return (
      <div
        className="p-4 flex flex-col items-center bg-white rounded-lg shadow-lg border border-gray-200 cursor-pointer m-2"
        onClick={() => openSidebar(book)}
      >
        {coverUrl ? (
          <>
            {isCarouselImageLoading && (
              <ProgressSpinner style={{ width: "30px", height: "30px" }} /> // Spinner de carga mientras se carga la imagen
            )}
            <img
              src={coverUrl}
              alt={book.title}
              className={`w-24 h-36 object-cover rounded-md mb-2 ${
                isCarouselImageLoading ? "hidden" : "animate-fade-in"
              }`}
              onLoad={() => setIsCarouselImageLoading(false)}
            />
          </>
        ) : (
          <div className="w-24 h-36 bg-gray-200 flex items-center justify-center text-gray-600 rounded-md">
            No disponible
          </div>
        )}
        <h3 className="text-lg font-semibold text-center mt-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500">
          {book.author_name?.join(", ") || "Autor desconocido"}
        </p>
      </div>
    );
  };

  const responsiveOptions = [
    { breakpoint: "1200px", numVisible: 5, numScroll: 5 },
    { breakpoint: "1024px", numVisible: 3, numScroll: 3 },
    { breakpoint: "768px", numVisible: 2, numScroll: 2 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

   //Header del sliderbar
  const customHeader = (
    <div className="flex align-items-center gap-2">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Detalles del Libro</h2>
    </div>
);

  return (
    <div className="">
      <div
      className={`bg-cover bg-center bg-no-repeat h-60 md:h-96 flex items-center justify-center mb-4  transition-opacity duration-1000 ${
        isImageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundImage: `url(${banner})` }} // Usa la imagen importada como fondo
    >
        {header}
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Cargando libros...</p>
      ) : (
        <>
          <Carousel
            value={books}
            itemTemplate={bookTemplate}
            numVisible={5}
            numScroll={5}
            responsiveOptions={responsiveOptions}
            className="mb-6"
          />
          {books.length > 0 && (
            <div className="flex justify-center items-center gap-4 my-4 ">
              <Button
                icon="pi pi-angle-left"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-button-rounded p-button-secondary"
                aria-label="Página anterior"
              />
              <span className="text-lg text-gray-700 font-medium">
                Página {currentPage}
              </span>
              <Button
                icon="pi pi-angle-right"
                onClick={handleNextPage}
                disabled={books.length === 0}
                className="p-button-rounded p-button-secondary"
                aria-label="Página siguiente"
              />
            </div>
          )}
        </>
      )}

<Sidebar
    visible={isSidebarVisible}
    position="right"
    onHide={() => setIsSidebarVisible(false)}
    style={{ width: '30vw' }}
    className="p-sidebar-lg"
    header={customHeader}
>
    {selectedBook && (
        <div className="p-6 flex flex-col items-center space-y-4 bg-gray-50 rounded-lg shadow-2xl">
            {/* Imagen de Portada */}
            <LazyLoadImage
                src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
                alt={selectedBook.title}
                className="w-40 h-56 object-cover rounded-md shadow-md mb-4 animate-fade-in"
                effect="opacity"
            />

            {/* Título */}
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-2">{selectedBook.title}</h3>

            {/* Autor */}
            <div className="text-center mb-2">
                <p className="text-lg font-semibold text-gray-600">Autor:</p>
                <p className="text-md text-gray-700">{selectedBook.author_name?.join(', ') || 'Desconocido'}</p>
            </div>

            {/* Año de Publicación */}
            {selectedBook.first_publish_year && (
                <div className="text-center mb-2">
                    <p className="text-lg font-semibold text-gray-600">Año de Publicación:</p>
                    <p className="text-md text-gray-700">{selectedBook.first_publish_year}</p>
                </div>
            )}

            {/* Número de Ediciones */}
            <div className="text-center mb-2">
                <p className="text-lg font-semibold text-gray-600">Número de Ediciones:</p>
                <p className="text-md text-gray-700">{selectedBook.edition_count || 'N/A'}</p>
            </div>

            {/* Idiomas */}
            {selectedBook.editions && selectedBook.editions.docs.length > 0 && (
                <div className="text-center mb-2">
                    <p className="text-lg font-semibold text-gray-600">Idiomas Disponibles:</p>
                    <p className="text-md text-gray-700">
                        {selectedBook.editions.docs.map(doc => doc.language?.join(', ')).join(', ') || 'N/A'}
                    </p>
                </div>
            )}

            {/* Separador */}
            <hr className="w-full border-gray-300 my-4" />

            {/* Información adicional */}
            <div className="text-center text-sm text-gray-500">
                <p>
                    Más detalles y ediciones de <span className="font-semibold">{selectedBook.title}</span> pueden estar
                    disponibles en el sitio de Open Library.
                </p>
            </div>
        </div>
    )}
</Sidebar>
    </div>
  );
}
