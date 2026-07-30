import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight  } from "lucide-react";
import Container from "../../components/common/Container";
import { fadeUp, staggerContainer } from "../../animations/variants";
import aboutData from "../../constants/aboutData";
import Button from "../../components/common/Button";

const hero = aboutData.hero;

const AboutPreviewSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-premium-black via-[#111111] to-[#1A1A1A] py-28">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-premium-orange/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-premium-orange/10 blur-[120px]" />

      <Container>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >

          {/* LEFT SIDE */}
          <div>
      
            {/* Badge */}
            <motion.span
              variants={fadeUp}
              className="inline-flex px-5 py-2 rounded-full bg-premium-orange/10 border border-premium-orange/30 text-premium-orange text-xs font-bold uppercase tracking-[0.22em]"
            >
              {hero.badge}
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-7 font-heading font-black leading-[0.95]"
            >

              <span className="block text-5xl lg:text-7xl text-white">
                {hero.title1}
              </span>

              <span className="block text-5xl lg:text-7xl text-premium-orange mt-2">
                {hero.title2}
              </span>

            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-lg leading-8 text-slate-300"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10"
            >
              <Link to="/about">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="shadow-orange hover:shadow-orangeLg hover:scale-[1.03] active:scale-[0.98]"
                >
                  Discover Our Story
                </Button>
              </Link>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
        
          <motion.div
            variants={fadeUp}
            animate={{
              y: [0, -12, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}

            className="relative flex justify-center"
          >

            <div className="absolute w-[420px] h-[420px] rounded-full bg-premium-orange/20 blur-[90px] animate-pulse" />

            <motion.div
              whileHover={{
                scale: 1.03,
                rotate: 1.2,
              }}
              transition={{
                duration: 0.4,
              }}
              className="relative rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,.45)]"
            >
              <img
                src={hero.image}
                alt="JK Biotech"
                className="w-[520px] h-[620px] object-cover "
              />

            </motion.div>

          </motion.div>

        </motion.div>

      </Container>

    </section>
  );
};

export default AboutPreviewSection;