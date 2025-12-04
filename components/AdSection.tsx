import Image from "next/image";
import { adBgImage } from "@/app/website-data";

export default function AdSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <Image 
        src={adBgImage} 
        alt="Dark Side of the Moon Watch" 
        fill 
        className="object-cover object-center" 
        priority 
      />
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
        <div className="text-white/80 text-xs font-bold uppercase tracking-widest mt-4">Speedmaster</div>
        <div className="max-w-lg mb-8">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Dark Side of the Moon</h2>
          <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed font-light">
            Honouring OMEGA&apos;s legacy of space exploration, this Speedmaster Dark Side of the Moon features a 44.25 mm case in polished-brushed black ceramic.
          </p>
          <button className="bg-[#D4B07B] text-black px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-[#c29e6b] transition-colors duration-300">
            Explore the Collection
          </button>
        </div>
      </div>
    </section>
  );
}