import React from "react";
import { motion } from "framer-motion";
import Container from "../../components/common/Container";
import { fadeUp } from "../../animations/variants";
import PRODUCTS from "../../constants/products";
import HomeProductCard from "../../components/common/HomeProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/common/Button";

const ProductsSection = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">

            <Container>

                {/* Heading */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-orange-50 border border-premium-orange/20 text-premium-orange text-xs font-bold tracking-[0.22em] uppercase">
                        Our Products
                    </span>

                    <h2 className="mt-5 font-heading font-black leading-tight">
                        <span className="text-4xl lg:text-5xl text-slate-900">
                            Explore Our
                        </span>

                        <span className="text-4xl lg:text-5xl text-premium-orange ml-3">
                            Products
                        </span>
                    </h2>

                    <div className="flex justify-center mt-6">
                        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"></div>
                    </div>
                </motion.div>

                {/*  Products Grid */}

                <div className="relative mt-16 overflow-hidden">

                    <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-28 bg-gradient-to-r from-white to-transparent"></div>

                    <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-28 bg-gradient-to-l from-white to-transparent"></div>

                    <div className="flex animate-product-scroll gap-8 w-max hover:[animation-play-state:paused]">

                        {[...PRODUCTS, ...PRODUCTS].map((product, index) => (
                            <HomeProductCard
                                key={`${product.id}-${index}`}
                                product={product}
                            />
                        ))}

                    </div>

                </div>

                {/* View All Products Button */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex justify-center mt-14"
                >
                    <Link to="/products">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={ArrowRight}
                            iconPosition="right"
                            className="shadow-orange hover:shadow-orangeLg hover:scale-[1.03] active:scale-[0.98]"
                        >
                            View All Products
                        </Button>
                    </Link>
                </motion.div>

            </Container>

        </section>
    );
};

export default ProductsSection;