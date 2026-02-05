'use client'

import type { Metadata } from "next";
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAnimation, useStaggeredAnimation } from '@/hooks/useAnimation'


// Zod Schema
const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactFormValues = z.infer<typeof contactFormSchema>

function ContactPage() {
    // Contact page: local contact form and contact cards. The form
    // uses a client-side Zod-validated schema and local state for
    // submission feedback — no server action wired here yet.
    const [submitted, setSubmitted] = useState(false)

    const titleVisible = useAnimation(0)
    const descriptionVisible = useAnimation(200)
    const contactCardsVisible = useStaggeredAnimation(3, 400, 150)
    const formVisible = useAnimation(1000)
    const faqVisible = useStaggeredAnimation(4, 1200, 150)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    })

    const onSubmit = async (data: ContactFormValues) => {
        // Handle form submission here
        console.log('Form submitted:', data)
        setSubmitted(true)
        form.reset()
        setTimeout(() => {
            setSubmitted(false)
        }, 3000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-500 ${titleVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-100">Touch</span>
                        </h1>
                        <p className={`text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${descriptionVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            Have a question about our products or services? We&rsquo;d love to hear from you. Our team is here to help and will get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Email */}
                        <Card className={`bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all hover:bg-zinc-800/80 ${contactCardsVisible[0] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600">
                                        <Mail size={24} className="text-zinc-300" />
                                    </div>
                                    <CardTitle className="text-white">Email</CardTitle>
                                </div>
                                <CardDescription>Send us an email anytime</CardDescription>
                            </CardHeader>
                            <a href="mailto:hello@stride.com" className="text-zinc-300 hover:text-white transition-colors font-medium px-6">
                                hello@stride.com
                            </a>
                        </Card>

                        {/* Phone */}
                        <Card className={`bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all hover:bg-zinc-800/80 ${contactCardsVisible[1] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600">
                                        <Phone size={24} className="text-zinc-300" />
                                    </div>
                                    <CardTitle className="text-white">Phone</CardTitle>
                                </div>
                                <CardDescription>Call us during business hours</CardDescription>
                            </CardHeader>
                            <a href="tel:+1234567890" className="text-zinc-300 hover:text-white transition-colors font-medium px-6">
                                +1 (234) 567-890
                            </a>
                        </Card>

                        {/* Address */}
                        <Card className={`bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all hover:bg-zinc-800/80 ${contactCardsVisible[2] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600">
                                        <MapPin size={24} className="text-zinc-300" />
                                    </div>
                                    <CardTitle className="text-white">Address</CardTitle>
                                </div>
                                <CardDescription>Visit us in person</CardDescription>
                            </CardHeader>
                            <div className="px-6 text-zinc-300 font-medium">
                                123 Stride Street<br />New York, NY 10001
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800 bg-zinc-900/50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-center">
                        Send us a Message
                    </h2>
                    <p className="text-zinc-400 text-center mb-12 text-lg">
                        Fill out the form below and we&rsquo;ll get back to you within 24 hours.
                    </p>

                    <Card className={`bg-zinc-800/50 border-zinc-700 transition-all duration-500 ${formVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                        <CardHeader>
                            <CardTitle className="text-white">Contact Form</CardTitle>
                        </CardHeader>
                        <div className="px-6 pb-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Field */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Your Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email Field */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        {...field}
                                                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Subject Field */}
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Subject</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="How can we help?"
                                                        {...field}
                                                        className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Message Field */}
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white">Message</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        placeholder="Tell us more about your inquiry..."
                                                        {...field}
                                                        rows={6}
                                                        className="w-full px-4 py-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all resize-none"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                        className="w-full px-8 py-4 bg-white text-zinc-950 font-semibold rounded-lg hover:bg-zinc-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={20} />
                                        {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>

                                    {submitted && (
                                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                                            <p className="text-zinc-300 text-center">
                                                ✓ Thank you for reaching out! We&rsquo;ll get back to you soon.
                                            </p>
                                        </div>
                                    )}
                                </form>
                            </Form>
                        </div>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "What is your typical response time?",
                                a: "We aim to respond to all inquiries within 24 business hours. During peak periods, it may take up to 48 hours."
                            },
                            {
                                q: "Do you offer customer support on weekends?",
                                a: "Yes! Our customer support team is available Monday to Sunday, 9 AM to 6 PM EST. We're here to help whenever you need us."
                            },
                            {
                                q: "Can I track my order status?",
                                a: "Absolutely. Once your order ships, you'll receive a tracking number via email. You can monitor your shipment in real-time."
                            },
                            {
                                q: "What's your return policy?",
                                a: "We offer a 30-day return policy on all unworn items in original packaging. For details, visit our returns page or contact us directly."
                            }
                        ].map((faq, i) => (
                            <Card key={i} className={`bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all ${faqVisible[i] ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}>
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">
                                        {faq.q}
                                    </CardTitle>
                                </CardHeader>
                                <div className="px-6 pb-6">
                                    <p className="text-zinc-400 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800 bg-zinc-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Can&rsquo;t Find What You&rsquo;re Looking For?
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                        Check out our help center for articles, guides, and troubleshooting tips.
                    </p>
                    <button className="px-8 py-4 bg-white text-zinc-950 font-semibold rounded-lg hover:bg-zinc-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Visit Help Center
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ContactPage