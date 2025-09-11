import { FiChevronLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/UI/Components/Nav";



 export default function EstateAgreementPage() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
        <div className="aboutpage-container px-4 mt-20 w-full">
            <a href="/tenancyagreement">
                <button className="flex items-center text-gray-500 text-sm md:mt-10 mt-3 mb-8 pl-2">
                    <FiChevronLeft className="mr-1 w-4 h-4" /> Go Back
                </button>
            </a>
            <div className="hidden md:block">
                <h1 className="text-3xl font-bold text-black mb-4">
                    Rent Apartment
                </h1>
            </div>
                <p className="hidden md:block text-gray-500 mb-8">
                    Welcome Ben, complete your registration by filling<br /> in the following details.
                </p>
            <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm py-8 pr-8 w-full h-fit md:w-80 mb-6 md:mb-0">
              <ul className="py-4 space-y-6">
                  <li className="flex items-center justify-between" >
                  <a href="/personalinformation">
                    <span className="font-semibold text-black pl-6">Personal Information</span>
                  </a>
                  <FaCheckCircle className="text-complementary text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                    <a href="/tenancyagreement">
                      <span className="font-semibold text-black pl-6">Tenancy Agreement</span>
                    </a>
                    <FaCheckCircle className="text-complementary text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                      <span className="font-semibold text-black border-l-4 border-complementary pl-6 py-2">Estate Agreement</span>
                      <FaCheckCircle className="text-complementary/20 text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Mail Confirmation</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Payment Review</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                </ul>
            </div>

            {/* Main Form Card */}
            <div className="bg-white md:rounded-xl md:shadow-sm md:p-8 px-3 flex-1 min-w-[320px]">
                <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">Estate Agreement</span>  
                </div>
                <p className="text-gray-400 text-sm mb-8">Go through the agreements carefully before signing it.</p>
                <div className="bg-gray-200 p-6 rounded-lg mb-6 max-h-96 overflow-y-auto">
                    <h2 className="text-xl font-bold text-black mb-4">Solacely Estate Agreement</h2>
                    <p className="text-sm text-gray-600 mb-4 italic">Please read carefully before signing.</p>
                    <p className="text-gray-700 mb-4 text-sm">This agreement defines the responsibilities and expectations for residents living within a Solacely-managed estate.</p>
                    
                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">1. Residency and Use</h3>
                            <p className="text-gray-700 text-sm">The property must be used strictly for residential purposes. Commercial use or subletting within the estate is not allowed without written approval.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">2. Estate Dues and Payments</h3>
                            <p className="text-gray-700 text-sm">Residents must pay all estate dues (security, waste, maintenance) as scheduled. Failure to comply may lead to restricted access to estate services.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">3. Security and Access Control</h3>
                            <p className="text-gray-700 text-sm">All visitors must be properly logged at the gate.</p>
                            <p className="text-gray-700 text-sm">Residents must not bypass security protocols.</p>
                            <p className="text-gray-700 text-sm">Use of unauthorized access routes is strictly prohibited.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">4. Infrastructure and Utilities</h3>
                            <p className="text-gray-700 text-sm mb-2">Solacely maintains estate roads, drainage, lighting, and common areas.</p>
                            <p className="text-gray-700 text-sm mb-2">Residents must report damages or faults promptly.</p>
                            <p className="text-gray-700 text-sm">Tampering with shared infrastructure is not allowed.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">5. Conduct and Community Rules</h3>
                            <p className="text-gray-700 text-sm mb-2">No excessive noise, loitering, or nuisance behavior.</p>
                            <p className="text-gray-700 text-sm mb-2">Respect shared spaces and other residents.</p>
                            <p className="text-gray-700 text-sm">Pets must be registered and kept under control.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">6. Building Guidelines</h3>
                            <p className="text-gray-700 text-sm mb-2">Any construction or structural modification requires estate approval.</p>
                            <p className="text-gray-700 text-sm">Dumping of construction materials in common areas is prohibited.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">7. Waste and Sanitation</h3>
                            <p className="text-gray-700 text-sm mb-2">Waste must be disposed of in designated areas.</p>
                            <p className="text-gray-700 text-sm">Burning of refuse is not allowed.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">8. Enforcement and Penalties</h3>
                            <p className="text-gray-700 text-sm">Violations of estate rules may lead to fines, restricted access, or eviction, depending on the severity.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">9. Termination of Residency</h3>
                            <p className="text-gray-700 text-sm">Solacely reserves the right to terminate the residency of any individual who repeatedly violates estate policies.</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-700 mt-6 text-sm font-medium">By signing this agreement, the resident agrees to comply with all estate rules and Solacely's management terms.</p>
                </div>

                <h3 className="text-lg font-semibold text-black mb-1 text-base">Signature</h3>
                <p className="text-gray-400 mb-4 text-sm">
                    Your <span className="text-black italic font-medium">full name</span> will be used to sign this Estate agreement.
                </p>
                <div className="flex items-center gap-2 align-center mb-6">           
                    <label className="text-gray-700 mb-4 text-sm font-medium"></label>
                    Same as Personal Information
                    <input type="checkbox" className="w-4 h-4 bg-primary" />
                </div>

                {/* First name and last name */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label className="block text-xs font-semibold mb-2">FIRST NAME<span className="text-complementary font-bold text-lg">*</span></label>
                        <input type="text" placeholder="Enter your first name" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm mb-6" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2">
                    <label className="block text-xs font-semibold mb-2">LAST NAME<span className="text-complementary font-bold text-lg">*</span></label>
                    <input type="text" placeholder="Enter your last name" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm mb-6" />
                    </div>
                </div>
                <a href="/mailconfirmation">
                    <button type="submit" className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition">Continue</button>
                </a>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}