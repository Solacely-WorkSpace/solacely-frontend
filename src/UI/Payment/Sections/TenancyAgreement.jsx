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
                <p className="text-gray-500 mb-4 text-base"> 
                    I confirm the health history is accurate and complete. I understand that withholding any medical information may be detrimental 
                    to my health and safety during the procedure which the practitioner agrees to undertake. If there is any change in my medical 
                    history, it is my responsibility to advise the Doctor/Practitioner.
                </p>
                <p className="text-gray-500 mb-4 text-base">
                  I am aware that the co-ordinator is medically trained and that his/her role is to inform me of the process, in accordance 
                  with the requirement of data protection act I consent to the disclosure of sensitive personal data by Laserderm to relevant 
                  doctors, surgeons, nurses etc. for the purpose of discussing surgical or medical procedures concerning myself.
                </p>
                <p className="text-gray-500 mb-4 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

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
                <button type="submit" className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition">Continue</button>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}

export default TenancyAgreementPage