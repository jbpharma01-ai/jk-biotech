import React from 'react';
import PageBanner from '../../components/common/PageBanner';
import Container from '../../components/common/Container';
import AboutScientist from '/images/about/lab.png';
import { Target, Eye, Gem } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="Building Trust Through Innovation"
        breadcrumbs={[
          { label: 'About', path: '/about' },
        ]}
      />

      <section className="bg-white py-24">
        <Container>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left Side Image */}
            <div className="relative">

              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-orange-500/10"></div>

              <div className="relative overflow-hidden rounded-[32px]">
                <img
                  src={AboutScientist}
                  alt="About JK Biotech"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-5 rounded-2xl border border-orange-500/40 bg-black backdrop-blur-md shadow-2xl px-3 py-3">
                <p className="text-3xl font-bold text-orange-500">
                  10+
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  Years of
                </p>

                <p className="text-sm text-slate-300">
                  Excellence
                </p>
              </div>

            </div>

            {/* Right Side Content */}
            <div>

              {/* Small Badge */}
              <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
                About J K Biotech
              </span>

              {/* Heading */}
              <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 ">
                Building Trust
                <br /> 
                Through Innovation
              </h2>

              {/* Orange Line */}
              <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></div>

              {/* Paragraph */}
              <p className="mt-8 text-lg leading-8 text-slate-600">
                J K BIOTECH is committed to delivering high-quality pharmaceutical
                formulations with a strong focus on innovation, quality assurance,
                and customer satisfaction. Our mission is to provide reliable
                healthcare solutions that improve lives while maintaining the
                highest manufacturing standards.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-700">
                    WHO-GMP Quality Manufacturing
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-700">
                    Trusted Pharmaceutical Partner
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-slate-700">
                    Innovation Driven Healthcare
                  </span>
                </div>

              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                <div className="relative rounded-2xl border border-orange-500/20 bg-[#111111] p-5 shadow-[0_8px_25px_rgba(249,115,22,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_15px_40px_rgba(249,115,22,0.20)] overflow-hidden">

                  {/* Top Accent Line */}
                  <div className="absolute left-5 right-5 top-0 h-[2px] rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent"></div>

                  <h3 className="text-3xl font-bold text-orange-500">
                    500+
                  </h3>

                  <p className="mt-2 text-sm font-medium text-white whitespace-nowrap">
                    Products
                  </p>

                </div>

                <div className="relative rounded-2xl border border-orange-500/20 bg-[#111111] p-5 shadow-[0_8px_25px_rgba(249,115,22,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_15px_40px_rgba(249,115,22,0.20)] overflow-hidden">

                  {/* Top Accent Line */}
                  <div className="absolute left-5 right-5 top-0 h-[2px] rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent"></div>

                  <h3 className="text-3xl font-bold text-orange-500">
                    100+
                  </h3>

                  <p className="mt-2 text-sm font-medium text-white whitespace-nowrap">
                    Happy Clients
                  </p>

                </div>

                <div className="relative rounded-2xl border border-orange-500/20 bg-[#111111] p-5 shadow-[0_8px_25px_rgba(249,115,22,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_15px_40px_rgba(249,115,22,0.20)] overflow-hidden">

                  {/* Top Accent Line */}
                  <div className="absolute left-5 right-5 top-0 h-[2px] rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent"></div>

                  <h3 className="text-3xl font-bold text-orange-500">
                    24×7
                  </h3>

                  <p className="mt-2 text-sm font-medium text-white whitespace-nowrap">
                    Support
                  </p>

                </div>

              </div>

            </div>

          </div>

        </Container>
      </section>

      <section className="py-20 bg-[#0D0D0D]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">

            <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Our Foundation
            </span>

            <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white">
              Mission, Vision & Values
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">

              <div className="group relative  rounded-3xl border border-orange-500/10 bg-[#161616] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_45px_rgba(249,115,22,0.15)]">
                <div className="absolute left-8 right-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent"></div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                  <Target className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Our Mission
                </h3>

                <p className="mt-4 text-gray-400 leading-7">
                  Deliver high-quality pharmaceutical products through innovation,
                  precision manufacturing and uncompromising quality standards.
                </p>

              </div>

              <div className="group relative  rounded-3xl border border-orange-500/10 bg-[#1B1B1B] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.18)]">
                <div className="absolute left-8 right-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent"></div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                  <Eye className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Our Vision
                </h3>

                <p className="mt-4 text-gray-400 leading-7">
                  To become a trusted pharmaceutical company recognized for innovation,
                  excellence and delivering healthcare solutions that improve lives.
                </p>

              </div>

              <div className="group relative rounded-3xl border border-orange-500/20 bg-[#161616] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.18)]">
                <div className="absolute left-8 right-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent"></div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                  <Gem className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  Core Values
                </h3>

                <ul className="mt-4 space-y-3 text-gray-400">
                  <li>• Quality Excellence</li>
                  <li>• Integrity & Transparency</li>
                  <li>• Continuous Innovation</li>
                  <li>• Customer Commitment</li>
                </ul>

              </div>

            </div>

            <p className="mt-5 text-gray-400 leading-8">
              Our commitment to innovation, uncompromising quality and ethical
              pharmaceutical manufacturing drives everything we do, ensuring better
              healthcare solutions for patients and partners.
            </p>

          </div>

        </Container>
      </section>

    </>
  );
};

export default AboutPage;