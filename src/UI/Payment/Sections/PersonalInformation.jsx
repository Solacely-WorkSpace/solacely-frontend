import { FiChevronLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/UI/Components/Nav";

export default function PersonalInformationPage() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
        <div className="aboutpage-container px-4 mt-20 w-full">
            <button className="flex items-center text-gray-500 text-sm md:mt-10 mt-3 mb-8 pl-2">
                <FiChevronLeft className="mr-1 w-4 h-4" /> Go Back
            </button>
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
            <div className="hidden md:block bg-white rounded-xl shadow-sm p-8 w-full h-fit md:w-80 mb-6 md:mb-0">
                <ul className="py-4 space-y-6">
                {[
                    "Personal Information",
                    "Tenancy Agreement",
                    "Estate Agreement",
                    "Mail Confirmation",
                    "Payment Review",
                ].map((step, idx) => (
                    <li key={step} className="flex items-center justify-between">
                    <span className={
                        idx === 0
                        ? "font-semibold text-black border-l-4 border-complementary pl-3"
                        : "text-gray-400 pl-3"
                    }>
                        {step}
                    </span>
                    <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                ))}
                </ul>
            </div>

            {/* Main Form Card */}
            <div className="bg-white md:rounded-xl md:shadow-sm md:p-8 px-3 flex-1 min-w-[320px]">
                <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">Personal Information</span>
                </div>
                <p className="text-gray-400 text-sm mb-8">Let's get to know more about you.</p>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label className="block text-xs font-semibold mb-2">FIRST NAME<span className="text-complementary font-bold text-lg">*</span></label>
                    <input type="text" placeholder="Enter your first name" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm" />
                </div>
                {/* Last Name */}
                <div>
                    <label className="block text-xs font-semibold mb-2">LAST NAME<span className="text-complementary font-bold text-lg">*</span></label>
                    <input type="text" placeholder="Enter your last name" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm" />
                </div>
                {/* Date of Birth */}
                <div>
                    <label className="block text-xs font-semibold mb-2">DATE OF BIRTH</label>
                    <div className="relative">
                    <input type="date" placeholder="Select your date of birth" className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-primary text-sm" />
                    </div>
                </div>
                {/* Gender */}
                <div>
                    <label className="block text-xs font-semibold mb-2 text-black">GENDER<span className="text-complementary font-bold text-lg">*</span></label>
                    <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm text-black">
                        <option value="" className="text-gray-400">Select gender</option>
                        <option value="male" className="text-gray-400">Male</option>
                        <option value="female" className="text-gray-400">Female</option>
                        <option value="other" className="text-gray-400">Other</option>
                    </select>
                </div>
                {/* Email Address */}
                <div>
                    <label className="block text-xs font-semibold mb-2">EMAIL ADDRESS<span className="text-complementary font-bold text-lg">*</span></label>
                    <input type="email" placeholder="Enter your email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm" />
                </div>
                {/* Mobile Number */}
                <div>
                    <label className="block text-xs font-semibold mb-2">MOBILE NUMBER<span className="text-complementary font-bold text-lg">*</span></label>
                    <div className="flex">
                        <select className="border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-sm text-gray-500 px-2 focus:outline-primary min-w-[90px]">
                            <option value="ng">🇳🇬 +234</option>
                            <option value="gh">🇬🇭 +233</option>
                            <option value="za">🇿🇦 +27</option>
                        </select>
                        <input type="tel" placeholder="" className="w-full border border-gray-200 rounded-r-lg px-4 py-3 focus:outline-primary text-sm" />
                    </div>
                </div>
                {/* Upload ID */}
                <div>
                    <label className="block text-xs font-semibold mb-2">UPLOAD WORK/STUDENT ID<span className="text-complementary font-bold text-lg">*</span></label>
                    <input placeholder="Upload your ID" type="file" className="w-full border border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer text-sm" />
                </div>
                {/* Designation */}
                <div>
                    <label className="block text-xs font-semibold mb-2">DESIGNATION (WORK)<span className="text-complementary font-bold text-lg">*</span></label>
                    <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm text-black">
                        <option value="" className="text-gray-400">Select designation</option>
                        <option value="student" className="text-gray-400">Student</option>
                        <option value="employed" className="text-gray-400">Employed</option>
                        <option value="self-employed" className="text-gray-400">Self-employed</option>
                        <option value="other" className="text-gray-400">Other</option>
                    </select>
                </div>
                </form>
                <button type="submit" className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition">Continue</button>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
