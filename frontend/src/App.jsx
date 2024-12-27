import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ListingPage } from './Pages/ListingPage'
import { VideoPage } from './Pages/VideoPage'
import UploadPage from './Pages/UploadPage'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
