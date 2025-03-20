"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [randomUsers, setRandomUsers] = useState([])
    const [isClientSide, setIsClientSide] = useState(false)
    const imageRef = useRef(null)
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const imageY = useTransform(scrollYProgress, [0, 1], [0, -80])
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
    const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150])

    // Fix hydration issues by ensuring client-side only rendering of dynamic content
    useEffect(() => {
        setIsLoaded(true)
        setIsClientSide(true)

        // Only fetch random users on the client side after initial render
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=4&inc=picture')
                const data = await response.json()
                setRandomUsers(data.results)
            } catch (error) {
                console.error('Error fetching random users:', error)
            }
        }

        fetchUsers()
    }, [])

    // Enhanced animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    }

    const floatingElementsVariants = {
        initial: { y: 0 },
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        }
    }

    // Fixed array of placeholder user images to ensure consistency between server and client
    const placeholderUsers = [1, 2, 3, 4]

    return (
        <section ref={containerRef} className="w-full pt-28 md:pt-36 pb-20 overflow-hidden relative min-h-[90vh] flex items-center">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-60"></div>
                    <div className="absolute bottom-1/3 -right-40 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] opacity-70"></div>
                    <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] opacity-50"></div>
                </motion.div>
            </div>

            {/* Floating particles - only rendered client-side to avoid hydration issues */}
            {isClientSide && (
                <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: `${Math.floor(Math.random() * 100) - 50}%`,
                                y: `${Math.floor(Math.random() * 100) - 50}%`,
                                opacity: Math.max(0.3, Math.min(0.8, Number((Math.random() * 0.5 + 0.3).toFixed(2)))),
                                scale: Math.max(0.2, Math.min(0.6, Number((Math.random() * 0.4 + 0.2).toFixed(2))))
                            }}
                            animate={{
                                y: [0, `${Math.floor(Math.random() * 20) - 10}px`],
                                rotate: [0, Math.floor(Math.random() * 360)]
                            }}
                            transition={{
                                duration: Math.max(5, Math.min(10, Math.floor(Math.random() * 5) + 5)),
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            className={`absolute w-4 h-4 rounded-full ${i % 3 === 0 ? "bg-primary/30" : i % 3 === 1 ? "bg-secondary/30" : "bg-accent/30"}`}
                        />
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 container mx-auto px-4 md:px-6">
                <motion.div
                    className="flex flex-col justify-center space-y-8"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="space-y-2">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20 shadow-sm backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5 mr-2" />
                            <span className="mr-2">AI-Powered Career Development</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight relative z-10">
                            <span className="relative inline-block">
                                <span className="relative z-10">
                                    AI Career{" "}
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient">
                                        Architect
                                    </span>
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                                <div className="absolute -bottom-3 left-0 w-3/4 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
                            </span>
                            <div className="absolute -top-4 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl -z-10"></div>
                            <div className="absolute -bottom-4 -right-6 w-20 h-20 bg-secondary/10 rounded-full blur-xl -z-10"></div>
                        </h1>

                        <p className="text-xl md:text-2xl font-medium text-foreground/80 mt-4">
                            <span className="opacity-85">Build Your Future</span>{" "}
                            {isClientSide && (
                                <motion.span
                                    animate={{ opacity: [1, 0.7, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="font-semibold"
                                >
                                    Today
                                </motion.span>
                            )}
                            {!isClientSide && (
                                <span className="font-semibold">Today</span>
                            )}
                        </p>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground max-w-[550px] leading-relaxed">
                        From resume building to interview prep, get personalized career insights tailored to your goals with advanced AI technology.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="px-8 h-12 text-base font-medium group relative overflow-hidden">
                                <span className="relative z-10 flex items-center">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="px-8 h-12 text-base font-medium border-2 hover:bg-background/50 backdrop-blur-sm transition-all duration-300">
                            Learn More
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-md rounded-xl border border-border/30 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex -space-x-3">
                            {(isClientSide && randomUsers.length > 0 ? randomUsers : placeholderUsers).map((item, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-background overflow-hidden shadow-sm transition-transform hover:scale-110"
                                >
                                    {isClientSide && randomUsers.length > 0 ? (
                                        <Image
                                            src={item.picture.thumbnail}
                                            width={32}
                                            height={32}
                                            alt={`User ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted animate-pulse" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            Join <strong className="text-foreground">2,000+</strong> professionals already using our platform
                        </span>
                    </motion.div>
                </motion.div>

                <div className="relative flex flex-col items-center justify-center">
                    {/* Banner Image Section */}
                    <motion.div
                        style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full max-w-[800px] mx-auto"
                    >
                        {/* Gradient Glow Border */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                        <div
                            ref={imageRef}
                            className="relative rounded-2xl overflow-hidden border border-border/10 bg-background/70 backdrop-blur-lg shadow-2xl group transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
                        >
                            <Image
                                src="/banner.png"
                                width={1600}
                                height={900}
                                alt="Dashboard Preview"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                priority
                            />

                            {/* Animated Overlay Glow on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay"></div>
                            </div>

                            {/* Subtle Gradient Overlay for Depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
                        </div>
                    </motion.div>

                    {/* Floating Elements with Modern Design */}
                    {isClientSide && (
                        <div className="relative w-full max-w-[800px] mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* AI Match Card */}
                            <motion.div
                                className="bg-background/80 backdrop-blur-lg rounded-xl p-4 border border-border/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                variants={floatingElementsVariants}
                                whileInView="animate"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">AI Match</div>
                                        <div className="text-xs text-muted-foreground flex items-center">
                                            <span className="font-bold text-primary">98%</span>
                                            <span className="ml-1">Resume Score</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Interview Ready Card */}
                            <motion.div
                                className="bg-background/80 backdrop-blur-lg rounded-xl p-4 border border-border/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.5 }}
                                variants={floatingElementsVariants}
                                whileInView="animate"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 2v20" />
                                            <path d="m17 5-5-3-5 3" />
                                            <path d="m17 19-5 3-5-3" />
                                            <path d="M2 12h20" />
                                            <path d="m5 7-3 5 3 5" />
                                            <path d="m19 7 3 5-3 5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">Interview Ready</div>
                                        <div className="text-xs text-muted-foreground">
                                            <span className="font-bold text-secondary">15</span> Practice Questions
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Job Match Card */}
                            <motion.div
                                className="bg-background/80 backdrop-blur-lg rounded-xl p-4 border border-border/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.3, duration: 0.5 }}
                                variants={floatingElementsVariants}
                                whileInView="animate"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                            <path d="m9 12 2 2 4-4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">Job Match</div>
                                        <div className="text-xs text-muted-foreground">
                                            <span className="font-bold text-green-500">24</span> New Opportunities
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default HeroSection