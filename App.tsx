
import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import VisualizerPage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Visualizer);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Visualizer:
        return <VisualizerPage />;
      case Page.ContactMe:
        return <ContactPage />;
      default:
        return <VisualizerPage />;
    }
  };

  return (
    <div className="min-h-screen text-gray-900 p-4 sm:p-6 md:p-8 animate-fadeIn">
      <div className="bg-[#eeeeee] border-2 border-black p-2 shadow-[8px_8px_0px_#000000] min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] flex flex-col">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow p-4 sm:p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;