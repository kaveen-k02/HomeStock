import React from 'react';



const Dashboard = () => {
  return (
    <div className="bg-primary min-h-screen w-full flex flex-col font-sans px-4 md:px-6 lg:px-10">
      
    

      {/* Dashboard Content */}
      <section className="flex flex-col items-center text-center w-full px-6 mt-6">
        <h2 className="text-4xl font-extrabold leading-tight w-full">Welcome to Your Dashboard!</h2>
        <p className="text-xl text-background mt-3 w-full max-w-4xl">
          Manage your inventory, shopping list, and feedback all in one place.
        </p>
      </section>
      
      {/* Rest of your dashboard content */}
    </div>
  );
};

export default Dashboard;

