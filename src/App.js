
import './App.css';
import BackToTop from './Component/BacktoTop';
import Footer from './Component/Footer';
import Navbar from './Component/Navbar';
import MainRoutes from './Routes/MainRoutes';

function App() {
  return (
    <div className="App">

<Navbar />
      <MainRoutes />
      <BackToTop/>
      <Footer />
    </div>
  );
}

export default App;
