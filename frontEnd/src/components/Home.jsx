import React from "react";
import cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  if (!cookie.get("jwtToken")) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <section>
      <Header />
      <div className="bg-blue-500 text-white py-20 min-h-[90vh]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to MyWebsite
          </h1>
          <p className="text-xl mb-8">
            We provide awesome services to help you succeed.
          </p>
          <a
            href="#"
            className="bg-white text-blue-500 px-6 py-3 rounded font-semibold hover:bg-gray-100"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
