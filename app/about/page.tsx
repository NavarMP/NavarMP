import Image from "next/image";
import { Code, Palette, Briefcase, Award } from "lucide-react";
import connectDB from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export const metadata = {
    title: "About - Muḥammed Navār",
    description: "Learn more about Muḥammed Navār - Graphic Designer & Full-Stack Developer",
};

// Testimonials Carousel Component
function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial._id.toString()}
                        className="p-8 bg-surface rounded-3xl border border-outline/10 animate-scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="text-primary text-xl">★</span>
                            ))}
                        </div>
                        <p className="text-on-surface mb-6 italic leading-relaxed">
                            "{testimonial.testimonial}"
                        </p>
                        <div>
                            <p className="font-bold text-on-surface">{testimonial.clientName}</p>
                            <p className="text-sm text-on-surface-variant">
                                {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default async function AboutPage() {
    await connectDB();

    // Fetch testimonials
    const testimonials = await Testimonial.find({ isVisible: true })
        .sort({ order: 1 })
        .limit(6)
        .lean();

    const skills = [
        { name: "Adobe Illustrator", level: 95, color: "bg-primary" },
        { name: "Adobe Photoshop", level: 90, color: "bg-secondary" },
        { name: "Adobe InDesign", level: 85, color: "bg-tertiary" },
        { name: "Figma", level: 88, color: "bg-primary" },
        { name: "VS Code / Development", level: 92, color: "bg-secondary" },
        { name: "Next.js & React", level: 90, color: "bg-tertiary" },
    ];

    return (
        <div className="min-h-screen pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-16 animate-slide-in-left">
                    <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                        About <span className="text-primary">Me</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant max-w-3xl leading-relaxed">
                        Multidisciplinary creator bridging the gap between visual design and functional technology.
                    </p>
                </div>

                {/* Bio Section */}
                <div className="grid md:grid-cols-2 gap-16 mb-24">
                    <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                        <p>
                            I'm <strong className="text-on-surface">Muḥammed Navār</strong>, a graphic designer and full-stack developer based in Kerala, India. My journey started with a passion for visual storytelling through graphic design, which naturally evolved into building interactive digital experiences.
                        </p>
                        <p>
                            With expertise spanning from brand identity design to full-stack web development, I bring a unique perspective to every project. I understand both the aesthetic principles that make designs beautiful and the technical foundations that make them functional.
                        </p>
                        <p>
                            My work philosophy is simple: every pixel should serve a purpose, and every line of code should enhance the user experience. Whether I'm designing a logo or architecting a web application, I strive for excellence in craftsmanship.
                        </p>
                        <p>
                            When I'm not designing or coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the creative community.
                        </p>
                    </div>

                    {/* Stats/Highlights */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                                <Code size={24} />
                            </div>
                            <h3 className="text-3xl font-bold font-display mb-2">5+</h3>
                            <p className="text-on-surface-variant">Years of Development</p>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-3xl border border-secondary/20">
                            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-secondary">
                                <Palette size={24} />
                            </div>
                            <h3 className="text-3xl font-bold font-display mb-2">7+</h3>
                            <p className="text-on-surface-variant">Years of Design</p>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-tertiary/10 to-tertiary/5 rounded-3xl border border-tertiary/20">
                            <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center mb-4 text-tertiary">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-3xl font-bold font-display mb-2">50+</h3>
                            <p className="text-on-surface-variant">Projects Completed</p>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary">
                                <Award size={24} />
                            </div>
                            <h3 className="text-3xl font-bold font-display mb-2">30+</h3>
                            <p className="text-on-surface-variant">Happy Clients</p>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-24">
                    <h2 className="text-4xl font-bold font-display mb-12">Technical Skills</h2>
                    <div className="space-y-6">
                        {skills.map((skill, index) => (
                            <div key={skill.name} className="animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-on-surface">{skill.name}</span>
                                    <span className="text-sm text-on-surface-variant">{skill.level}%</span>
                                </div>
                                <div className="h-3 bg-surface-variant rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                {testimonials.length > 0 && (
                    <div>
                        <h2 className="text-4xl font-bold font-display mb-12">Client Testimonials</h2>
                        <TestimonialsCarousel testimonials={testimonials} />
                    </div>
                )}
            </div>
        </div>
    );
}
