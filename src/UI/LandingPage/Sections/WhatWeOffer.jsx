export default function Offer() {
    return (
        <section className="bg-green-50">
            <div className="landingpage-container px-6 py-16">
                <div className="text-center mb-16">
                    <h2 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We bridge the gap between renters and landlords by providing tools that 
                        make renting seamless, transparent, and rewarding for everyone.
                    </p>
                </div>

                <div className="space-y-16 relative">
                    {/* For Renters Section */}
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="md:p-16">
                            <img 
                                src="/images/ForRenters.png" 
                                alt="Renters Dashboard" 
                                className="w-full"
                            />
                        </div>
                        <div className="md:justify-self-center md:mt-0 mt-8">
                            <h3 className="md:text-5xl text-3xl font-bold text-emerald-700 mb-6">For Renters</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Dedicated Dashboard</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Wallet System</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Save Weekly or Monthly</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Earn Through TRC</span>
                                </div>
                            </div>
                            <button className="mt-6 px-6 py-2 border-2 border-teal-600 font-medium text-teal-600 rounded-lg hover:bg-complementary hover:text-white transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* For Landlords Section */}
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="md:justify-self-center order-last md:order-first md:mb-0 mt-8">
                            <h3 className="md:text-5xl text-3xl font-bold text-emerald-700 mb-6">For Landlords</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Property Listing</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">AI insight and properties analyst</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Dashboard to manage properties</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Tenant verification</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-3xl">★</span>
                                    <span className="text-gray-700 text-xl">Escrow</span>
                                </div>
                            </div>
                            <button className="mt-6 px-6 py-2 border-2 font-medium border-teal-600 text-teal-600 rounded-lg hover:bg-complementary hover:text-white transition-colors">
                                Get Started
                            </button>
                        </div>
                        <div className="rounded-2xl md:p-16 md:order-last order-first">
                            <img 
                                src="/images/ForLandlords.png" 
                                alt="Landlords Dashboard" 
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}