"use client";
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
    <div className="mx-auto w-full h-auto pb-8 flex flex-col items-center">
      <h2 className="text-2xl text-center md:text-4xl font-bold mb-4 font-bold">Our Esteemed Partners</h2>
      <div
        className="mt-4 flex gap-12 items-center animate-partners-marquee"
        style={{ width: "max-content" }}
      >
        {images.map((img, idx) => (
          <span key={idx} className="inline-block">
            <Image src={img.src} alt={img.alt} width={90} height={60} className="h-10 w-auto object-contain" style={{ height: 'auto' }} />
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
