import Banner from "./components/banner";
import Fearture from "./components/feature";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="p-4">
      <div>
        <Header />
      </div>  

      <div>
        <Banner/>
      </div>

      <div>
        <Fearture/>
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  );
}
