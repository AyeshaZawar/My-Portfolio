import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  MapPin,
  CheckCircle2,
  Building
} from 'lucide-react';

interface SubEducationItem {
  stage: string;
  year: string;
  institution: string;
  group: string;
  description: string;
}

interface TimelineItem {
  id: string;
  type: 'education' | 'experience' | 'learning';
  badge: string;
  title: string;
  organization?: string;
  location: string;
  period: string;
  subItems?: SubEducationItem[];
  description?: string;
  highlights?: string[];
  skills: string[];
}

const timelineData: TimelineItem[] = [
  // CARD 1: Matriculation + Intermediate (FSc) in a SINGLE unified card as specifically requested
  {
    id: 'matric-intermediate',
    type: 'education',
    badge: 'Secondary & Higher Secondary',
    title: 'Secondary & Higher Secondary Education',
    period: '2022 — 2024',
    location: 'Karachi, Pakistan',
    subItems: [
      {
        stage: 'Matriculation',
        year: '2022',
        institution: 'Well-Done-Cambridge School',
        group: 'Science Group',
        description: 'Successfully completed Matriculation with Science curriculum, building strong mathematical and scientific problem-solving foundations.',
      },
      {
        stage: 'Intermediate (Higher Secondary Certificate)',
        year: '2024',
        institution: 'Govt-College for Women Saudabad',
        group: 'Pre-Medical',
        description: 'Completed Higher Secondary Certificate (FSc) in Pre-Medical with honors, advancing rigorous analytical reasoning and empirical methodology.',
      },
    ],
    skills: [
      'Well-Done-Cambridge School',
      'Science Group (2022)',
      'Govt-College for Women Saudabad',
      'Pre-Medical (2024)',
      'Higher Secondary Certificate',
    ],
  },

  // CARD 2: Bachelor of Science
  {
    id: 'bachelor-degree',
    type: 'education',
    badge: 'Undergraduate Degree',
    title: 'Bachelor of Science (Pre-Medical)',
    organization: 'Govt. Degree College Malir Cantt Karachi',
    location: 'Malir Cantt, Karachi',
    period: 'Ongoing (Still Study)',
    description: 'Currently pursuing Bachelor of Science at Govt. Degree College Malir Cantt Karachi. Blending academic scientific rigor with modern applied software engineering, digital product architecture, and algorithmic computing.',
    highlights: [
      'Degree: Bachelor of Science (Pre-Medical)',
      'Institution: Govt. Degree College Malir Cantt Karachi',
      'Status: Currently studying with focused academic dedication',
    ],
    skills: [
      'Govt. Degree College Malir Cantt',
      'Bachelor of Science',
      'Pre-Medical',
      'Applied Scientific Research',
      'Undergraduate Studies',
    ],
  },

  // CARD 3: Professional Certificates & AI (Governor House GIAIC + Global Computer Institute)
  {
    id: 'certificates-learning',
    type: 'learning',
    badge: 'Certifications & Applied AI',
    title: 'Professional Certifications & Generative AI Engineering',
    period: '2021 — Present',
    location: 'Karachi, Pakistan',
    subItems: [
      {
        stage: 'Certified Cloud Applied Generative AI Engineer (GenEng)',
        year: '2024 — Still Learning',
        institution: 'Governor House Karachi (GIAIC)',
        group: 'Center: Governor House Karachi',
        description: 'Advanced Cloud Applied AI engineering track focusing on Python, database management (Supabase, SQL, NoSQL), agentic workflows, and production chatbots.',
      },
      {
        stage: 'Global Computer Institute',
        year: '2021',
        institution: 'Global Computer Institute',
        group: 'C.I.T (6 Months) & MS Office (4 Months)',
        description: 'Earned certifications in C.I.T (Certificate in Information Technology - 6 Month Course) and MS Office Professional (4 Month Course), establishing computing mastery.',
      },
    ],
    skills: [
      'GenEng (Governor House)',
      'GIAIC (Still Learning)',
      'Python Programming',
      'Supabase & SQL/NoSQL',
      'Global Computer Institute (2021)',
      'C.I.T (6 Months)',
      'MS Office (4 Months)',
    ],
  },

  // CARD 4: Work Experience at Orivin Global
  {
    id: 'orivin-global-work',
    type: 'experience',
    badge: 'Work Experience',
    title: 'Web Developer',
    organization: 'Orivin Global',
    location: 'Remote',
    period: '2026 (5 Month Remote Job)',
    description: 'Served as Web Developer delivering 6+ production-ready full-stack projects for clients. Built end-to-end web applications, interactive admin dashboards, automated ATS Resume Scoring tools, and conversational AI chatbots.',
    highlights: [
      '5 Month Remote Job at Orivin Global',
      'Delivered 6+ projects: Full-stack websites & premium management dashboards',
      'ATS Resume Scoring algorithms & Job Vacancies applicant tracking',
      'AI Chatbot integration with customized conversational contexts',
    ],
    skills: [
      'Orivin Global',
      '5 Month Remote Job',
      '6+ Projects Delivered',
      'Full-Stack Websites',
      'Premium Dashboards',
      'ATS Resume Scoring',
      'AI Chatbot',
      'Applicant Tracking',
    ],
  },
];

export const TimelineSection: React.FC = () => {
  return (
    <section 
      id="timeline" 
      className="relative w-full min-h-screen bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A] py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden border-t border-[#6F5B43]/30"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[#C8A77A]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-3 mb-4"
          >
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold">
              03 // JOURNEY &amp; MILESTONES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.9] text-[#E9E3DC] mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span>EDUCATION &amp; </span>
            <span className="text-[#C8A77A]">EXPERIENCE.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base font-light text-[#A9A39D] leading-relaxed max-w-2xl mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            A documented chronological record of academic foundation, software development at <strong className="text-[#E9E3DC] font-medium">Orivin Global</strong>, and Cloud Applied GenAI engineering at <strong className="text-[#E9E3DC] font-medium">Governor House Karachi (GIAIC)</strong>.
          </motion.p>
        </div>

        {/* ================= TIMELINE STRUCTURE WITH CONNECTING LINE ================= */}
        <div className="relative w-full max-w-4xl mx-auto py-8">
          
          {/* Vertical Connecting Line with Gold Accent */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C8A77A] via-[#6F5B43]/50 to-transparent pointer-events-none" />

          {/* Timeline Cards */}
          <div className="flex flex-col space-y-12 sm:space-y-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isEducation = item.type === 'education';
              const isExperience = item.type === 'experience';

              const IconComponent = isEducation 
                ? GraduationCap 
                : isExperience 
                  ? Briefcase 
                  : BookOpen;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } group`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-20 w-9 h-9 rounded-full bg-[#151514] border-2 border-[#C8A77A] flex items-center justify-center text-[#C8A77A] shadow-[0_0_15px_rgba(200,167,122,0.35)] group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Spacer for Desktop Alternating Grid */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Timeline Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    isEven ? 'sm:pl-10' : 'sm:pr-10'
                  }`}>
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#151514]/95 border border-[#6F5B43]/40 hover:border-[#C8A77A] backdrop-blur-md shadow-xl hover:shadow-[0_10px_35px_rgba(0,0,0,0.85)] transition-all duration-300">
                      
                      {/* Top Meta Bar: Badge & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                          isEducation 
                            ? 'bg-[#222120] text-[#C8A77A] border-[#6F5B43]/50'
                            : isExperience
                              ? 'bg-[#C8A77A]/15 text-[#C8A77A] border-[#C8A77A]/40'
                              : 'bg-[#222120] text-[#E9E3DC] border-[#6F5B43]/40'
                        }`}>
                          {item.badge}
                        </span>

                        <span className="flex items-center space-x-1.5 text-xs font-mono text-[#A9A39D]">
                          <Calendar className="w-3 h-3 text-[#C8A77A]" />
                          <span>{item.period}</span>
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 
                        className="text-lg sm:text-xl font-bold text-[#E9E3DC] mb-2 tracking-wide uppercase"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.title}
                      </h3>

                      {/* Organization & Location (if single organization) */}
                      {item.organization && (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#C8A77A] mb-4">
                          <span className="font-semibold flex items-center space-x-1">
                            <Building className="w-3.5 h-3.5 text-[#C8A77A]" />
                            <span>{item.organization}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1 text-[#A9A39D]">
                            <MapPin className="w-3 h-3 text-[#C8A77A]" />
                            <span>{item.location}</span>
                          </span>
                        </div>
                      )}

                      {/* If Card has Sub-Items (like Matriculation + Intermediate in 1 Card, or GenAI + Global Computer Institute) */}
                      {item.subItems && item.subItems.length > 0 && (
                        <div className="space-y-4 my-4">
                          {item.subItems.map((sub, sIdx) => (
                            <div 
                              key={sub.stage}
                              className={`p-4 rounded-xl bg-[#0B0B0A]/70 border border-[#6F5B43]/30 ${
                                sIdx > 0 ? 'mt-3' : ''
                              }`}
                            >
                              {/* Sub Header */}
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#C8A77A]" />
                                  <h4 className="text-sm font-bold text-[#E9E3DC] tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {sub.stage}
                                  </h4>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-[#151514] text-[#C8A77A] text-[10px] font-mono border border-[#6F5B43]/40 font-semibold">
                                  {sub.year}
                                </span>
                              </div>

                              {/* Institution & Group Badge */}
                              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#C8A77A] mb-2">
                                <span className="text-[#E9E3DC] font-medium">{sub.institution}</span>
                                <span>•</span>
                                <span className="text-[#A9A39D]">{sub.group}</span>
                              </div>

                              {/* Sub Description */}
                              <p className="text-xs font-light text-[#A9A39D] leading-relaxed">
                                {sub.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Main Description (for non-subItem cards or summary) */}
                      {item.description && (
                        <p className="text-xs sm:text-sm font-light text-[#A9A39D] leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}

                      {/* Highlight Bullets if present */}
                      {item.highlights && (
                        <ul className="space-y-2 text-xs text-[#A9A39D]">
                          {item.highlights.map((point) => (
                            <li key={point} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A77A] mt-0.5 shrink-0" />
                              <span className="text-[#E9E3DC]">{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
