
import React from "react";
import Image from "next/image";
import { DataMellon, Flutterwave, Fincore, GoogleCloudPartners, Paystack } from '@/assets/images';
const partnerImages = [
  { src: DataMellon, alt: "Datamellon" },
  { src: Flutterwave, alt: "Flutterwave" },
  { src: Fincore, alt: "Fincore" },
  { src: GoogleCloudPartners, alt: "Google Cloud Partner" },
  { src: Paystack, alt: "Paystack" },
];

export default function PartnersCarousel() {
  // Duplicate the images for seamless infinite scroll
  const images = [...partnerImages, ...partnerImages];
  return (
    <div className="mx-auto max-w-xs md:max-w-[400px] h-16 overflow-x-hidden">
      <div
        className="flex gap-8 items-center animate-partners-marquee"
        style={{ width: "max-content" }}
      >
        {images.map((img, idx) => (
          <span key={idx} className="inline-block">
            <Image src={img.src} alt={img.alt} width={80} height={40} className="h-10 w-auto object-contain" />
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes partners-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-partners-marquee {
          animation: partners-marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
