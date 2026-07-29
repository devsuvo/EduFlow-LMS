export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "12:45"
  videoUrl: string; // sample mp4 or embed
  type: 'video' | 'quiz' | 'assignment' | 'article';
  completed?: boolean;
  transcript?: string;
  resources?: { name: string; url: string; size: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Assignment {
  id: string;
  title: string;
  instructions: string;
  dueDate: string;
  totalPoints: number;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  quiz?: Quiz;
  assignment?: Assignment;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  badge: string;
  company: string;
  socials: { twitter?: string; linkedin?: string; github?: string; website?: string };
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  likes: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
  instructor: Instructor;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  durationHours: number;
  totalLessons: number;
  price: number;
  originalPrice: number;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  thumbnail: string;
  trailerVideoUrl: string;
  description: string;
  learningOutcomes: string[];
  requirements: string[];
  tags: string[];
  language: string;
  lastUpdated: string;
  modules: Module[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  coursesCount: number;
  description: string;
  gradient: string;
}

export interface StudentProgress {
  courseId: string;
  completedLessonIds: string[];
  quizScores: Record<string, number>; // quizId -> percentage
  assignmentSubmissions: Record<string, { content: string; submittedAt: string; grade?: number }>;
  lastWatchedLessonId?: string;
  lastWatchedTime?: number;
  notes: Record<string, { timestamp: string; text: string }[]>; // lessonId -> notes
  certificateEarned?: boolean;
  certificateId?: string;
  issuedDate?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  highlight?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  courseTaken: string;
  outcomes: string;
  rating: number;
}

// SAMPLE DATA
export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Programming & Web Dev',
    slug: 'programming',
    icon: 'Code',
    coursesCount: 1420,
    description: 'Master JavaScript, Next.js, Python, Rust, and modern web architectures.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'cat-2',
    name: 'AI & Data Science',
    slug: 'ai-machine-learning',
    icon: 'Sparkles',
    coursesCount: 980,
    description: 'Explore LLMs, Gemini API, PyTorch, Deep Learning, and Computer Vision.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'cat-3',
    name: 'Business & Leadership',
    slug: 'business',
    icon: 'Briefcase',
    coursesCount: 750,
    description: 'Learn Product Management, Venture Capital, Agile, and Executive Finance.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'cat-4',
    name: 'UI/UX & Product Design',
    slug: 'design',
    icon: 'Palette',
    coursesCount: 620,
    description: 'Figma mastery, Design Systems, Spatial UI, and Motion Graphics.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'cat-5',
    name: 'Marketing & Growth',
    slug: 'marketing',
    icon: 'TrendingUp',
    coursesCount: 510,
    description: 'SEO strategy, Content Funnels, Paid Media, and Brand Positioning.',
    gradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'cat-6',
    name: 'Finance & Crypto',
    slug: 'finance',
    icon: 'DollarSign',
    coursesCount: 430,
    description: 'Algorithmic Trading, Corporate Valuation, Fintech, and Personal Wealth.',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Senior AI Research Scientist & Ex-Google DeepMind',
    avatar: 'https://picsum.photos/seed/sarah_inst/200/200',
    bio: 'Passionate computer science educator with over 12 years of research and industrial experience in Artificial Intelligence, Neural Networks, and Natural Language Processing.',
    rating: 4.95,
    studentsCount: 128400,
    coursesCount: 8,
    badge: 'Top Educator',
    company: 'Ex-Google DeepMind',
    socials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: 'inst-2',
    name: 'Alex Rivera',
    title: 'Principal Engineer & Next.js Core Contributor',
    avatar: 'https://picsum.photos/seed/alex_inst/200/200',
    bio: 'Full-stack software architect building high-scale cloud platforms. Taught over 95,000 students worldwide modern web architecture and TypeScript mastery.',
    rating: 4.92,
    studentsCount: 95300,
    coursesCount: 6,
    badge: 'Bestseller Author',
    company: 'Vercel Ecosystem',
    socials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com', github: 'https://github.com' },
  },
  {
    id: 'inst-3',
    name: 'Elena Rostova',
    title: 'Lead Product Designer & Design Systems Director',
    avatar: 'https://picsum.photos/seed/elena_inst/200/200',
    bio: 'Design Director specializing in enterprise design systems, spatial computing, and human-computer interaction. Formerly at Airbnb & Stripe Design.',
    rating: 4.88,
    studentsCount: 64200,
    coursesCount: 5,
    badge: 'Design Visionary',
    company: 'Ex-Stripe Design',
    socials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
  },
  {
    id: 'inst-4',
    name: 'Marcus Vance',
    title: 'VP of Product Strategy & Tech Investor',
    avatar: 'https://picsum.photos/seed/marcus_inst/200/200',
    bio: 'Product executive who has led product teams at multi-billion dollar tech companies. Specializes in scaling products from zero to 100M+ active users.',
    rating: 4.91,
    studentsCount: 48900,
    coursesCount: 4,
    badge: 'Enterprise Coach',
    company: 'Silicon Valley Growth',
    socials: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
  },
];

export const COURSES: Course[] = [
  {
    id: 'c-1',
    slug: 'nextjs-15-mastery',
    title: 'Next.js 15 Full-Stack Enterprise Blueprint: Server Actions & Architecture',
    subtitle: 'Build production-ready web apps with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, and Server Side AI API Integration.',
    category: 'Programming & Web Dev',
    subcategory: 'Full-Stack Development',
    instructor: INSTRUCTORS[1],
    level: 'Intermediate',
    durationHours: 32,
    totalLessons: 48,
    price: 89.99,
    originalPrice: 199.99,
    isBestseller: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 3840,
    enrolledCount: 28450,
    thumbnail: 'https://picsum.photos/seed/nextjs_course/800/500',
    trailerVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: `Master Next.js 15 from scratch to advanced production deployments. This comprehensive curriculum covers App Router, Server Components vs Client Components, Server Actions, Dynamic Data Caching, Authentication, Edge Middleware, and AI API Proxies.

Through real-world project builds, you will craft scalable enterprise applications equipped with dark mode, responsive layouts, optimistic UI updates, and robust error boundaries.`,
    learningOutcomes: [
      'Architect full-stack Next.js 15 applications using App Router and Server Components',
      'Implement secure authentication, cookie management, and role-based authorization',
      'Optimize performance to achieve 98+ Google Lighthouse scores',
      'Integrate Server-Side AI models like Gemini 3.6 Flash safely with API proxy routes',
      'Deploy to cloud environments with automated CI/CD and zero downtime',
    ],
    requirements: [
      'Basic understanding of HTML, CSS, and modern JavaScript (ES6+)',
      'Familiarity with basic React concepts (hooks, state, props)',
      'A computer running Mac, Windows, or Linux with Node.js installed',
    ],
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Full Stack', 'Web Architecture'],
    language: 'English',
    lastUpdated: 'July 2026',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Introduction to Next.js 15 & Modern Web Paradigms',
        duration: '2h 15m',
        lessons: [
          {
            id: 'les-1',
            title: 'Welcome to Next.js 15 Enterprise Blueprint',
            duration: '08:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video',
            completed: true,
            transcript: 'Welcome to this course! In this video, we outline the roadmap, tools, and real-world projects we will build step-by-step.',
            resources: [{ name: 'Course-Roadmap.pdf', url: '#', size: '1.2 MB' }],
          },
          {
            id: 'les-2',
            title: 'App Router vs Pages Router Architecture',
            duration: '14:45',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            type: 'video',
            completed: true,
            transcript: 'Understanding the fundamentals of App Router, file-based routing, layout inheritance, and parallel routes in React 19.',
          },
          {
            id: 'les-3',
            title: 'Server Components Deep Dive & Hydration',
            duration: '18:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            type: 'video',
            completed: false,
            transcript: 'Why Server Components reduce client bundle size to near zero and eliminate client-side state synchronization overhead.',
          },
        ],
        quiz: {
          id: 'q-mod-1',
          title: 'Module 1 Assessment: Next.js 15 Core Concepts',
          questions: [
            {
              id: 'q1',
              question: 'Which component type is rendered by default in Next.js 15 App Router?',
              options: ['Client Component', 'Server Component', 'Hybrid Component', 'Static Component'],
              correctAnswer: 1,
              explanation: 'In Next.js App Router, all components inside the app directory are Server Components by default unless explicitly marked with "use client".',
            },
            {
              id: 'q2',
              question: 'Where should sensitive API keys like GEMINI_API_KEY be stored and accessed?',
              options: ['In NEXT_PUBLIC_ env variables on the client', 'Only in server-side process.env and proxy routes', 'In localStorage on the browser', 'In public metadata.json'],
              correctAnswer: 1,
              explanation: 'Private API keys must remain strictly server-side inside process.env without NEXT_PUBLIC_ prefix to prevent exposing credentials.',
            },
          ],
        },
      },
      {
        id: 'mod-2',
        title: 'Module 2: Server Actions, Data Mutation & Caching',
        duration: '4h 30m',
        lessons: [
          {
            id: 'les-4',
            title: 'Building Safe Server Actions with Zod Validation',
            duration: '22:15',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            type: 'video',
            completed: false,
            transcript: 'How to write typed server actions, handle revalidation with revalidatePath and revalidateTag, and validate schema with Zod.',
          },
          {
            id: 'les-5',
            title: 'Optimistic UI Updates with React useOptimistic Hook',
            duration: '16:50',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            type: 'video',
            completed: false,
          },
        ],
        assignment: {
          id: 'assign-1',
          title: 'Assignment 1: Build a Server Action-Powered Task Board',
          instructions: 'Implement a full-stack task manager using Server Actions with instant optimistic state updates and Zod validation. Submit your GitHub URL or code snippet.',
          dueDate: '3 Days Remaining',
          totalPoints: 100,
        },
      },
      {
        id: 'mod-3',
        title: 'Module 3: AI Integration & Production Security',
        duration: '3h 45m',
        lessons: [
          {
            id: 'les-6',
            title: 'Proxying Gemini 3.6 Flash Server-Side with @google/genai',
            duration: '25:30',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4',
            type: 'video',
            completed: false,
          },
          {
            id: 'les-7',
            title: 'Enterprise Deployment & Performance Optimization',
            duration: '20:10',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            type: 'video',
            completed: false,
          },
        ],
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        user: 'David Chen',
        avatar: 'https://picsum.photos/seed/dchen/100/100',
        rating: 5,
        date: '2 days ago',
        comment: 'Hands down the best Next.js course I have ever taken. Alex explains deep architecture concepts with crystal clarity.',
        likes: 24,
      },
      {
        id: 'rev-2',
        user: 'Sophia Williams',
        avatar: 'https://picsum.photos/seed/swill/100/100',
        rating: 5,
        date: '1 week ago',
        comment: 'The module on Server Actions and AI Proxying completely transformed how our team builds enterprise web apps!',
        likes: 18,
      },
    ],
  },
  {
    id: 'c-2',
    slug: 'generative-ai-gemini-masterclass',
    title: 'Generative AI & LLM Systems Engineering with Gemini 3.6',
    subtitle: 'Build autonomous AI agents, multimodal search engines, RAG pipelines, and real-time audio applications using @google/genai SDK.',
    category: 'AI & Data Science',
    subcategory: 'Generative AI',
    instructor: INSTRUCTORS[0],
    level: 'Advanced',
    durationHours: 28,
    totalLessons: 42,
    price: 94.99,
    originalPrice: 229.99,
    isBestseller: true,
    isFeatured: true,
    rating: 4.96,
    reviewsCount: 2910,
    enrolledCount: 19800,
    thumbnail: 'https://picsum.photos/seed/genai_course/800/500',
    trailerVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: `Unlock the full capability of Google Gemini 3.6 Flash and Pro models. This course teaches developers how to engineer production-ready AI applications with structured JSON output, function calling tools, grounding with Google Search & Maps, audio synthesis, and streaming UI state.`,
    learningOutcomes: [
      'Design robust LLM prompt templates and system instructions for reliable outputs',
      'Implement function calling tools to connect Gemini with live external APIs',
      'Build real-time RAG (Retrieval-Augmented Generation) applications with vector embeddings',
      'Construct interactive streaming chat interfaces with Server-Sent Events',
      'Deploy AI agents with error retry mechanics and rate limit fallback logic',
    ],
    requirements: [
      'Intermediate knowledge of JavaScript or TypeScript',
      'Basic understanding of HTTP APIs and async programming',
    ],
    tags: ['Generative AI', 'Gemini API', 'LLMs', 'Python', 'TypeScript', 'AI Agents'],
    language: 'English',
    lastUpdated: 'July 2026',
    modules: [
      {
        id: 'mod-gen-1',
        title: 'Module 1: Foundations of Gemini 3.6 Architecture & SDK',
        duration: '3h 10m',
        lessons: [
          {
            id: 'les-gen-1',
            title: 'Overview of @google/genai & Model Selection Rules',
            duration: '15:20',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video',
            completed: false,
          },
          {
            id: 'les-gen-2',
            title: 'Structured Outputs with Type Schemas & JSON Enforcements',
            duration: '22:40',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            type: 'video',
            completed: false,
          },
        ],
      },
    ],
    reviews: [
      {
        id: 'rev-gen-1',
        user: 'Marcus Vance',
        avatar: 'https://picsum.photos/seed/m_user/100/100',
        rating: 5,
        date: '3 days ago',
        comment: 'Dr. Jenkins presents advanced AI topics with incredible depth and practical clarity. Essential for any AI developer!',
        likes: 31,
      },
    ],
  },
  {
    id: 'c-3',
    slug: 'figma-design-systems-2026',
    title: 'Enterprise Design Systems in Figma & Spatial UI Architecture',
    subtitle: 'Construct scalable tokenized design systems, component libraries, variable modes, and accessible UI kits for web & mobile apps.',
    category: 'UI/UX & Product Design',
    subcategory: 'Design Systems',
    instructor: INSTRUCTORS[2],
    level: 'All Levels',
    durationHours: 24,
    totalLessons: 36,
    price: 79.99,
    originalPrice: 179.99,
    isBestseller: false,
    isFeatured: true,
    rating: 4.88,
    reviewsCount: 1950,
    enrolledCount: 14200,
    thumbnail: 'https://picsum.photos/seed/figma_course/800/500',
    trailerVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: `Learn how leading tech companies like Stripe, Apple, and Airbnb build and maintain global design systems. Master Figma variables, auto-layout 5.0, dark mode tokens, accessibility contrast ratios, and developer handoff workflows.`,
    learningOutcomes: [
      'Create design tokens for typography, color scales, spacing, and elevation',
      'Build complex nested components with auto-layout and interactive variants',
      'Ensure WCAG 2.2 AA accessibility compliance across all UI components',
      'Establish seamless developer handoff documentation with component props matching React code',
    ],
    requirements: ['Free or Paid Figma account', 'Basic understanding of UI design concepts'],
    tags: ['Figma', 'Design Systems', 'UI/UX', 'Accessibility', 'Tokens'],
    language: 'English',
    lastUpdated: 'June 2026',
    modules: [],
    reviews: [],
  },
  {
    id: 'c-4',
    slug: 'product-management-executive',
    title: 'Product Management Strategy & Tech Leadership Masterclass',
    subtitle: 'From Product Vision to Market Dominance: Learn roadmapping, metrics, customer discovery, and stakeholder alignment.',
    category: 'Business & Leadership',
    subcategory: 'Product Strategy',
    instructor: INSTRUCTORS[3],
    level: 'Intermediate',
    durationHours: 20,
    totalLessons: 30,
    price: 69.99,
    originalPrice: 149.99,
    isBestseller: true,
    isFeatured: false,
    rating: 4.91,
    reviewsCount: 1420,
    enrolledCount: 11300,
    thumbnail: 'https://picsum.photos/seed/biz_course/800/500',
    trailerVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: `A battle-tested playbook for current and aspiring product managers. Learn how to run user interviews, prioritize features using RICE and Kano frameworks, define north star metrics, and work effortlessly with engineering leaders.`,
    learningOutcomes: [
      'Develop compelling product strategy documents and 12-month roadmaps',
      'Conduct high-impact customer discovery interviews that surface real insights',
      'Analyze product telemetry with retention curves and cohort metrics',
    ],
    requirements: ['Interest in product development and team leadership'],
    tags: ['Product Management', 'Strategy', 'Leadership', 'Roadmaps', 'Agile'],
    language: 'English',
    lastUpdated: 'May 2026',
    modules: [],
    reviews: [],
  },
];

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  courseId: 'c-1',
  completedLessonIds: ['les-1', 'les-2'],
  quizScores: {
    'q-mod-1': 100,
  },
  assignmentSubmissions: {},
  lastWatchedLessonId: 'les-3',
  lastWatchedTime: 120, // seconds
  notes: {
    'les-1': [
      { timestamp: '02:15', text: 'App Router is file-system based routing inside the app directory.' },
      { timestamp: '05:40', text: 'Server components run on server and send HTML stream to browser.' },
    ],
  },
  certificateEarned: true,
  certificateId: 'EDU-2026-948271',
  issuedDate: 'July 28, 2026',
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    tagline: 'Ideal for curious learners testing the waters.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Access to 50+ Free Introductory Courses',
      'Public Discussion Forums',
      'Community Q&A Access',
      'Mobile App Preview View',
      'Standard Video Resolution (720p)',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Learner',
    tagline: 'Everything you need to level up your career fast.',
    monthlyPrice: 29,
    annualPrice: 24, // $24/mo billed annually
    popular: true,
    highlight: 'Most Popular',
    features: [
      'Unlimited Access to 5,000+ Premium Courses',
      'Verified Certificates of Completion',
      'AI Learning Assistant (Unlimited Q&A)',
      'Interactive Quizzes & Hands-on Code Playgrounds',
      'Offline Lesson Downloads (Mobile & Web)',
      '1080p / 4K Ultra HD Streaming',
      'Priority Support & Q&A Response',
    ],
  },
  {
    id: 'business',
    name: 'Business & Teams',
    tagline: 'For companies and corporate training teams scaling up.',
    monthlyPrice: 79,
    annualPrice: 65,
    features: [
      'Everything in Pro for up to 10 Team Seats',
      'Admin Analytics & Skill Matrix Dashboard',
      'Custom Branded Course Certificates',
      'Dedicated Customer Success Manager',
      'Single Sign-On (SSO) & SOC2 Security Suite',
      'API Access for HRIS & LMS Sync',
      'Custom Internal Course Builder',
    ],
  },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    name: 'Rachel Adams',
    role: 'Senior Full-Stack Engineer',
    company: 'Stripe',
    avatar: 'https://picsum.photos/seed/rachel_story/200/200',
    quote: 'EduFlow LMS helped me bridge the gap between intermediate React and enterprise Next.js architecture. The AI tutor was like having a staff engineer available 24/7.',
    courseTaken: 'Next.js 15 Full-Stack Enterprise Blueprint',
    outcomes: 'Promoted to Senior Engineer with 40% salary bump',
    rating: 5,
  },
  {
    id: 'story-2',
    name: 'Michael Chang',
    role: 'AI Product Lead',
    company: 'OpenAI Ecosystem',
    avatar: 'https://picsum.photos/seed/m_story/200/200',
    quote: 'The Generative AI course provided deep technical mechanics rather than surface-level API calls. I built my first AI agent startup directly from the course modules.',
    courseTaken: 'Generative AI & LLM Systems Engineering',
    outcomes: 'Raised $1.5M Seed Round for AI Startup',
    rating: 5,
  },
  {
    id: 'story-3',
    name: 'Sophia Patel',
    role: 'Principal Product Designer',
    company: 'Figma',
    avatar: 'https://picsum.photos/seed/sophia_story/200/200',
    quote: 'As a self-taught designer, EduFlow gave me structured learning paths, real peer feedback, and industry-standard design system blueprints.',
    courseTaken: 'Enterprise Design Systems in Figma',
    outcomes: 'Landed Lead Designer position at top tech firm',
    rating: 5,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Next.js 15 and Server Actions Are Redefining Modern Web Performance',
    excerpt: 'Explore how React 19 compiler optimization, zero-bundle server components, and native server actions eliminate client-side state latency.',
    category: 'Technology',
    author: 'Alex Rivera',
    authorAvatar: 'https://picsum.photos/seed/alex_inst/100/100',
    date: 'July 22, 2026',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/blog_nextjs/800/400',
    content: `Modern web engineering has reached a pivotal milestone. With Next.js 15 and React 19, developers no longer need to choose between server-rendered fast initial loads and rich client interactivity...`,
  },
  {
    id: 'blog-2',
    title: 'The Future of AI-Powered Personalization in Enterprise Learning Systems',
    excerpt: 'How multi-modal LLMs, intelligent flashcard generation, and adaptive quiz engines double student retention rates.',
    category: 'AI in Education',
    author: 'Dr. Sarah Jenkins',
    authorAvatar: 'https://picsum.photos/seed/sarah_inst/100/100',
    date: 'July 18, 2026',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/blog_ai/800/400',
    content: `Education is transitioning from one-size-fits-all static lectures to hyper-personalized AI tutors that adapt to every student's unique learning rhythm...`,
  },
  {
    id: 'blog-3',
    title: 'Building Accessible Design Systems: A WCAG 2.2 AA Practical Guide',
    excerpt: 'Practical rules for color contrast math, focus ring states, dynamic typography scales, and keyboard navigation in complex web applications.',
    category: 'UI/UX Design',
    author: 'Elena Rostova',
    authorAvatar: 'https://picsum.photos/seed/elena_inst/100/100',
    date: 'July 10, 2026',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/blog_design/800/400',
    content: `Accessibility is not a feature toggle; it is a core structural requirement. In this guide, we walk through building tokenized design systems that pass WCAG 2.2 criteria out of the box...`,
  },
];

export const FAQS = [
  {
    q: 'What is EduFlow LMS and how does subscription work?',
    a: 'EduFlow LMS is a complete enterprise learning ecosystem. You can purchase individual courses lifetime or subscribe to the Pro/Business plans for unlimited access to our entire catalog of 5,000+ courses, interactive AI assistant, and downloadable certificates.',
  },
  {
    q: 'Are certificates verified and shareable on LinkedIn?',
    a: 'Yes! Every certificate issued by EduFlow LMS contains a unique digital verification ID and QR code that can be verified publicly by recruiters or embedded directly onto your LinkedIn profile and resume.',
  },
  {
    q: 'How does the AI Learning Assistant work?',
    a: 'EduFlow AI is powered by server-side Gemini 3.6 models. It understands the exact lesson transcript, code context, and quiz material you are currently studying, allowing you to ask instant questions, generate customized quizzes, or summarize study notes.',
  },
  {
    q: 'Can instructors monetize and host custom courses?',
    a: 'Absolutely! Instructors get access to our drag-and-drop Course Builder, video streaming hosting, automated quiz engines, student communication tools, coupon manager, and real-time revenue analytics dashboard.',
  },
  {
    q: 'Do you offer team and enterprise pricing for corporate training?',
    a: 'Yes, our Business & Enterprise plans include seat management, single sign-on (SSO), skill gap analytics, custom certificate branding, and dedicated LMS migration assistance.',
  },
];
