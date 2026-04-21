import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './app/home/page'
import PracticePage from './app/practice/page'
import AnalyticsPage from './app/analytics/page'
import AssessmentPage from './app/assessment/page'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
