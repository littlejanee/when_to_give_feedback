import createStore from 'polotno/model/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/admin'
import { DesignFeedbackPage } from './pages/designFeedback'
import { FallbackPage } from './pages/fallback'
import { IntroductionPage } from './pages/introduction'
import { WizardPage } from './pages/wizard'
import '@blueprintjs/core/lib/css/blueprint.css'

export const store = createStore({ key: 'apiKey', showCredit: false })
window.store = store

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="/design-feedback" element={<DesignFeedbackPage />} />
        <Route path="/:condition" element={<IntroductionPage />} />
        <Route path="/" element={<DesignFeedbackPage />} />
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
