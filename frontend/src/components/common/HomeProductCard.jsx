import React, { useState } from "react";
import { ArrowRight, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { getOptimizedImageUrl } from "../../utils/imageOptimizer";

const HomeProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    const imageUrl = getOptimizedImageUrl(product?.image, 500);

    return (
        <Link
            to={`/products/${product?.slug}`}
            className="group block select-none"
            aria-label={`View details for ${product?.name || "product"}`}
        >
            <div className="w-[260px] bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-premium-orange/70 hover:shadow-orange flex flex-col justify-between h-full">
                {/* Product Image */}
                <div className="relative h-60 overflow-hidden bg-slate-50 flex items-center justify-center">
                    {imageUrl && !imageError ? (
                        <img
                            src={imageUrl}
                            alt={product?.name || "J K BIOTECH product"}
                            loading="lazy"
                            decoding="async"
                            width="260"
                            height="240"
                            onError={() => setImageError(true)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                            <Pill className="w-10 h-10 mb-2 text-premium-orange/40" />
                            <span className="text-xs font-medium">JK BIOTECH</span>
                        </div>
                    )}

                    {/* Subtle Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <span className="text-[11px] font-bold text-premium-orange uppercase tracking-wider block mb-1">
                            {product?.category || (typeof product?.categoryId === 'object' ? product?.categoryId?.name : '') || 'Healthcare'}
                        </span>
                        <h3 className="font-heading text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-premium-orange transition-colors line-clamp-1">
                            {product?.name}
                        </h3>
                    </div>

                    <div className="mt-4 overflow-hidden pt-2">
                        <div className="flex items-center text-premium-orange font-semibold translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-xs tracking-wider uppercase">
                                View Product
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(HomeProductCard);
