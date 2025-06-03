import Image from "next/image";
import { teamMembers } from "@/Constant";
import Link from "next/link";
import { facebookIcon, instagramIcon, linkedinIcon, twitterIcon } from "@/assets/icons";
import { XSVG, LinkedinSVG, FacebookSVG,InstagramSVG } from "@/assets/SVGAssets";


const SocialLink = ({ href, children }) => (
  <Link 
    href={href} 
    className="text-gray-400 hover:text-primary transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </Link>
);

const Team = () => {
  return (
    <section className="aboutpage-container px-4 w-full">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl text-black font-bold tracking-tighter sm:text-4xl">
            Meet The Minds Shaping<br />
            Our <span className="text-complementary">Industry</span>
          </h2>
        </div>
        
        <div className="flex md:grid overflow-x-auto snap-x snap-mandatory md:grid-cols-2 lg:grid-cols-4 gap-2 pb-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-[20px] flex-shrink-0 w-[85vw] md:w-auto snap-center first:ml-0"
            >
              <div className="aspect-[5/5] relative"> 
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  quality={100}
                />
                {/* Desktop hover overlay card */}
                <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-8 right-8 bg-white rounded-2xl p-1">
                    <div className="text-center">
                      <h3 className="text-xs font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.location}</p>
                      <div className="flex items-center justify-center gap-2">
                        <SocialLink href={member.social?.instagram}>
                          <InstagramSVG />
                        </SocialLink>
                        <SocialLink href={member.social?.linkedin}>
                          <LinkedinSVG />
                        </SocialLink>
                        <SocialLink href={member.social?.facebook}>
                          <FacebookSVG />
                        </SocialLink>
                        <SocialLink href={member.social?.twitter}>
                          <XSVG />
                        </SocialLink>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile permanent overlay card */}
                <div className="md:hidden absolute bottom-4 left-8 right-8 bg-white rounded-2xl p-1">
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{member.location}</p>
                    <div className="flex items-center justify-center gap-4">
                        <SocialLink href={member.social?.linkedin}>
                          <InstagramSVG />
                        </SocialLink>
                        <SocialLink href={member.social?.instagram}>
                          <LinkedinSVG />
                        </SocialLink>
                        <SocialLink href={member.social?.facebook}>
                          <FacebookSVG />
                        </SocialLink>
                        <SocialLink href={member.social?.twitter}>
                          <XSVG />
                        </SocialLink>
                    </div>
                  </div>
                </div>

                {/* Desktop permanent info */}
                <div className="hidden md:block absolute bottom-1 left-1 right-0 p-4 text-center from-black/70 to-transparent opaity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-sm text-left text-gray-200">{member.role}</p>
                  <h3 className="text-base text-left font-semibold text-white">{member.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {teamMembers.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === 0 ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;