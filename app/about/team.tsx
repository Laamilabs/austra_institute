import Image from "next/image";

const teamMembers = [
  {
    name: "Ongori Felix Ongeri",
    role: "Director",
    bio: "Ongori Felix Ongeri provides strategic leadership at Austra, guiding its commitment to accessible, practical, career-focused education. With a background in Biotechnology and Applied Biology and more than 12 years of experience across caregiving and visa application processes, he brings a broad perspective to student support and career pathways. He is focused on helping learners build relevant skills and progress toward local and international opportunities.",
    image: "/team/felix1.jpg",
    imagePosition: "50% 18%",
    isDirector: true,
  },
  {
    name: "Keter Titus",
    role: "Head of Science & Technology",
    bio: "Leads the Science and Technology department, with an emphasis on practical learning, technology integration, and skills shaped by industry needs.",
    image: "/team/keter.jpg",
    imagePosition: "50% 24%",
  },
  {
    name: "Sandra Koech",
    role: "Caregiving Trainer",
    bio: "Delivers practical caregiving instruction that helps prepare learners for healthcare and care-support roles with empathy and professionalism.",
    image: "/team/sandra.jpg",
    imagePosition: "50% 23%",
  },
  {
    name: "Wafula Lawrence",
    role: "Head of Music & Media Arts",
    bio: "Guides the Music and Media Arts programmes, encouraging creative exploration, confident performance, and hands-on media production.",
    image: "/team/lawrence.jpg",
    imagePosition: "50% 20%",
  },
  {
    name: "Rachel Chepleting",
    role: "Head of Health & Social Sciences",
    bio: "Leads health and social sciences education, with a focus on preparing compassionate, capable healthcare and caregiving professionals.",
    image: "/team/rachel.png",
    imagePosition: "50% 25%",
  },
  {
    name: "Antonette Babra",
    role: "Head of Languages & International Studies",
    bio: "Leads language and international studies programmes, helping learners build communication skills and cross-cultural understanding.",
    image: "/team/anto.jpg",
    imagePosition: "50% 20%",
  },
  {
    name: "Faith Kangogo",
    role: "German Language Trainer",
    bio: "Teaches German and supports learners as they build language proficiency for further study and international career opportunities.",
    image: "/team/faith.jpg",
    imagePosition: "50% 24%",
  },
  {
    name: "Daisy Jelagat",
    role: "Customer Relations",
    bio: "Supports student enquiries, career guidance, and clear communication for prospective and current learners.",
    image: "/team/daisy.jpg",
    imagePosition: "50% 30%",
  },
];

export default function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden py-16 text-[#0B1330] md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: "url('/cta/class.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85 md:bg-gradient-to-r md:from-white/10 md:via-white/75 md:to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/20 to-white/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            The people behind Austra
          </p>
          <h2
            className="text-3xl font-extrabold tracking-tight text-[#0B1330] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Meet our team
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-16 bg-orange-400" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#0B1330]/80 sm:text-base md:text-lg">
            Our educators and staff bring practical expertise, personal guidance, and a shared commitment to helping learners move forward.
          </p>
        </header>

        <div className="mt-10 flex flex-col gap-5 sm:mt-14 sm:gap-7 lg:gap-8">
          {teamMembers.map((member, index) => {
            if (member.isDirector) {
              return (
                <article
                  key={member.name}
                  className="overflow-hidden rounded-2xl border border-orange-400/60 bg-white/95 shadow-lg transition-shadow duration-300 hover:shadow-2xl md:grid md:grid-cols-[minmax(220px,0.78fr)_minmax(0,1.22fr)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 md:aspect-auto md:min-h-[32rem] lg:min-h-[38rem]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      priority
                      sizes="(max-width: 1023px) 100vw, 42vw"
                      className="object-cover"
                      style={{ objectPosition: member.imagePosition }}
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                      Institute leadership
                    </p>
                    <h3
                      className="mt-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl"
                      style={{ fontFamily: "var(--font-nunito)" }}
                    >
                      {member.name}
                    </h3>
                    <p className="mt-2 text-lg font-semibold text-orange-600 sm:text-xl">
                      {member.role}
                    </p>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-700 sm:mt-6 sm:text-base sm:leading-8 lg:text-[17px]">
                      {member.bio}
                    </p>
                    <div className="mt-7 sm:mt-9">
                      <a
                        href="/contact"
                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0B1330] px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                      >
                        Contact the director
                      </a>
                    </div>
                  </div>
                </article>
              );
            }

            const isEven = index % 2 === 0;
            const cardBgClass = isEven
              ? "bg-orange-400/10 backdrop-blur-xs"
              : "bg-[#0B1330]/10 backdrop-blur-xs";

            return (
              <article
                key={member.name}
                className={`flex min-w-0 flex-col gap-4 md:flex-row md:items-stretch md:gap-6 ${isEven ? "" : "md:flex-row-reverse"}`}
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:aspect-[4/5] md:w-[35%] lg:w-[30%] xl:w-[28%]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 35vw, 28vw"
                    className="object-cover"
                    style={{ objectPosition: member.imagePosition }}
                  />
                </div>

                <div
                  className={`flex min-w-0 flex-1 flex-col justify-center rounded-2xl p-5 sm:p-7 lg:p-9 ${cardBgClass}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700 sm:text-xs">
                    Austra team
                  </p>
                  <h3
                    className="mt-2 text-xl font-bold leading-tight tracking-tight text-[#0B1330] sm:text-2xl md:text-3xl"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-orange-700 sm:text-lg">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#0B1330]/90 sm:text-base sm:leading-8">
                    {member.bio}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

