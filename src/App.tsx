import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

function App() {
  return (
    // Adicionamos um fundo com gradiente radial sutil para criar um padrão de pontos
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] selection:bg-orange-500 selection:text-white">
      
      <Navbar />
      
      <Hero />
      
    </div>
  )
}

export default App;