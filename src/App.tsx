import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFound } from './Pages';
import "./App.scss";
import { AddCertificate, Certificates, InfoCard } from './Components';

export default function App() {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <main>
      <BrowserRouter>
        <Certificates isAdd={isAdd} setIsAdd={setIsAdd} />

        {isAdd && (
          <AddCertificate setIsAdd={setIsAdd} />
        )}

        <Routes>
          <Route path="/" >
            <Route path=":certificateId" element={<InfoCard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main >
  );
}
