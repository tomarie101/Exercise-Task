import React from "react";

function Home() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center flex-grow p-8"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/22678942/pexels-photo-22678942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
      }}
    >
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg">Explore and enjoy!</p>
      </div>
    </div>
  );
}

export default Home;
