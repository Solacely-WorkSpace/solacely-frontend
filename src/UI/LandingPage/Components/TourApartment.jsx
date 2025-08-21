
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tour } from "@/Constant";
import LoginPromptModal from "./LoginPromptModal";
import authService from "@/lib/api/services/authService";


export default function TourApartment() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleFindApartment = () => {
    if (authService.isAuthenticated()) {
      router.push("/apartment");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className=" flex justify-between items-center flex-col-reverse md:flex-row mt-8 gap-12">
      <article className="flex-[2]">
        <h3 className="mb-3">
          {tour.apartment.header}
        </h3>

        <p className=" mb-6">
          {tour.apartment.desc}
        </p>

        <div className=" flex justify-between py-3 px-4 rounded-sm ring-1 ring-slate-300 mb-6">
          <input
            placeholder="Enter a city or style"
            className=" outline-none w-full"
          />

          <Image
            src="/icons/search.svg"
            width={20}
            height={20}
            alt="search"
            className="w-8 h-8"
          />
        </div>

        <button className="btn-primary" onClick={handleFindApartment}> Find an Apartment </button>
      </article>

      <figure className="flex-[3] w-full ">
        <Image
          src={tour.apartment.src}
          width={300}
          height={300}
          alt={tour.apartment.label}
          placeholder="blur"
          className=" aspect-[5/3] rounded-2xl"
        />
      </figure>

      <LoginPromptModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
