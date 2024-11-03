import { FC, useState } from "react";
import { TitleObjType } from "../../vite-env";
import { formatDate } from "../../utils";

const ITEMS_PER_PAGE = 9;

export const TitleList: FC<{ titles: TitleObjType[] }> = ({ titles }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(titles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTitles = titles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-7">
        {currentTitles.length &&
          currentTitles.map((title: TitleObjType) => (
            <div
              className="py-5 px-3 border-t-2 border-l-2 shadow-md rounded-2xl border-[#A594F9] flex items-center justify-between"
              key={title.uuid}
            >
              <div>
                <p className="text-gray-700">{title.title}</p>{" "}
                <span className="pbody-12">{formatDate(title.createdAt)}</span>
              </div>
              <span>...</span>
            </div>
          ))}
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded-lg"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded-lg ${
              currentPage === index + 1 ? "bg-gp-purple-500 text-white" : ""
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border rounded-lg"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};


export const LoadingTitleList = <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{
    new Array(9).fill(0).map((_, index) => <div
    className="py-10 px-3 bg-gray-50 shadow-md rounded-2xl animate-pulse"
    key={index+1}
  ></div>)
    }</div>
