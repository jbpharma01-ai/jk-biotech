import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
const ContactPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitSuccess(false);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-white">

            {/* Page Banner */}
            <section className="bg-gradient-to-r from-[#09090B] via-[#111111] to-[#2A1E16] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#FF7B00] mb-3">
                            Get In Touch
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Contact Us
                        </h1>

                        <p className="mt-4 text-base md:text-lg text-slate-300">
                            Get in touch with J K BIOTECH Corporate Sales & Franchise Team.
                            We would be happy to assist you.
                        </p>
                    </div>
                </div>
            </section>


            {/* Contact Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Left Side */}
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#FF7B00]">
                                Contact Information
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-slate-900">
                                We'd Love To Hear From You
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Whether you have a product enquiry, business enquiry,
                                franchise requirement or any other question, feel free
                                to contact our team.
                            </p>

                            {/* Contact Cards */}
                            <div className="mt-8 space-y-4">

                                {/* Address */}
                                <div className="flex items-start gap-4 p-5 rounded-2xl border border-orange-100 bg-orange-50/50">
                                    <div className="w-11 h-11 rounded-xl bg-orange-100 text-[#FF7B00] flex items-center justify-center flex-shrink-0">
                                        {/* Icon will be added next */}
                                        <MapPin className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-800">
                                            Our Address
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                                            Office No. 22, First Floor, Satyam Arcade,
                                            <br />
                                            Near Intas Pharma, Opposite Moraiya Patiya,
                                            <br />
                                            Ahmedabad - 382213
                                        </p>
                                    </div>
                                </div>


                                {/* Phone */}
                                <div className="flex items-start gap-4 p-5 rounded-2xl border border-orange-100 bg-orange-50/50">
                                    <div className="w-11 h-11 rounded-xl bg-orange-100 text-[#FF7B00] flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-800">
                                            Phone
                                        </h3>

                                        <a
                                            href="tel:+917383936095"
                                            className="mt-1 inline-block text-sm text-slate-600 hover:text-[#FF7B00] transition-colors"
                                        >
                                            +91 7383936095
                                        </a>
                                    </div>
                                </div>


                                {/* Email */}
                                <div className="flex items-start gap-4 p-5 rounded-2xl border border-orange-100 bg-orange-50/50">
                                    <div className="w-11 h-11 rounded-xl bg-orange-100 text-[#FF7B00] flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-slate-800">
                                            Email
                                        </h3>

                                        <a
                                            href="mailto:info@jkbiotech.in"
                                            className="mt-1 inline-block text-sm text-slate-600 hover:text-[#FF7B00] transition-colors"
                                        >
                                            info@jkbiotech.in
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Right Side */}
                        <div className="rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-[0_10px_40px_rgba(249,115,22,0.08)]">

                            <p className="text-sm font-semibold uppercase tracking-wider text-[#FF7B00]">
                                Send Us A Message
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                How Can We Help?
                            </h2>

                            {/* Form will be added next */}

                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                                {/* Full Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-slate-700 mb-2"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#FF7B00] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>


                                {/* Email + Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#FF7B00] focus:ring-2 focus:ring-orange-100"
                                        />
                                    </div>


                                    {/* Phone */}
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-semibold text-slate-700 mb-2"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            type="tel"
                                            required
                                            maxLength={10}
                                            inputMode="numeric"
                                            pattern="[0-9]{10}"
                                            placeholder="Enter 10-digit mobile number"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            }}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#FF7B00] focus:ring-2 focus:ring-orange-100"
                                        />
                                    </div>

                                </div>


                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-semibold text-slate-700 mb-2"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        id="subject"
                                        type="text"
                                        required
                                        placeholder="Enter subject"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#FF7B00] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>


                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-semibold text-slate-700 mb-2"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        rows="5"
                                        required
                                        placeholder="Write your message here..."
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#FF7B00] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-[#FF7B00] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E96F00] hover:shadow-xl hover:shadow-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                            </form>

                            <br></br>
                            {submitSuccess && (
                                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                    Thank you! Your message has been submitted successfully.
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </section>

            {/* Location Section */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Find Us
                        </h2>


                        <p className="mt-3 text-slate-600">
                            Visit us at our corporate office in Ahmedabad.
                        </p>
                    </div>

                    {/* Google Map */}
                    <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-[0_10px_40px_rgba(249,115,22,0.08)]">
                        <iframe
                            title="J K BIOTECH Location"
                            src="https://www.google.com/maps?q=Office%20No.%2022,%20First%20Floor,%20Satyam%20Arcade,%20Near%20Intas%20Pharma,%20Opposite%20Moraiya%20Patiya,%20Ahmedabad%20382213&output=embed"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};

export default ContactPage;