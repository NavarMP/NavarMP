import { Download, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

export const metadata = {
    title: "Resume - Muḥammed Navār",
    description: "Professional resume of Muḥammed Navār - Graphic Designer & Full-Stack Developer",
};

export default function ResumePage() {
    const education = [
        {
            degree: "Bachelor of Computer Applications (BCA)",
            institution: "University of Calicut",
            year: "2018 - 2021",
            description: "Focused on software development, database management, and web technologies.",
        },
        {
            degree: "Higher Secondary Education",
            institution: "SAFI Institute of Advanced Study",
            year: "2016 - 2018",
            description: "Computer Science stream with Mathematics",
        },
    ];

    const experience = [
        {
            title: "Freelance Graphic Designer & Full-Stack Developer",
            company: "Self-Employed",
            period: "2019 - Present",
            description: "Providing end-to-end design and development services to clients worldwide. Specialized in brand identity, web applications, and digital marketing solutions.",
            achievements: [
                "Delivered 50+ successful projects across graphic design and web development",
                "Maintained 100% client satisfaction rate with repeat business",
                "Built scalable web applications using Next.js, React, and MongoDB",
            ],
        },
        {
            title: "Graphic Designer",
            company: "Various Agencies",
            period: "2017 - 2019",
            description: "Worked with multiple design studios creating visual content for brands, print media, and digital campaigns.",
            achievements: [
                "Designed brand identities for 20+ businesses",
                "Created marketing materials reaching 100K+ audience",
                "Mastered Adobe Creative Suite (Illustrator, Photoshop, InDesign)",
            ],
        },
    ];

    const skills = {
        design: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma", "Canva"],
        development: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
        tools: ["VS Code", "Git & GitHub", "Cloudinary", "Vercel", "GSAP"],
    };

    return (
        <div className="min-h-screen pt-24 pb-24 bg-surface/50">
            <div className="max-w-5xl mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 mb-12 border border-primary/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-5xl font-bold font-display mb-4">Muḥammed Navār</h1>
                            <p className="text-2xl text-primary font-medium mb-4">Graphic Designer & Full-Stack Developer</p>

                            <div className="space-y-2 text-on-surface-variant">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} />
                                    <a href="mailto:NavarMP@gmail.com" className="hover:text-primary transition-colors">
                                        NavarMP@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} />
                                    <a href="tel:+919746902268" className="hover:text-primary transition-colors">
                                        +91 9746 902268
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>Kerala, India</span>
                                </div>
                            </div>
                        </div>

                        <button className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all flex items-center gap-2">
                            <Download size={20} />
                            Download PDF
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-6 pt-6 border-t border-outline/20">
                        <a
                            href="https://github.com/NavarMP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-xl hover:bg-primary hover:text-on-primary transition-colors"
                        >
                            <Github size={18} />
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/NavarMP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-xl hover:bg-primary hover:text-on-primary transition-colors"
                        >
                            <Linkedin size={18} />
                            LinkedIn
                        </a>
                        <a
                            href="https://navarmp.com"
                            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-xl hover:bg-primary hover:text-on-primary transition-colors"
                        >
                            <Globe size={18} />
                            Portfolio
                        </a>
                    </div>
                </div>

                {/* Professional Summary */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold font-display mb-6 text-primary">Professional Summary</h2>
                    <div className="p-8 bg-surface rounded-3xl border border-outline/10">
                        <p className="text-lg leading-relaxed text-on-surface-variant">
                            Multidisciplinary creative professional with 7+ years of graphic design experience and 5+ years of full-stack development expertise. Specialized in bridging the gap between visual design and functional technology to deliver comprehensive digital solutions. Proven track record of creating compelling brand identities and scalable web applications for diverse clients across industries.
                        </p>
                    </div>
                </section>

                {/* Experience */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold font-display mb-6 text-primary">Professional Experience</h2>
                    <div className="space-y-6">
                        {experience.map((job, index) => (
                            <div key={index} className="p-8 bg-surface rounded-3xl border border-outline/10 relative overflow-hidden group hover:border-primary/30 transition-all">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                                <div className="relative">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold font-display">{job.title}</h3>
                                            <p className="text-primary font-medium">{job.company}</p>
                                        </div>
                                        <span className="text-on-surface-variant font-medium">{job.period}</span>
                                    </div>
                                    <p className="text-on-surface-variant mb-4">{job.description}</p>
                                    <ul className="space-y-2">
                                        {job.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start gap-2 text-on-surface-variant">
                                                <span className="text-primary mt-1">•</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold font-display mb-6 text-primary">Education</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {education.map((edu, index) => (
                            <div key={index} className="p-8 bg-surface rounded-3xl border border-outline/10 hover:border-secondary/30 transition-all">
                                <h3 className="text-xl font-bold font-display mb-2">{edu.degree}</h3>
                                <p className="text-secondary font-medium mb-2">{edu.institution}</p>
                                <p className="text-sm text-on-surface-variant mb-3">{edu.year}</p>
                                <p className="text-on-surface-variant">{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold font-display mb-6 text-primary">Technical Skills</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20">
                            <h3 className="text-xl font-bold font-display mb-4 text-primary">Design Tools</h3>
                            <div className="space-y-2">
                                {skills.design.map((skill) => (
                                    <div key={skill} className="px-3 py-2 bg-surface/80 rounded-lg text-sm">{skill}</div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-3xl border border-secondary/20">
                            <h3 className="text-xl font-bold font-display mb-4 text-secondary">Development</h3>
                            <div className="space-y-2">
                                {skills.development.map((skill) => (
                                    <div key={skill} className="px-3 py-2 bg-surface/80 rounded-lg text-sm">{skill}</div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-tertiary/10 to-tertiary/5 rounded-3xl border border-tertiary/20">
                            <h3 className="text-xl font-bold font-display mb-4 text-tertiary">Tools & Platforms</h3>
                            <div className="space-y-2">
                                {skills.tools.map((skill) => (
                                    <div key={skill} className="px-3 py-2 bg-surface/80 rounded-lg text-sm">{skill}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section>
                    <h2 className="text-3xl font-bold font-display mb-6 text-primary">Key Achievements</h2>
                    <div className="p-8 bg-surface rounded-3xl border border-outline/10">
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🏆</span>
                                <div>
                                    <strong>50+ Successful Projects</strong>
                                    <p className="text-on-surface-variant">Delivered diverse projects across graphic design and web development</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">⭐</span>
                                <div>
                                    <strong>100% Client Satisfaction</strong>
                                    <p className="text-on-surface-variant">Maintained perfect satisfaction rate with high repeat business</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🚀</span>
                                <div>
                                    <strong>Open Source Contributor</strong>
                                    <p className="text-on-surface-variant">Active contributor to web development community and open-source projects</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
