"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { features } from "@/data/features"
import { testimonial } from "@/data/testimonial"
import { faqs } from "@/data/faqs"
import { howItWorks } from "@/data/howitworks"

export default function LandingPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10 grid-background bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.1)_0,rgba(12,10,29,0)_70%)]"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-16 md:py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-gray-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-sm">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-2 border-gray-700 hover:border-violet-500 transition-all duration-300 bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-violet-500/20 hover:translate-y-[-4px]"
              >
                <CardContent className="pt-8 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-3 rounded-full bg-violet-500/20 group-hover:bg-violet-500/40 transition-colors transform group-hover:scale-110 duration-300">
                      {React.cloneElement(feature.icon, { className: "w-10 h-10 text-violet-400" })}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 group-hover:text-violet-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-t from-gray-800 to-gray-900/90 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto text-center">
            {[
              { value: "50+", label: "Industries Covered" },
              { value: "1000+", label: "Interview Questions" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-3 backdrop-blur-sm p-6 rounded-lg hover:bg-gray-800/40 transition-colors"
              >
                <h3 className="text-5xl font-bold text-violet-400 animate-pulse">{stat.value}</h3>
                <p className="text-sm text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-28 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute right-0 top-1/4 w-72 h-72 bg-blue-600/30 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-cyan-600/30 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-md">
              How It Works
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Follow these four simple steps to accelerate your career growth.
            </p>
          </div>

          {/* Steps Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto relative">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-5 group relative transition-all duration-300 transform hover:scale-105"
              >
                {/* Step Icon with Hover Effect */}
                <div className="relative w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-500/50 group-hover:border-blue-500/80 transition-all duration-300">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </span>
                  {React.cloneElement(item.icon, { className: "w-8 h-8 text-blue-400 group-hover:text-white transition-colors duration-300" })}
                </div>

                {/* Step Title */}
                <h3 className="font-semibold text-xl text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-28 bg-gradient-to-b from-gray-900 to-gray-800/90 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-sm">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-800/90 backdrop-blur-md shadow-lg hover:shadow-violet-500/20 transition-all duration-300 border border-gray-700 hover:border-violet-500/50 group hover:translate-y-[-4px]"
              >
                <CardContent className="pt-8">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-violet-500/50 shadow-sm"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-100">{testimonial.author}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                        <p className="text-sm text-violet-400 font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-gray-300 italic text-sm relative leading-relaxed">
                        <span className="text-3xl text-violet-400 absolute -top-4 -left-2"></span>
                        {testimonial.quote}
                        <span className="text-3xl text-violet-400 absolute -bottom-4 right-0">"</span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-28 relative">
        <div className="absolute left-0 top-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-sm">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">Find answers to common questions about our platform</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-700 rounded-lg bg-gray-800/80 shadow-md hover:shadow-violet-500/20 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left px-4 py-3 text-lg font-semibold text-gray-100 hover:text-violet-300 group">
                    <span className="flex items-center">
                      <span className="mr-3 h-6 w-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/40 transition-colors">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-300 border-t border-gray-700/50">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-lg text-gray-100 md:text-xl leading-relaxed">
              Join thousands of professionals advancing their careers with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 mt-6 bg-white text-violet-900 hover:bg-gray-100 shadow-lg hover:shadow-white/30 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

