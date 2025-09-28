"use client"
export default function ContactForm() {
    return (
        <section className="bg-primary py-16 px-4">
            <div className="landingpage-container mx-auto flex flex-col md:flex-row gap-8 items-center">
                {/* Contact Form */}
                <div className="bg-white rounded-2xl p-8 w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us A Message</h2>
                    <form className="space-y-4">
                        <div className="flex gap-4 md:flex-row flex-col">
                            <input
                                type="text"
                                placeholder="Your Name*"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email*"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <textarea
                            placeholder="Your Message*"
                            rows="6"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full md:w-fit px-8 justify-end bg-complementary hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Property Images */}
                <div className="hidden md:block w-full md:w-1/2 flex flex-col gap-4 rounded-2xl ">
                    <div className="rounded-2xl overflow-hidden">
                        <img
                            src="/images/apartmentOne.png"
                            alt="Modern living room interior"
                            className="w-full h-48 object-cover rounded-2xl"
                        />
                    </div>
                    <div className="rounded-2xl overflow-hidden">
                        <img
                            src="/images/apartmentTwo.png"
                            alt="Modern house exterior"
                            className="w-full h-48 object-cover rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}