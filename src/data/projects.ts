export interface Project {
  customer: string;
  title: string;
  description: string[];
  primary_tags: string[];
  tags: string[];
}

export interface ProjectsData {
  projects: Project[];
}

export const projectsData: ProjectsData = {
  "projects": [
    {
      "customer": "ChatYourData GmbH",
      "title": "AI Playground",
      "description": [
        "ChatYourData, an innovative technology company, is collaborating with Kreuz & Partner, an AI consulting firm, to develop cutting-edge AI solutions. Together, we're building a demonstration platform called \"Playground\" that showcases the potential of AI and highlights the services we offer.",
        "As a key developer on the Playground project, I was responsible for the entire development process, from the initial concept to the final deployment. The platform enables users to experiment with various AI applications, such as creating AI experts from uploaded documents, generating images, and defining custom AI scenarios.",
        "To ensure flexibility and scalability, the Playground platform is designed to support multiple tenants, allowing each customer to have their own dedicated workspace. Furthermore, each tenant can be divided into multiple areas, enabling different departments within an organization to have their own private spaces while still being able to share relevant information."
      ],
      "primary_tags": [
        "AI",
        "LLM", 
        "No Code"
      ],
      "tags": [
        "Anthropic AI",
        "Black Forest Labs",
        "Claude 3 Haiku",
        "Claude 3.5 Sonnet",
        "Claude 3 Opus",
        "ComfyUI",
        "Flux.1 [dev]",
        "Flux.1 [schnell]",
        "OpenAI",
        "OpenAI GPT-4o",
        "OpenAI GPT-4o-mini",
        "Postgres",
        "Pydantic",
        "React",
        "JavaScript",
        "Streamlit",
        "Stable Diffusion 3",
        "Supabase",
        "Next.js",
        "TypeScript",
        "Material UI",
        "FastAPI",
        "Python"
      ]
    },
    {
      "customer": "ChatYourData GmbH",
      "title": "Dashboard",
      "description": [
        "ChatYourData's dashboard serves as the central hub for managing all AI services and tools offered by the company. This comprehensive platform allows administrators to oversee various AI models, track usage statistics, manage user accounts, and configure different AI playground environments.",
        "The dashboard provides a clean and intuitive interface for monitoring system performance, analyzing user behavior, and managing resource allocation across different AI services. It includes features for real-time monitoring, automated reporting, and seamless integration with multiple AI providers.",
        "As the lead developer, I designed and implemented the entire dashboard architecture, ensuring scalability, security, and user-friendly operation. The platform supports multi-tenant functionality and provides detailed analytics for business intelligence purposes."
      ],
      "primary_tags": [
        "Dashboard",
        "Analytics",
        "Admin Panel"
      ],
      "tags": [
        "React",
        "TypeScript",
        "Material UI",
        "Next.js",
        "Supabase",
        "Postgres",
        "FastAPI",
        "Python",
        "Real-time monitoring",
        "Business Intelligence",
        "Multi-tenant",
        "Analytics",
        "User Management"
      ]
    },
    {
      "customer": "DMG Mori",
      "title": "SharePoint Migration",
      "description": [
        "Led a comprehensive SharePoint migration project for DMG Mori, a global leader in machine tool manufacturing. The project involved migrating legacy systems to modern SharePoint Online infrastructure while ensuring minimal downtime and data integrity.",
        "The migration encompassed multiple business units across different geographical locations, requiring careful planning and coordination. I developed custom migration scripts, implemented data validation processes, and created comprehensive documentation for the new system.",
        "Successfully migrated over 500GB of business-critical data, including documents, workflows, and user permissions, while maintaining full compliance with enterprise security standards and ensuring seamless user adoption through training and support."
      ],
      "primary_tags": [
        "Migration",
        "SharePoint",
        "Enterprise"
      ],
      "tags": [
        "SharePoint Online",
        "Microsoft 365",
        "PowerShell",
        "Data Migration",
        "Enterprise Architecture",
        "Business Process",
        "Change Management",
        "Documentation",
        "Training",
        "Security Compliance"
      ]
    },
    {
      "customer": "DMG Mori", 
      "title": "Intranet Modernization",
      "description": [
        "Modernized DMG Mori's corporate intranet platform to improve employee communication, knowledge sharing, and operational efficiency. The project involved redesigning the information architecture and implementing modern collaboration tools.",
        "Developed a user-centric design approach, conducting extensive user research and feedback sessions to understand employee needs and pain points. Implemented responsive design principles to ensure optimal user experience across all devices and platforms.",
        "The new intranet platform resulted in a 40% increase in employee engagement and significantly improved information findability. Integrated advanced search capabilities, social collaboration features, and automated content management workflows."
      ],
      "primary_tags": [
        "Intranet",
        "UX/UI",
        "Collaboration"
      ],
      "tags": [
        "SharePoint",
        "User Experience",
        "Information Architecture",
        "Responsive Design",
        "Employee Engagement",
        "Search Optimization",
        "Social Collaboration",
        "Content Management",
        "Workflow Automation",
        "Change Management"
      ]
    },
    {
      "customer": "DMG Mori",
      "title": "Digital Workplace Setup", 
      "description": [
        "Implemented a comprehensive digital workplace solution for DMG Mori, focusing on improving remote collaboration capabilities and streamlining business processes. The project included setting up integrated communication tools and productivity platforms.",
        "Designed and deployed a unified digital workspace that seamlessly connects employees across global offices. Implemented single sign-on (SSO) solutions, automated workflow processes, and integrated communication tools to enhance productivity.",
        "The digital workplace transformation resulted in improved cross-team collaboration, reduced operational overhead, and enhanced employee satisfaction. Provided extensive training and change management support to ensure successful adoption across the organization."
      ],
      "primary_tags": [
        "Digital Workplace",
        "Remote Work",
        "Productivity"
      ],
      "tags": [
        "Microsoft 365",
        "Teams",
        "Single Sign-On",
        "Workflow Automation",
        "Change Management",
        "Remote Collaboration",
        "Employee Training",
        "Business Process",
        "Productivity Tools",
        "Global Deployment"
      ]
    },
    {
      "customer": "DMG Mori",
      "title": "Business Process Automation",
      "description": [
        "Developed and implemented automated business process solutions for DMG Mori to streamline operations and reduce manual work. The project focused on identifying repetitive tasks and creating intelligent automation workflows.",
        "Analyzed existing business processes across multiple departments and designed custom automation solutions using Power Platform and other Microsoft technologies. Implemented approval workflows, document management automation, and data integration processes.",
        "Successfully automated over 50 business processes, resulting in a 60% reduction in manual processing time and significantly improved accuracy. Provided comprehensive documentation and training to ensure sustainable operation and maintenance."
      ],
      "primary_tags": [
        "Automation",
        "Business Process",
        "Efficiency"
      ],
      "tags": [
        "Power Platform",
        "Power Automate",
        "Power Apps",
        "SharePoint",
        "Business Intelligence",
        "Workflow Design",
        "Process Optimization",
        "Documentation",
        "Training",
        "Maintenance"
      ]
    },
    {
      "customer": "Freelance",
      "title": "E-Learning Platform",
      "description": [
        "Developed a comprehensive e-learning platform as a freelance project, designed to deliver interactive online courses and training materials. The platform features modern user interfaces, progress tracking, and multimedia content support.",
        "Built using modern web technologies with a focus on scalability and user experience. Implemented features including video streaming, interactive quizzes, progress analytics, and certificate generation. The platform supports multiple content formats and learning paths.",
        "The e-learning platform successfully serves hundreds of students with high satisfaction rates. Implemented responsive design for optimal mobile and desktop experiences, along with comprehensive admin tools for course management and student analytics."
      ],
      "primary_tags": [
        "E-Learning",
        "Education",
        "Platform"
      ],
      "tags": [
        "React",
        "Node.js",
        "MongoDB",
        "Video Streaming",
        "Interactive Content",
        "Progress Tracking",
        "Analytics",
        "Certificate Generation",
        "Responsive Design",
        "Admin Tools",
        "User Management",
        "Content Management"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Real Estate Portal",
      "description": [
        "Created a modern real estate portal featuring property listings, advanced search functionality, and integrated mapping services. The platform serves both property seekers and real estate agents with comprehensive tools for property management.",
        "Implemented advanced search and filtering capabilities, interactive property maps, virtual tour integration, and automated email notifications. The platform includes separate dashboards for agents and administrators with detailed analytics and lead management tools.",
        "The portal successfully processes thousands of property listings and user inquiries monthly. Features include mortgage calculator integration, favorite properties system, and comprehensive property comparison tools that enhance the user experience."
      ],
      "primary_tags": [
        "Real Estate",
        "Portal",
        "Maps"
      ],
      "tags": [
        "React",
        "TypeScript",
        "Google Maps API",
        "Property Search",
        "Lead Management",
        "Virtual Tours",
        "Analytics Dashboard",
        "Email Automation",
        "Mortgage Calculator",
        "Responsive Design",
        "SEO Optimization",
        "Performance"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Inventory Management System",
      "description": [
        "Developed a comprehensive inventory management system for small to medium-sized businesses, featuring real-time stock tracking, automated reordering, and detailed reporting capabilities.",
        "The system includes barcode scanning integration, supplier management, purchase order automation, and multi-location inventory tracking. Implemented role-based access control and comprehensive audit trails for compliance requirements.",
        "Successfully deployed across multiple client locations, resulting in improved inventory accuracy and reduced operational costs. The system features intuitive dashboards, customizable reports, and integration capabilities with existing business systems."
      ],
      "primary_tags": [
        "Inventory",
        "Management",
        "Business"
      ],
      "tags": [
        "React",
        "Node.js",
        "PostgreSQL",
        "Barcode Scanning",
        "Automated Reordering",
        "Supplier Management",
        "Audit Trails",
        "Role-based Access",
        "Multi-location",
        "Reporting",
        "Dashboard",
        "Integration"
      ]
    },
    {
      "customer": "Freelance", 
      "title": "Restaurant Management App",
      "description": [
        "Built a complete restaurant management application including point-of-sale (POS) functionality, order management, inventory tracking, and staff scheduling. The system supports both dine-in and takeaway operations.",
        "Implemented real-time order processing, kitchen display systems, payment integration, and customer management features. The application includes comprehensive reporting for sales analytics, inventory usage, and staff performance metrics.",
        "Successfully deployed in multiple restaurant locations, improving order accuracy and operational efficiency. Features include table management, split billing, loyalty program integration, and seamless integration with delivery platforms."
      ],
      "primary_tags": [
        "Restaurant",
        "POS",
        "Management"
      ],
      "tags": [
        "React",
        "Node.js",
        "Real-time",
        "Payment Integration",
        "Kitchen Display",
        "Order Management",
        "Staff Scheduling",
        "Sales Analytics",
        "Customer Management",
        "Table Management",
        "Loyalty Program",
        "Delivery Integration"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Healthcare Dashboard",
      "description": [
        "Developed a healthcare analytics dashboard for medical practices, providing insights into patient flow, appointment scheduling, and treatment outcomes. The system ensures full HIPAA compliance and data security.",
        "Implemented comprehensive patient management features, appointment scheduling with automated reminders, billing integration, and detailed reporting capabilities. The dashboard provides real-time insights into practice performance and patient satisfaction metrics.",
        "The healthcare dashboard has improved patient care coordination and operational efficiency across multiple medical practices. Features include secure patient portals, telemedicine integration, and comprehensive audit logging for compliance requirements."
      ],
      "primary_tags": [
        "Healthcare",
        "Dashboard",
        "Analytics"
      ],
      "tags": [
        "React",
        "HIPAA Compliance",
        "Patient Management",
        "Appointment Scheduling",
        "Billing Integration",
        "Telemedicine",
        "Patient Portal",
        "Analytics",
        "Audit Logging",
        "Security",
        "Compliance",
        "Medical Records"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Financial Planning Tool",
      "description": [
        "Created a comprehensive financial planning and budgeting tool for personal and small business use. The application features expense tracking, budget planning, investment portfolio management, and financial goal setting.",
        "Implemented bank account integration for automatic transaction import, categorization algorithms, and predictive analytics for financial forecasting. The tool includes comprehensive reporting and visualization capabilities for financial insights.",
        "Successfully helps users manage their finances more effectively with improved budgeting accuracy and financial awareness. Features include bill reminders, savings goal tracking, and detailed financial reports for better decision-making."
      ],
      "primary_tags": [
        "Finance",
        "Planning",
        "Analytics"
      ],
      "tags": [
        "React",
        "Financial Analytics",
        "Bank Integration",
        "Budget Planning",
        "Investment Tracking",
        "Expense Categorization",
        "Predictive Analytics",
        "Data Visualization",
        "Financial Reporting",
        "Goal Setting",
        "Bill Reminders",
        "Security"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Event Management Platform",
      "description": [
        "Developed a comprehensive event management platform for organizing conferences, workshops, and corporate events. The platform handles registration, ticketing, scheduling, and attendee management.",
        "Implemented features including online registration forms, payment processing, email marketing integration, and real-time attendee tracking. The platform supports multiple event types and provides comprehensive analytics for event success measurement.",
        "Successfully managed hundreds of events with thousands of attendees, improving event organization efficiency and attendee satisfaction. Features include badge printing, check-in systems, and post-event survey integration."
      ],
      "primary_tags": [
        "Event Management",
        "Registration",
        "Platform"
      ],
      "tags": [
        "React",
        "Event Planning",
        "Registration Forms",
        "Payment Processing",
        "Email Marketing",
        "Attendee Tracking",
        "Badge Printing",
        "Check-in System",
        "Survey Integration",
        "Analytics",
        "Multi-event",
        "Scheduling"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Social Media Analytics",
      "description": [
        "Built a social media analytics platform that aggregates data from multiple social networks and provides comprehensive insights into social media performance, audience engagement, and content effectiveness.",
        "Integrated with major social media APIs including Facebook, Twitter, Instagram, and LinkedIn to collect and analyze social media metrics. Implemented automated reporting, competitor analysis, and content performance tracking.",
        "The platform helps businesses optimize their social media strategies with data-driven insights and automated reporting. Features include sentiment analysis, hashtag tracking, influencer identification, and ROI measurement for social media campaigns."
      ],
      "primary_tags": [
        "Social Media",
        "Analytics",
        "Marketing"
      ],
      "tags": [
        "React",
        "Social Media APIs",
        "Data Analytics",
        "Sentiment Analysis",
        "Competitor Analysis",
        "Content Performance",
        "Hashtag Tracking",
        "Influencer Analysis",
        "ROI Measurement",
        "Automated Reporting",
        "Dashboard",
        "Marketing Intelligence"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Project Management Tool",
      "description": [
        "Developed a modern project management application with task tracking, team collaboration, time management, and project analytics. The tool supports agile methodologies and provides comprehensive project oversight capabilities.",
        "Implemented features including Kanban boards, Gantt charts, time tracking, team messaging, file sharing, and milestone management. The application includes role-based permissions and integration capabilities with popular development tools.",
        "Successfully adopted by multiple teams and organizations, improving project delivery times and team collaboration. Features include automated progress reporting, resource allocation planning, and comprehensive project analytics for better decision-making."
      ],
      "primary_tags": [
        "Project Management",
        "Collaboration",
        "Productivity"
      ],
      "tags": [
        "React",
        "Kanban Boards",
        "Gantt Charts",
        "Time Tracking",
        "Team Collaboration",
        "File Sharing",
        "Milestone Management",
        "Role-based Permissions",
        "Integration APIs",
        "Progress Reporting",
        "Resource Planning",
        "Analytics"
      ]
    },
    {
      "customer": "Freelance",
      "title": "Customer Support Portal",
      "description": [
        "Created a comprehensive customer support portal featuring ticket management, knowledge base, live chat integration, and customer self-service capabilities. The platform improves customer service efficiency and satisfaction.",
        "Implemented intelligent ticket routing, automated responses, escalation workflows, and comprehensive reporting for support metrics. The portal includes multi-channel support integration and customer satisfaction tracking.",
        "Successfully reduced support response times and improved customer satisfaction across multiple client implementations. Features include FAQ management, video tutorials, community forums, and integration with popular CRM systems."
      ],
      "primary_tags": [
        "Customer Support",
        "Portal",
        "Service"
      ],
      "tags": [
        "React",
        "Ticket Management",
        "Knowledge Base",
        "Live Chat",
        "Self-service",
        "Automated Responses",
        "Escalation Workflows",
        "Support Metrics",
        "Multi-channel",
        "Customer Satisfaction",
        "FAQ Management",
        "CRM Integration"
      ]
    }
  ]
};