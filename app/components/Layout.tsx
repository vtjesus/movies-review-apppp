import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  onAddMovie: () => void;
  onAddReview: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  onAddMovie,
  onAddReview,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-800">MOVIECRITIC</h1>
          <div className="flex justify-end items-center">
            <button
              className="bg-white text-purple-700 px-4 py-2 rounded mr-2 border border-gray-400"
              onClick={onAddMovie}
            >
              Add new movie
            </button>
            <button
              className="bg-purple-700 text-white px-4 py-2 rounded"
              onClick={onAddReview}
            >
              Add new review
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
