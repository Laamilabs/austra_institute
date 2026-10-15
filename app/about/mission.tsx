"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Vision() {
    const [isVisible, setIsVisible] = useState({
        section: false,
        leftColumn: false,
        rightColumn: false,
    });

    const sectionRef = useRef<HTMLElement | null>(null);
    const leftColumnRef = useRef<HTMLDivElement | null>(null);
    const rightColumnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const id = entry.target.getAttribute("data-id");

                    if (
                        id === "section" ||
                        id === "leftColumn" ||
                        id === "rightColumn"
                    ) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [id]: true,
                        }));
                    }
                });
            },
            {
                threshold: 0.2,
            }
        );

        const elements = [
            sectionRef.current,
            leftColumnRef.current,
            rightColumnRef.current,
        ];

        elements.forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            elements.forEach((element) => {
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            data-id="section"
            className="flex flex-col items-center bg-slate-50 py-10 md:py-16"
        >
            {/* Heading */}
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={
                    isVisible.section
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -20 }
                }
                transition={{ duration: 0.8 }}
            >
                <h2
                    className="text-2xl font-bold text-[#0B1F3A] md:text-3xl"
                    style={{ fontFamily: "var(--font-nunito)" }}
                >
                    Our Core Values
                </h2>

                <p className="mt-2 text-[#0B1F3A]">
                    Discover what drives us to make an impact.
                </p>
            </motion.div>

            {/* Content */}
            <div className="flex w-full max-w-6xl flex-col-reverse items-center px-6 sm:px-10 md:flex-row md:items-stretch md:space-x-8">
                {/* =====================================================
                    LEFT COLUMN
                ===================================================== */}
                <motion.div
                    ref={leftColumnRef}
                    data-id="leftColumn"
                    className="flex w-full flex-col justify-between md:w-1/2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={
                        isVisible.leftColumn
                            ? { x: 0, opacity: 1 }
                            : { x: -50, opacity: 0 }
                    }
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                >
                    {/* Vision */}
                    <motion.div
                        className="mb-6 border-b-2 border-r-2 border-orange-400 md:mb-4 p-4"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h3
                            className="mb-2 text-xl font-bold text-[#0B1F3A] md:text-2xl"
                            style={{ fontFamily: "var(--font-nunito)" }}
                        >
                            Vision
                        </h3>

                        <p className="text-[#0B1F3A]">
                            To be a leading center of excellence in education,
                            innovation, and community development, inspiring
                            lifelong learning and creating global leaders who
                            drive positive change in society.
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        className="border-b-2 border-r-2 border-orange-400 md:border-b-0 p-4"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h3
                            className="mb-2 text-xl font-bold text-[#0B1F3A] md:text-2xl"
                            style={{ fontFamily: "var(--font-nunito)" }}
                        >
                            Mission
                        </h3>

                        <p className="text-[#0B1F3A]">
                            To provide transformative education that equips
                            students with the knowledge, skills, and ethical
                            values needed to excel. We foster a culture of
                            creativity, inclusivity, and critical thinking.
                        </p>
                    </motion.div>
                </motion.div>

                {/* =====================================================
                    RIGHT COLUMN
                ===================================================== */}
                <motion.div
                    ref={rightColumnRef}
                    data-id="rightColumn"
                    className="flex w-full flex-col md:w-1/2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={
                        isVisible.rightColumn
                            ? { x: 0, opacity: 1 }
                            : { x: 50, opacity: 0 }
                    }
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                >
                    {/* Motto */}
                    <motion.div
                        className="mb-6 border-b-2 border-r-2 border-orange-400 md:mb-4 md:border-r-0"
                        whileHover={{ scale: 1.03 }}
                    >
                        <h3
                            className="mb-2 text-xl font-bold text-[#0B1F3A] md:text-2xl"
                            style={{ fontFamily: "var(--font-nunito)" }}
                        >
                            Motto
                        </h3>

                        <p className="text-[#0B1F3A]">
                            Empower your Potential, Ignite your Future
                        </p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="relative flex min-h-70 w-full flex-1 overflow-hidden sm:min-h-85 md:min-h-0"
                        whileHover={{ scale: 1.03 }}
                    >
                        <Image
                            src="/austra_card.png"
                            alt="Austra Training Institute"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}