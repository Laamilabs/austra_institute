import Image from "next/image";

export default function LocationSection() {
  return (
    <section className="w-full bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8" style={{ fontFamily: "var(--font-nunito)" }}>
        {/* Section Heading */}
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Visit Us
          </h2>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Komora Centre (4th Floor - Rm 415), Eldoret, Kenya
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Image Card */}
          <div className="relative min-h-80 w-full overflow-hidden rounded-lg bg-gray-100 shadow-md lg:col-span-4 2xl:col-span-3">
            <Image
              src="/Komora.png"
              alt="Austra Training Institute - Komora Centre Campus Building"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>

          {/* Google Map Section */}
          <div className="min-h-80 w-full overflow-hidden rounded-lg bg-gray-100 shadow-md lg:col-span-8 2xl:col-span-9">
            <iframe
              title="Austra Training Institute Location Map"
              className="h-full min-h-80 w-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.9880361174933!2d35.271790472213745!3d0.5168603000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17810179667d6d9f%3A0x4ee051166531a269!2sAussiz%20Education%20%26%20Training!5e1!3m2!1sen!2ske!4v1736767720950!5m2!1sen!2ske"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}