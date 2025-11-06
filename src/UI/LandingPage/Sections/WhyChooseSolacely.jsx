import React from 'react';

const WhyChooseSolacely = () => {
  const features = [
    {
      image: "/icons/Card.svg",
      title: "Flexible Rent Payments",
      description: "Pay in smaller, manageable installments with escrow-protected payments."
    },
    {
      image: "/icons/House.svg",
      title: "Verified Rentals",
      description: "Browse only trusted listings with virtual tours, so you can focus on finding the right home"
    },
    {
      image: "/icons/PurpleTrophy.svg",
      title: "Earn While You Rent",
      description: "Build credit towards your next rent with the TRC reward credit system, helping you save while you live comfortably"
    },
    {
      image: "/icons/RentalProperty.svg",
      title: "Own properties",
      description: "Fractional property investment as low as $10, without needing huge capital upfront"
    }
  ];

  return (
    <section className="pt-12 px-4 bg-white py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          Why Choose <br />Solacely?
        </h2>
        <p className="text-gray-600 mb-12">
          Transparent. Secure. Effortless.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-400 rounded-2xl p-6 relative"
              style={{
                boxShadow: '8px 8px 0px 0px #086100ff'
              }}
            >
              {/* image */}
              <div className="text-4xl mb-4 flex justify-start">
                <span className="p-3">
                  <img src={feature.image} alt={feature.title} className="w-7 h-6" />
                </span>
              </div>
              
              {/* Content */}
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSolacely;