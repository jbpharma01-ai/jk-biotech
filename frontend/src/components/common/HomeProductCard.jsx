import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="w-[260px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-premium-orange/70 hover:shadow-orange">

        {/* Product Image */}
        <div className="relative h-60 overflow-hidden bg-slate-50">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        </div>

        {/* Content */}
        <div className="p-5">

          <h3 className="font-heading text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-premium-orange transition-colors">
            {product.name}
          </h3>

                  <div className="mt-5 overflow-hidden">

                      <div className="flex items-center text-premium-orange font-semibold
                  translate-y-6 opacity-0
                  group-hover:translate-y-0
                  group-hover:opacity-100
                  transition-all duration-500">

                          <span className="text-sm">
                              View Product
                          </span>

                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                      </div>

                  </div>

        </div>

      </div>
    </Link>
  );
};

export default HomeProductCard;