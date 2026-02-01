import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import bcrypt from "bcryptjs";

async function seed() {
    try {
        // Dynamic imports to ensure env vars are loaded first
        const { default: connectDB } = await import("@/lib/mongodb");
        const { User } = await import("@/models/User");
        const { Project } = await import("@/models/Project");
        const { Testimonial } = await import("@/models/Testimonial");
        const { Status } = await import("@/models/Status");
        const { BrainDump } = await import("@/models/BrainDump");

        await connectDB();
        console.log("🔗 Connected to MongoDB");

        // Clear existing data (optional - comment out if you want to preserve data)
        await Promise.all([
            User.deleteMany({}),
            Project.deleteMany({}),
            Testimonial.deleteMany({}),
            Status.deleteMany({}),
            BrainDump.deleteMany({}),
        ]);
        console.log("🗑️  Cleared existing data");

        // 1. Create Admin User
        const hashedPassword = await bcrypt.hash("admin123", 12);
        const admin = await User.create({
            name: "Muḥammed Navār",
            email: "[EMAIL_ADDRESS]",
            password: hashedPassword,
            role: "admin",
        });
        console.log("👤 Admin user created");

        // 2. Set Status
        await Status.create({
            availableForFreelance: true,
            openForHire: true,
            statusMessage: "Currently open for new freelance projects and full-time opportunities!",
        });
        console.log("✅ Status set");

        // 3. Sample Projects
        const projects = await Project.insertMany([
            {
                title: "EcoTech Brand Identity",
                slug: "ecotech-brand-identity",
                description: "Complete visual identity system for a sustainable technology startup, including logo, color palette, typography, and brand guidelines.",
                category: "graphic-design",
                subcategory: "branding",
                client: "EcoTech Solutions",
                isFreelance: true,
                coverImage: "https://via.placeholder.com/800x600/4ade80/ffffff?text=EcoTech+Branding",
                media: [
                    "https://via.placeholder.com/800x600/4ade80/ffffff?text=Logo",
                    "https://via.placeholder.com/800x600/4ade80/ffffff?text=Brand+Guide",
                ],
                tools: ["Illustrator", "Photoshop", "Figma"],
                featured: true,
                order: 1,
            },
            {
                title: "Portfolio Website 2024",
                slug: "portfolio-website-2024",
                description: "Modern portfolio website built with Next.js 15, featuring dynamic theming, custom animations, and MongoDB integration.",
                category: "web-development",
                subcategory: "portfolio",
                isFreelance: false,
                coverImage: "https://via.placeholder.com/800x600/6366f1/ffffff?text=Portfolio+2024",
                media: [
                    "https://via.placeholder.com/800x600/6366f1/ffffff?text=Hero",
                    "https://via.placeholder.com/800x600/6366f1/ffffff?text=Projects",
                ],
                techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB"],
                liveUrl: "https://navarmp.com",
                repoUrl: "https://github.com/navarmp/portfolio",
                featured: true,
                order: 2,
            },
            {
                title: "Social Media Campaign",
                slug: "social-media-campaign",
                description: "Social media graphics and marketing materials for a product launch campaign across Instagram, Facebook, and LinkedIn.",
                category: "graphic-design",
                subcategory: "social-media",
                client: "TechFlow Inc",
                isFreelance: true,
                coverImage: "https://via.placeholder.com/800x600/ec4899/ffffff?text=Social+Campaign",
                media: ["https://via.placeholder.com/800x600/ec4899/ffffff?text=Instagram+Post"],
                tools: ["Photoshop", "Illustrator", "Canva"],
                featured: false,
                order: 3,
            },
            {
                title: "E-Commerce Platform",
                slug: "ecommerce-platform",
                description: "Full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard.",
                category: "web-development",
                subcategory: "e-commerce",
                client: "Urban Wear",
                isFreelance: true,
                coverImage: "https://via.placeholder.com/800x600/f59e0b/ffffff?text=E-Commerce",
                media: ["https://via.placeholder.com/800x600/f59e0b/ffffff?text=Shop"],
                techStack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
                liveUrl: "https://urbanwear-demo.com",
                featured: false,
                order: 4,
            },
        ]);
        console.log(`📦 ${projects.length} projects created`);

        // 4. Sample Testimonials
        const testimonials = await Testimonial.insertMany([
            {
                clientName: "Sarah Johnson",
                company: "EcoTech Solutions",
                role: "CEO",
                testimonial: "Navār's branding work exceeded our expectations. The visual identity perfectly captures our mission and values. Highly professional!",
                rating: 5,
                projectRef: projects[0]._id,
                order: 1,
            },
            {
                clientName: "Michael Chen",
                company: "TechFlow Inc",
                role: "Marketing Director",
                testimonial: "The social media campaign graphics were stunning. Engagement rates increased by 300% after launching the new visuals.",
                rating: 5,
                projectRef: projects[2]._id,
                order: 2,
            },
            {
                clientName: "Emma Rodriguez",
                company: "Urban Wear",
                role: "Founder",
                testimonial: "Our e-commerce platform is not just functional—it's beautiful. Navār delivered a seamless shopping experience for our customers.",
                rating: 5,
                projectRef: projects[3]._id,
                order: 3,
            },
        ]);
        console.log(`💬 ${testimonials.length} testimonials created`);

        // 5. Sample Blog Posts
        const posts = await BrainDump.insertMany([
            {
                title: "Why Design Systems Matter in 2024",
                slug: "why-design-systems-matter-2024",
                content: `Design systems are no longer optional—they're essential for modern web development. Here's why:

## Consistency Across Products
A design system ensures every component, color, and interaction follows the same principles.

## Faster Development
Reusable components mean you're not reinventing the wheel for every project.

## Better Collaboration
Designers and developers speak the same language when using a shared system.

Start building your design system today with tools like Figma, Storybook, and Tailwind CSS.`,
                excerpt: "Design systems are essential for modern web development. Here's why they matter more than ever.",
                tags: ["Design", "Web Development", "UI/UX"],
                published: true,
                readTime: 5,
            },
            {
                title: "My Workflow: From Figma to Next.js",
                slug: "workflow-figma-to-nextjs",
                content: `Let me walk you through my design-to-code workflow that delivers pixel-perfect results every time.

## Step 1: Design in Figma
Start with a comprehensive design system in Figma with components, variants, and auto-layout.

## Step 2: Component Mapping
Map Figma components to React components before writing any code.

## Step 3: Build with Tailwind
Use Tailwind CSS to match Figma styles exactly—spacing, colors, typography.

## Step 4: Add Interactions
Enhance with GSAP for smooth animations and transitions.

This workflow has saved me countless hours and ensures design fidelity.`,
                excerpt: "A deep dive into my process for converting Figma designs into production-ready Next.js applications.",
                tags: ["Workflow", "Figma", "Next.js", "React"],
                published: true,
                readTime: 7,
            },
            {
                title: "The Future of AI in Design",
                slug: "future-ai-in-design",
                content: "Draft article about AI tools and their impact on design workflows...",
                excerpt: "Exploring how AI is transforming the creative industry.",
                tags: ["AI", "Design", "Future"],
                published: false,
                readTime: 10,
            },
        ]);
        console.log(`📝 ${posts.length} blog posts created`);

        console.log("\n✨ Seed data created successfully!\n");
        console.log("📋 Summary:");
        console.log(`   - Admin: ${admin.email} / admin123`);
        console.log(`   - Projects: ${projects.length}`);
        console.log(`   - Testimonials: ${testimonials.length}`);
        console.log(`   - Blog Posts: ${posts.length} (${posts.filter(p => p.published).length} published)`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}

seed();
