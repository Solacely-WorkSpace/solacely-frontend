import { FiChevronLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/UI/Components/Nav";

function TenancyAgreementPage() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
        <div className="aboutpage-container px-4 mt-20 w-full">
            <a href="/personalinformation">
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
                      <span className="font-semibold text-black border-l-4 border-complementary pl-6 py-2">Tenancy Agreement</span>
                      <FaCheckCircle className="text-complementary/20 text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                      <span className="text-gray-400 pl-6">Estate Agreement</span>
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
                <span className="font-semibold text-lg">Tenancy Agreement</span>  
                </div>
                <p className="text-gray-400 text-sm mb-8">Go through the agreements carefully before signing it.</p>
                <div className="bg-gray-200 p-6 rounded-lg mb-6 max-h-96 overflow-y-auto">
                    <h2 className="text-xl font-bold text-black mb-4">Solacely Tenancy Agreement</h2>
                    <p className="text-sm text-gray-600 mb-4 italic">Please read carefully before signing.</p>
                    <p className="text-gray-700 mb-4 text-sm">This agreement outlines the basic terms and responsibilities for tenants residing in Solacely-managed properties.</p>
                    
                    <div className="space-y-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">1. Property Use</h3>
                            <p className="text-gray-700 text-sm">The tenant agrees to use the property strictly for residential purposes. Subletting is not allowed without written consent from Solacely.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">2. Rent and Payments</h3>
                            <p className="text-gray-700 text-sm">Tenants must pay rent on or before the agreed date each month. Late payments attract a penalty as stated in the payment policy.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">3. Utilities and Bills</h3>
                            <p className="text-gray-700 text-sm">Tenants are responsible for electricity, water, and internet unless otherwise stated. All bills must be paid promptly to avoid service disruption.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">4. Repairs and Maintenance</h3>
                            <p className="text-gray-700 text-sm mb-2">Minor issues (e.g., light bulbs, blocked drains) should be fixed by the tenant.</p>
                            <p className="text-gray-700 text-sm mb-2">Major issues (e.g., plumbing, structural damage, electrical faults) must be reported immediately to Solacely.</p>
                            <p className="text-gray-700 text-sm">Unauthorized repairs are not allowed.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">5. Cleanliness and Conduct</h3>
                            <p className="text-gray-700 text-sm">Tenant must keep the space clean and avoid damage to property. No illegal activities, noise disturbances, or aggressive behavior will be tolerated.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">6. Visitors and Access</h3>
                            <p className="text-gray-700 text-sm">Visitors are allowed but may not stay longer than 7 days without approval. Solacely reserves the right to access the property for inspections with prior notice.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">7. Termination and Notice</h3>
                            <p className="text-gray-700 text-sm">Tenants must give at least 30 days' notice before ending the tenancy. Solacely may also end the agreement with valid reasons and appropriate notice.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">8. Deposit</h3>
                            <p className="text-gray-700 text-sm">A security deposit is required and refundable at the end of the tenancy, subject to property condition.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">9. Damage Liability</h3>
                            <p className="text-gray-700 text-sm">Tenants are liable for damages caused by negligence or misuse.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">10. Emergency Contact</h3>
                            <p className="text-gray-700 text-sm">Tenants should report emergencies to Solacely via the provided contact methods.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">11. Property Alterations</h3>
                            <p className="text-gray-700 text-sm">Tenants must get written approval for any alterations.</p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-black text-base mb-2">12. Dispute Resolution</h3>
                            <p className="text-gray-700 text-sm">Disputes will be resolved through mediation.</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-700 mt-6 text-sm font-medium">By signing this agreement, the tenant agrees to abide by all terms stated above.</p>
                </div>

                <h3 className="text-lg font-semibold text-black mb-1 text-base">Signature</h3>
                <p className="text-gray-400 mb-4 text-sm">
                    Your <span className="text-black italic font-medium">full name</span> will be used to sign this Tenancy agreement.
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
                <a href="/estateagreement">
                    <button type="submit" className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition">Continue</button>
                </a>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}

export default TenancyAgreementPage