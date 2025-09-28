export default function HowItWorks() {
    return (
        <section className="bg-purple-50">
        <section className="landingpage-container py-10 md:py-20 px-4 md:px-0">
            {/* Primary background container */}
            <div className="rounded-[60px] md:rounded-[90px] py-6 md:py-10 bg-primary">
                {/* White content container centered on top */}
                <div className="bg-white rounded-[40px] md:rounded-[80px] py-6 md:py-10 md:mx-0" style={{
                    height: '90%'
                }}>
                    {/* Header */}
                    <div className="text-center mb-10 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg px-4">
                            With Solacely, finding, renting, and even owning property is effortless. Here's how it works
                        </p>
                    </div>

                    {/* Desktop Steps Container */}
                    <div className="hidden md:block relative h-120 mx-auto">
                {/* Step 1 - Register */}
                <div className="absolute top-0 left-0 w-48">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                            1
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">Register</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Create your free Solacely account in minutes and set your rental preferences.
                        </p>
                    </div>
                </div>

                {/* Step 2 - AI Recommendation */}
                <div className="absolute bottom-0 left-1/4 w-48 transform -translate-x-1/2">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                            2
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">AI<br/>Recommendation</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Get personalized apartment suggestions powered by AI, tailored to your budget and lifestyle.
                        </p>
                    </div>
                </div>

                {/* Step 3 - Pick an Apartment */}
                <div className="absolute top-0 left-1/2 w-48 transform -translate-x-1/2">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                            3
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">Pick an Apartment</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Explore verified listings, view photos, and take virtual tours before making a choice.
                        </p>
                    </div>
                </div>

                {/* Step 4 - Pay in Escrow */}
                <div className="absolute bottom-0 right-1/4 w-48 transform translate-x-1/2">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                            4
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">Pay in Escrow</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Secure your rent with escrow-protected payments, ensuring transparency between you and the landlord.
                        </p>
                    </div>
                </div>

                {/* Step 5 - Become a Renter */}
                <div className="absolute top-0 right-0 w-48">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                            5
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 mb-3">Become a Renter</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Sign digitally, move in, and start building credit with the TRC rewards system.
                        </p>
                    </div>
                </div>

                {/* Connecting Arrows */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 480">
                    {/* Arrow 1 to 2 */}
                    <path
                        d="M140 120 Q190 180 190 230"
                        stroke="#10B981"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    {/* Arrow 2 to 3 */}
                    <path
                        d="M270 270 Q420 250 450 190"
                        stroke="#10B981"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    {/* Arrow 3 to 4 */}
                    <path
                        d="M590 120 Q750 190 780 250"
                        stroke="#10B981"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    {/* Arrow 4 to 5 */}
                    <path
                        d="M840 290 Q890 300 940 190"
                        stroke="#10B981"
                        strokeWidth="3"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                    />
                    
                    <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                        </marker>
                    </defs>
                </svg>
                    </div>

                    {/* Mobile Steps Container */}
                    <div className="md:hidden space-y-8">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">Register</h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-4">
                                Create your free Solacely account in minutes and set your rental preferences.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">AI Recommendation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-4">
                                Get personalized apartment suggestions powered by AI, tailored to your budget and lifestyle.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">Pick an Apartment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-4">
                                Explore verified listings, view photos, and take virtual tours before making a choice.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                4
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">Pay in Escrow</h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-4">
                                Secure your rent with escrow-protected payments, ensuring transparency between you and the landlord.
                            </p>
                        </div>

                        {/* Step 5 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                5
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-3">Become a Renter</h3>
                            <p className="text-gray-600 text-sm leading-relaxed px-4">
                                Sign digitally, move in, and start building credit with the TRC rewards system.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </section>
    )
}