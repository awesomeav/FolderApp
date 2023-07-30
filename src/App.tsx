import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import useTravseTree from './hooks/use-traverse-tree';
import explorer from './data/folderData';
import { useState } from 'react';
import FolderComponent from './components/folder';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

function App() {
  const [folderData, setFolderData] = useState(explorer);

  const { insertNode } = useTravseTree();
  const handleInsertNode = (folderId: any, item: any, isFolder: any) => {
    const finalTree = insertNode(folderData, folderId, item, isFolder);
    console.log('finalTree :', finalTree);

    setFolderData(finalTree);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/folderApp"
              element={
                <FolderComponent
                  handleInsertNode={handleInsertNode}
                  folderData={folderData}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
