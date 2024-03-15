import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { HomePage, NotFound } from './Pages';
import "./App.scss";
import { Certificates } from './components/Certificates/Certificates';
import { AddCertificate } from './components/AddCertificate/AddCertificate';
import { InfoCard } from './components/InfoCard/InfoCard';

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
            <Route index element={<HomePage />} />
            <Route path=":certificateId" element={<InfoCard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main >
  );
}
