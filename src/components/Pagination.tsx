import { useState } from "react";
import Button from "./Button";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination(props: Props) {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    props.onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <Button
            disabled={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <ul className="flex flex-row md:gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </Button>
        {renderPageNumbers()}
        <Button
          disabled={currentPage === props.totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próximo
        </Button>
      </ul>
      <p className="drac-text">
        Página {currentPage} de {props.totalPages}
      </p>
    </div>
  );
}

export default Pagination;
