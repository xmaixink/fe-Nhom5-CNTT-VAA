import React from "react";
import Footer from "../../components/Footer";
import MainSection from "../../components/MainSection";
import Navbar from "../../components/Navbar";
import "../../css/App.css";

function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <MainSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
