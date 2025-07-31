export interface Project {
  customer: string;
  title: string;
  description: string[];
  primary_tags: string[];
  tags: string[];
  comment?: string;
}

export interface ProjectsData {
  projects: Project[];
}

export const projectsData: ProjectsData = {
  "projects": [
    {
      "customer": "12 of Spades",
      "title": "Modern Portfolio Website",
      "description": [
        "Development of a modern, responsive portfolio website showcasing software development expertise and project portfolio. The website serves as a professional platform to present services, projects, and technical capabilities to potential clients and collaborators.",
        "The project emphasizes modern web development practices with **React 19** and **TypeScript**, featuring a component-driven architecture using the **Mantine UI framework**. The website includes advanced filtering capabilities for projects and technologies, allowing visitors to easily explore relevant work based on their interests.",  
        "Key features include comprehensive internationalization support (German/English), smooth animations powered by **Framer Motion**, and a sophisticated dark/light theme system. The website automatically generates technology statistics from project data and provides an intuitive user experience across all device types.",
        "The project features comprehensive test coverage using **Vitest**, strict TypeScript integration, and automated **CI/CD practices** through GitHub Actions. As an *open source project*, the entire codebase is publicly available on [GitHub](https://github.com/woozar/website-relaunch), showcasing transparent development practices and high code quality standards.",
        "This project demonstrates *AI-assisted development workflows*, where all coding and testing tasks were completed using **Claude Code**, while the human developer served as product owner for strategic decisions and manual quality assurance."
      ],
      "primary_tags": ["React", "TypeScript", "Mantine", "AI-gestützte Programmierung"],
      "tags": [
        "Claude Code",
        "Zustand",
        "Vitest",
        "react-markdown",
        "Framer Motion",
        "Responsive Design", 
        "ESLint",
        "Git",
        "Vite",
        "CI/CD",
        "GitHub Actions",
        "State Management",
        "Multi-language Support",
        "Component Architecture",
        "UI/UX Design",
        "Testing",
        "Code Quality",
        "Open Source",
        "Prettier"
      ]
    },
    {
      "customer": "ChatYourData GmbH",
      "title": "AI Playground",
      "description": [
        "ChatYourData, an innovative technology company, is collaborating with Kreuz & Partner, an AI consulting firm, to develop cutting-edge AI solutions. Together, we're building a demonstration platform called **\"Playground\"** that showcases the potential of AI and highlights the services we offer.",
        "As a key developer on the Playground project, I was responsible for the entire development process, from initial concept to final deployment. The platform enables users to experiment with various **AI applications**, such as creating AI experts from uploaded documents, generating images, and defining custom AI scenarios.",
        "To ensure flexibility and scalability, the Playground platform is designed to support **multi-tenancy**, allowing each customer to have their own dedicated workspace. Furthermore, each tenant can be divided into multiple areas, enabling different departments within an organization to have their own *private spaces* while still being able to share relevant information."
      ],
      "primary_tags": ["AI", "LLM", "No Code", "AI-gestützte Programmierung"],
      "tags": [
        "Cursor",
        "Anthropic AI",
        "Black Forest Labs",
        "Claude 3 Haiku",
        "Claude 3.5 Sonnet",
        "DALL·E 3",
        "FLUX.1 [dev]",
        "FLUX.1 [pro]",
        "FLUX.1 [schnell]",
        "FLUX1.1 [pro]",
        "Gemini 1.5 Flash",
        "Gemini 1.5 Pro",
        "Google Generative AI",
        "GPT-4o",
        "OpenAI ChatGPT",
        "React",
        "NextJS",
        "TailwindCSS",
        "LangChain",
        "LiveKit",
        "Prettier",
        "Prisma",
        "Puppeteer",
        "Replicate API",
        "Typescript",
        "Typesense",
        "Zod"
      ]
    },
    {
      "customer": "WIADOK GmbH & Co. KG",
      "title": "AI Workshop for Tax Software",
      "description": [
        "WIADOK, a company that specializes in providing innovative solutions for businesses, particularly tax advisors, is constantly exploring new ways to improve efficiency and productivity through the use of technology.",
        "I led an AI workshop for WIADOK, where we discussed potential applications of AI within their business. One of the key ideas that emerged was the development of a mobile app that could use AI to process receipts and invoices. End-users could simply take photos of these documents, and the app would use an LLM to extract key information such as date, vendor, and itemized costs. This information could then be automatically uploaded to the tax advisor's office, streamlining the process for both the client and the advisor.",
        "Another interesting use case was the application of AI to personalize newsletters. By asking subscribers a series of questions, the LLM could create detailed user personas. These personas, combined with the latest tax news and regulations, would enable the LLM to curate highly personalized newsletters tailored to each individual's specific needs and interests."
      ],
      "primary_tags": ["AI", "LLM", "Workshop"],
      "tags": [
        "Ant Design",
        "Anthropic AI",
        "Black Forest Labs",
        "Claude 3 Haiku",
        "Claude 3.5 Sonnet",
        "DALL·E 3",
        "Elevenlabs",
        "Expo",
        "FLUX.1 [dev]",
        "FLUX.1 [pro]",
        "FLUX.1 [schnell]",
        "FLUX1.1 [pro]",
        "Gemini 1.5 Flash",
        "Gemini 1.5 Pro",
        "Google Generative AI",
        "GPT-4o",
        "LangChain",
        "NextJS",
        "NextJS",
        "Node.js",
        "OpenAI ChatGPT",
        "Prettier",
        "Prisma",
        "React Native",
        "React",
        "Replicate API",
        "TailwindCSS",
        "Typescript"
      ]
    },
    {
      "customer": "ambiFOX GmbH",
      "title": "AI Business Workshop",
      "description": [
        "ambiFOX is a technology company specializing in network operations. They offer a range of services, including network design, implementation, and maintenance. Their goal is to streamline network operations and improve overall IT efficiency.",
        "I led a workshop for ambiFOX, where we explored the potential applications of AI within their business. One idea that emerged was to use AI to automate the generation of network device configurations. This could significantly reduce the time and effort required to set up new devices.",
        "Another interesting application was using AI to rephrase incoming support tickets. By automatically adjusting the tone of these messages, ambiFOX could improve the overall support experience and reduce the emotional burden on their support team."
      ],
      "primary_tags": ["AI", "LLM", "Workshop"],
      "tags": [
        "Anthropic AI",
        "Black Forest Labs",
        "Claude 3 Haiku",
        "Claude 3.5 Sonnet",
        "DALL·E 3",
        "FLUX.1 [dev]",
        "FLUX.1 [pro]",
        "FLUX.1 [schnell]",
        "FLUX1.1 [pro]",
        "Gemini 1.5 Flash",
        "Gemini 1.5 Pro",
        "Google Generative AI",
        "GPT-4o",
        "LangChain",
        "OpenAI ChatGPT",
        "Python"
      ]
    },
    {
      "customer": "Glückliche Gäste GmbH",
      "title": "AI Food Tracking App",
      "description": [
        "Glückliche Gäste GmbH, a company focused on developing innovative food tracking solutions, is working on a new app called \"Uninu\". They aim to revolutionize the way people track their food intake by leveraging AI to simplify the process.",
        "I was one of the early developers on the Uninu project, where I played a key role in building the backend infrastructure and the React Native mobile app. Initially, we employed a traditional approach using AWS API Gateway and RDS to handle API requests and store user data. However, to enhance scalability, performance, and real-time capabilities, we transitioned to a more modern architecture utilizing AWS AppSync and DynamoDB.",
        "AppSync, a fully managed GraphQL service, enabled us to create a real-time, scalable, and flexible API layer. This allowed us to efficiently fetch and manipulate data across multiple data sources, including the DynamoDB database. DynamoDB, a fully managed NoSQL database service, provided us with fast and predictable performance, making it ideal for handling large amounts of user data, such as food logs, nutritional information, and user preferences.",
        "By leveraging these powerful AWS services, we were able to build a robust and efficient backend infrastructure that supports the core functionalities of the Uninu app, such as user authentication, food item recognition, nutritional data calculation, and personalized meal plan generation."
      ],
      "primary_tags": ["AWS", "React Native", "AI", "LLM", "AI-gestützte Programmierung"],
      "tags": [
        "Cursor",
        "Anthropic AI",
        "Apollo",
        "AWS API Gateway",
        "AWS AppSync",
        "AWS Cognito",
        "AWS DynamoDB",
        "AWS IAM",
        "AWS Lambda",
        "AWS RDS",
        "AWS S3",
        "AWS Secrets Manager",
        "AWS VPC",
        "Expo",
        "Framer Motion",
        "Google Generative AI",
        "GraphQL",
        "NextAuth",
        "NextJS",
        "Nodemailer",
        "OAuth 2.0",
        "OpenAI ChatGPT",
        "Prettier",
        "Prettier",
        "Puppeteer",
        "React",
        "TailwindCSS",
        "TanStack Query",
        "tRPC",
        "Typescript",
        "Vercel AI",
        "Zod"
      ]
    },
    {
      "customer": "Sikant GmbH",
      "title": "Sikant Med",
      "description": [
        "Sikant is a healthcare technology company developing software solutions for small and medium-sized operation centers. I contributed to enhancing their software \"Sikant Med\" by implementing a real-time support chat feature and developing comprehensive end-to-end tests.",
        "As part of this project, I integrated the chat functionality, designed a user-friendly interface for support agents, and implemented the necessary backend infrastructure for real-time communication. Additionally, I developed and executed end-to-end tests to ensure the quality and reliability of the software, including the newly added chat feature.",
        "By adding this feature and implementing robust testing practices, Sikant improved its software by providing more efficient and timely support, enhancing user satisfaction, and ensuring a high-quality product."
      ],
      "primary_tags": ["E2E Tests", "NextJS", "Websocket"],
      "tags": [
        "Ant Design",
        "Cypress",
        "Microsoft Authentication Library",
        "Google Cloud Vision",
        "NestJS",
        "OpenAPI Generator",
        "Prisma",
        "tRPC",
        "Express",
        "ImapFlow",
        "Socket.IO",
        "Narwhal",
        "Zod"
      ]
    },
    {
      "customer": "Drawag AG",
      "title": "AI Construction Tender Scraper",
      "description": [
        "Drawag AG, a company focused on construction and engineering, was facing a significant challenge: a significant portion of an employee's time was spent manually searching through various portals to identify potential building projects that aligned with their expertise. The goal was to efficiently identify projects that included specific construction trades where Drawag could offer their services as a subcontractor.",
        "To address this challenge, we proposed leveraging AI to automate the process of searching and filtering through these portals. We began by developing a web scraper to extract relevant data from these portals. This data was then fed into a state-of-the-art language model, such as GPT-4 or a similar model, to identify projects that matched Drawag's specific criteria.",
        "By automating this process, we aimed to significantly reduce the time spent on manual searches and increase the efficiency of identifying relevant projects. The language model was used to analyze the extracted data and identify relevant information, such as project details, timelines, and contact information. Additionally, we implemented a notification system to alert the relevant team members via email whenever a new project matching their criteria was identified."
      ],
      "primary_tags": ["AI", "LLM", "Web Scraper", "AI-gestützte Programmierung"],
      "tags": [
        "Cursor",
        "Anthropic AI",
        "Google Generative AI",
        "OpenAI ChatGPT",
        "React",
        "NextJS",
        "TailwindCSS",
        "LangChain",
        "Prisma",
        "Puppeteer",
        "Prettier",
        "Typescript",
        "Sonner",
        "Sharp",
        "Nodemailer",
        "Zod"
      ]
    },
    {
      "customer": "DMG Mori Software Solution",
      "title": "Smart Factory App Store",
      "description": [
        "The project centered on developing an industry-specific app store for Industrial PCs (IPCs) within machines manufactured by our customer. A significant aspect was the launch of the initial app—Celos Tech Calculator—a specialized tool designed for performing machine-specific calculations, aimed at enhancing operational efficiency and functionality.",
        "The primary objective was to establish a robust app store framework seamlessly integrated with IPCs, facilitating straightforward installation and management of apps. This framework served as the platform for deploying Celos Tech Calculator and paved the way for future app expansions.",
        "Technologically, the project leveraged cloud services for app distribution, implemented rigorous security measures for authentication, and utilized Docker for efficient app containerization. Continuous integration and deployment (CI/CD) pipelines ensured smooth updates and maintenance of the app store ecosystem.",
        "By introducing the Celos Tech Calculator, tailored specifically for machine-specific calculations, the project aimed to optimize industrial operations. It provided a user-friendly interface for managing and utilizing specialized tools directly on machines manufactured by our customer, thereby enhancing productivity and operational effectiveness."
      ],
      "primary_tags": ["Custom App Store", "Docker"],
      "tags": [
        "CI/CD",
        "Authentication / Authorization",
        "Cloud-Based Platform",
        "RESTful",
        "Security",
        "API-based Integration"
      ]
    },
    {
      "customer": "DMG Mori Software Solution",
      "title": "TULIP No-Code Integration",
      "description": [
        "The project successfully integrated the TULIP no-code platform with the Celos X machine software, creating a seamless, API-based bi-directional data flow. This integration enhanced Celos X by enabling real-time data exchange and improving functionality through TULIP's no-code capabilities.",
        "Key features implemented included robust APIs for efficient data management, enterprise-level authentication and authorization mechanisms, and a technology stack utilizing TypeScript and Angular for scalability and responsiveness. These elements ensured secure user access and smooth communication between the platforms.",
        "The development process followed a structured roadmap, including requirement analysis, design, development, testing, and deployment. This approach ensured that the integration met all functional and performance requirements, resulting in a scalable, maintainable, and efficient solution for enterprise environments."
      ],
      "primary_tags": ["Angular", "Typescript", "Azure API Management"],
      "tags": [
        "API-based Integration",
        "Authentication / Authorization",
        "Bi-Directional Data Flow",
        "Enterprise Compliance",
        "No-Code",
        "Real-Time Data Exchange",
        "Scalability"
      ]
    },
    {
      "customer": "DMG Mori Software Solution",
      "title": "ISTOS Integration Platform",
      "description": [
        "The project integrated the ISTOS production planning system by connecting cloud frontends and on-premise machines to a cloud-based platform. This integration facilitated seamless communication and coordination between different components, enhancing production planning efficiency.",
        "Key elements of the integration included robust user authentication and authorization mechanisms, ensuring secure access in an enterprise context. The project utilized several Azure services and Terraform to build a scalable and resilient system.",
        "The development process followed a structured approach, encompassing requirement analysis, design, implementation, and testing. This ensured that the integration met all functional and security requirements, resulting in a reliable and efficient production planning solution."
      ],
      "primary_tags": ["Azure API Management", "Kafka", "Azure CosmosDB"],
      "tags": [
        "Authentication / Authorization",
        "Azure Functions",
        "Cloud-Based Platform",
        "Microservices",
        "On-Premise Machines",
        "Production Planning System",
        "Terraform"
      ]
    },
    {
      "customer": "DMG Mori Software Solution",
      "title": "PAYZR - Pay-per-Use Billing System",
      "description": [
        "This project aimed to develop an advanced headless machine for managing cloud data flow, addressing requirements like fraud detection, remote deactivation, enterprise regulation compliance, and billing integration with external systems. The solution emphasized high security standards, including Write Once Read Many (WORM) storage and stream validation, while enabling a pay-per-use model for end users.",
        "Key features included real-time fraud detection, secure remote deactivation, adherence to regulations like GDPR and HIPAA, and seamless billing integration. The machine incorporated comprehensive security protocols, such as encryption and access control, to ensure robust data protection.",
        "The development followed a structured roadmap, beginning with requirement analysis, followed by design, development, testing, and deployment. The architecture was cloud-native and microservices-based for high availability, resilience, and scalability.",
        "In conclusion, this project delivered a secure, compliant, and efficient solution for managing complex cloud data flows. By enabling a pay-per-use model, it offered cost efficiency, scalability, and flexibility, making it an ideal choice for enterprises looking to optimize their data management processes while maintaining stringent security and regulatory standards."
      ],
      "primary_tags": ["Azure IoT Edge", "Azure Stream Analytics"],
      "tags": [
        "Azure data explorer",
        "Azure DevOps",
        "Azure Functions",
        "Message Routing",
        "Multi Tenancy",
        "OPC-UA",
        "Provisioning",
        "TPM"
      ]
    },
    {
      "customer": "DMG Mori Software Solution",
      "title": "Celos X Digital Ecosystem",
      "comment": "<p>CELOS X is a digital ecosystem created by DMG MORI for the manufacturing industry. It acts as a central hub for data from machines and applications, providing a holistic solution for digital transformation.</p>",
      "description": [
        "DMG Mori's award-winning **\"Celos X\"** project revolutionizes data exchange for high-end tool machines. This innovative platform seamlessly integrates edge computing with the **Microsoft Azure cloud**, enabling powerful data analysis and machine optimization. Recognized by Microsoft with the *2021 \"Intelligent Manufacturing Award\"* in the \"Envision\" category, Celos X paves the way for smarter factories.",
        "The platform leverages industrial PCs within the machines to connect with shop floor devices and peripherals using industry-standard protocols like **OPC UA**, **MTConnect**, **MQTT**, and **IO-Link Master**. This robust communication foundation empowers a rich set of operator applications accessible through high-resolution touchscreens. Built with modern web technologies like **Angular 16** frontends with **microfrontends** and **REST APIs**, these applications offer an intuitive user experience.",
        "From the very beginning, I was fortunate to be part of the Celos X development team. It was an exciting opportunity to contribute to the project's foundation, working alongside other pioneers to define the platform's architecture. We focused on establishing a strong framework that could support future development."
      ],
      "primary_tags": ["Angular", "Azure", "Node.js", "Microservices", "IoT"],
      "tags": [
        "3D isometric drawing",
        "Angular Flex Layout",
        "Angular Material",
        "Azure API Management",
        "Azure DevOps",
        "Azure functions",
        "Azure IoT",
        "Confluence",
        "Cucumber",
        "Docker Compose",
        "Docker",
        "ESLint",
        "Gherkin",
        "Git",
        "GoLang",
        "IO-Link Master",
        "Jasmine",
        "Jenkins",
        "Jira",
        "Karma",
        "Microfrontends",
        "MQTT",
        "MTConnect",
        "NATS",
        "ngrx",
        "OPC/UA",
        "Postman",
        "Prettier",
        "RESTful",
        "rxjs",
        "Sideloading",
        "SonarQube",
        "Swagger",
        "Terraform",
        "Testcafe",
        "TSLint",
        "Typescript",
        "Visual Studio Code",
        "Websocket"
      ]
    },
    {
      "customer": "Open Tinkering",
      "title": "Exploring AI Automation",
      "description": [
        "Open Tinkering isn't your average tech group. Fueled by a shared passion for exploration, this collective dives headfirst into the ever-evolving world of AI and LLMs (Large Language Models). Their sights are set on harnessing the potential of automation to create user-friendly tools.",
        "One intriguing project involves crafting custom chatbots. Forget generic AI assistants - these bots specialize in specific topics. Imagine a gardening companion offering personalized tips, or an astronomy bot delving into complex celestial queries. By building these focused AI helpers, Open Tinkering hopes to streamline user experiences and democratize access to specialized knowledge.",
        "Another fascinating concept they're exploring is Langgraph. Think of it as the \"Avengers Initiative\" for AI - a system that assembles virtual teams of AI experts. Imagine different AI models, each with its unique strengths, working together seamlessly. Langgraph aims to facilitate this collaboration, tackling complex problems with greater efficiency by harnessing the combined power of these AI \"super teams.\"",
        "Open Tinkering's foray into AI automation exemplifies their dedication to pushing the boundaries of technology. Their commitment to open-source development ensures that their learnings are readily available, empowering the community to explore the exciting future of AI-powered solutions alongside them."
      ],
      "primary_tags": ["AI", "GPT4", "LangChain", "LangGraph"],
      "tags": [
        "Azure",
        "ChatBot",
        "Gemini",
        "Google",
        "OpenAI",
        "Prompt engineering",
        "Python"
      ]
    },
    {
      "customer": "Kranz IT-Systemhaus GmbH",
      "title": "Prozessdigitalisierung",
      "description": [
        "Despite readily available software for business process digitization, IT system house Kranz sought a bespoke solution. Their priority: minimalism and user-friendliness to minimize the learning curve.",
        "A key requirement was replicating the existing processes, painstakingly designed and ingrained within the managing director's workflow. Beyond basic data entry and cloud storage in a proprietary database, the software needed to capture customer signatures directly on smartphones and store them as database images.",
        "As the developer, my challenge was crafting a ground-up software solution with minimal upkeep. Targeting only the managing director and his team, we implemented a very basic user management system. Cloud resource creation scripts and the initial workflow implementations were also part of the project scope"
      ],
      "primary_tags": ["Angular", "Azure", "Terraform", "Node.js"],
      "tags": ["tslint", "crypto", "nodemailer", "Typescript"]
    },
    {
      "customer": "Open Tinkering",
      "title": "DIY IoT Hardware Project",
      "description": [
        "A passionate group known as \"Open Tinkering\" is diving into the world of next-generation Internet of Things (IoT) hardware. Their focus is on creating open-source components specifically designed for advanced users. This means complete control - users can customize functionalities, flash custom firmware, and truly explore the potential of their creations.",
        "Fuelled by a love of technology and a desire to push boundaries, Open Tinkering is a hobbyist project at its core. The team members dedicate their free time to developing tools that empower the advanced user community to experiment and innovate within the ever-expanding field of IoT.",
        "Whether you're a seasoned developer or simply curious about the future of connected devices, Open Tinkering welcomes collaborators.  Their passion lies in fostering an open-source environment that encourages exploration and pushes the limits of what's possible with IoT hardware.",
        "Taking center stage in their current project is the development of their first open-source IoT device. I am the group's founder and actively involved in bringing this innovative hardware to life. The entire project will be documented and shared openly, allowing the community to get all details of the projects, contribute ideas and collaborate on building something truly free."
      ],
      "primary_tags": ["IoT", "Hardware", "Open Source"],
      "tags": [
        "ESP32",
        "Arduino",
        "C++",
        "C",
        "EasyEDA",
        "3D Printing",
        "Fusion 360",
        "PCB",
        "TPM",
        "Angular",
        "AWS"
      ]
    },
    {
      "customer": "T3 GmbH / Siemens AG - Digital Industries - Factory Automation",
      "title": "Minerva Micro Mobile App",
      "description": [
        "The factory automation department of Siemens Digital Industries is providing an online portal, where users can download all kinds of documentation as PDFs. Also they provide a DVD with all the documentation on it, that is being shipped with their products.",
        "Instead of just holding a list of files, they wanted to provide a more interactive way of browsing the documentation.",
        "My task was to develop small application, that was supposed to be added to those DVDs. It was required to run without any installation (asuming the user has a modern browser already installed) and as secure as possible for the user. The app should be able to display the documentation in a tree structure, where the user can navigate through the files and their metadata. Additionally, the user should be able to search for text content of the files, so I had to add an offline full text search which also included developing a process to create the full text index, that is being shipped with the app and depends on the PDFs"
      ],
      "primary_tags": ["Angular", "Plain Html", "Full text search", "Node.js"],
      "tags": [
        "lunr",
        "rxjs",
        "jasmine",
        "jest",
        "tslint",
        "axios",
        "csv",
        "format transformation",
        "md5",
        "pdf text extraction"
      ]
    },
    {
      "customer": "Finanz Informatik Technologie Service GmbH & Co. KG",
      "title": "Test Coverage Enhancement",
      "description": [
        "The FITS is running an portal, to allow there employees to manage all their internal accounts for all kinds of different system. This Portal is via API connected to the MFA infrastructure, that is using keychain hardware tokens.",
        "As the development resources in this project were limited, I was instructed to setup the test project and add all test cases for existing features, so the internal developers could keep working on their tasks and only add tests for their new code.",
        "The most challenging part of the project was to find a way how to mock the MFA token infrastructure for the integration tests."
      ],
      "primary_tags": ["C#", "Unit Tests", "Integration Tests", "Mocking"],
      "tags": ["MFA", "Proxy", "Selenium", "WebDriver", "Mitmproxy", "MSTest"]
    },
    {
      "customer": "Osram GmbH",
      "title": "OSRAM Lightelligence App",
      "description": [
        "Osram was creating a new cloud portal called \"Lightelligence\". The services that are provided by the portal are split into three groups. The \"Core Services\" are being used by everybody and provide the very basics for every user. Osram had own internal scrum teams, that created the core services. The \"Domain Services\" are the next layer of features, that are useful for every user, but not mandatory for the use of the portal. Users can book the domain services separately as plugins for their lightelligence account. Every domain service contains a set of backend services and a frontend. Osram hired external teams, to develop the domain services.",
        "I was one of the developers of the \"building central\" domain service team and my job was to provide the backend as RESTful API and a GraphQL middleware. Part of the backend job was to manage database migration with knex.js.",
        "Due to some fluctuation of our frontend developers, we managed to finish the backend before the frontend was ready. In order to reach our milestones within the given timeline, I supported the frontend team, by fixing some bugs in the React code and writing some e2e tests with Cypress."
      ],
      "primary_tags": ["Node.js", "Docker", "Microservices", "Azure"],
      "tags": [
        "Apollo",
        "Azure Blob Storage",
        "class-validator",
        "Confluence",
        "cors",
        "Cypress",
        "express",
        "Git",
        "GitFlow",
        "GitLab",
        "GraphQL",
        "IoT",
        "Jest",
        "Jira",
        "JSON",
        "jwt",
        "knex.js",
        "Memoizee",
        "mock-knex",
        "NestJS",
        "Nock",
        "nodemon",
        "PostgreSQL",
        "RabbitMQ",
        "React",
        "RESTful",
        "Supertest",
        "Swagger",
        "TSLint",
        "Typescript",
        "Webpack",
        "Websocket"
      ]
    },
    {
      "customer": "Telent GmbH",
      "title": "Telent IoT Portal Modernization",
      "description": [
        "Telent GmbH is selling hardware devices like sensors for almost anything arround \"smart buildings\". They are also providing a paid service portal that provides the information of the devices in different \"apps\". As the portal was growing and it got foreseeable that the existing architecture would get some bottlenecks soon, Telent decided to overhaul big parts of their architecture. To get a clean start with some new technologies, they hired some consultants like me to help and teach.",
        "My job was to help refactor or rewrite some of the services to fit the requirements towards scaleability. As the whole source control concept was changed and the new code was stored in a mono repository, I also helped with the refactoring of the the whole build pipelines aswell.",
        "Some parts of the services that are being executed very often and that are very isolated were identified to be predestinated to be transfered to serverless execution. As the whole plattform was hosted on Microsoft Azure, we decieded to migrate this code to Azure Functions. I was instructed to create a new Azure Functions Project that would be triggered by a HTTP POST request which also provided the necessary data. Afterwards it was also my job to create a new pipeline that would deploy the Azure Functions project."
      ],
      "primary_tags": ["Node.js", "kubernetes", "Microservices", "Azure"],
      "tags": [
        "Azure functions",
        "Chai",
        "Confluence",
        "cors",
        "CosmosDB",
        "Docker",
        "express",
        "Git",
        "GitFlow",
        "GitLab",
        "IoT",
        "Jira",
        "JSON",
        "jwt",
        "Mocha",
        "nodemon",
        "RabbitMQ",
        "RESTful",
        "SonarQube",
        "Swagger",
        "TSLint",
        "Typescript"
      ]
    },
    {
      "customer": "Saurer AG",
      "title": "Smart Factory Microservices",
      "description": [
        "I have worked in a team that designed and developed a set of microservices and an Angular 7 frontend called \"smart factory app\", that is now running in the factory in China. My job was to develop a set of Node.js microservices that provide RESTful APIs. The data is being stored in a mongodb and accessed through an additional layer that is like a lightweight version of Eclipse Ditto. I dockerized the services, deployed them to kubernetes and provided a description with swagger. For quality assurance I wrote a set of test cases with Chai and Mocha and I also used Dredd to automatically test the API against the swagger description. In addition to the functional tests we use static code analysis with SonarQube.",
        "For build automation I wrote a script for GitLab CI/CD that handles tests, building and deployment. The SonarQube quality gates are also part of the test stage and can potentially fail the build.",
        "Later in that project we decided not to use RESTful APIs anymore but to use GraphQL instead so I additionally created some middleware that provides the data from the RESTful APIs via GraphQL."
      ],
      "primary_tags": ["Docker", "kubernetes", "Microservices", "Node.js"],
      "tags": [
        "Angular",
        "Apollo",
        "Artifactory",
        "AWS",
        "Azure",
        "Chai",
        "Confluence",
        "cors",
        "Cucumber",
        "Dredd",
        "Eclipse",
        "Ditto",
        "express",
        "Git",
        "GitFlow",
        "GitLab",
        "GraphQL",
        "IoT",
        "Jira",
        "JSON",
        "jwt",
        "Mocha",
        "MongoDB",
        "Mongoose",
        "MQTT",
        "NestJS",
        "nodemon",
        "NoSQL",
        "RESTful",
        "SonarQube",
        "Swagger",
        "TSLint",
        "Typescript"
      ]
    },
    {
      "customer": "T3 GmbH / KUKA AG",
      "title": ".NET Knowledge Portal",
      "description": [
        "T3 is developing two software products. There is the Knowledge Manager, a smart search engine for modular bits of information. The engine is based on information that are well structured and maintained and contain a lot of meta information. The second product is the Learning Content Manager an AngularJS tool that is used to provide eLearning content to the users.",
        "My job was to develop new features and improve performance and quality of the existing C# Knowledge Manager code. I also assisted the Knowledge Manager frontend team with the introduction of unit and e2e tests using Jasmine, Karma and Selenium.",
        "Beside my development tasks, I was also in charge of improving the development processes. I moved the source code from SVN to Git and GitLab, introduced GitFlow and automated the build process."
      ],
      "primary_tags": ["C#", "dotNet", "Process Development"],
      "tags": [
        "Angular",
        "AngularJS",
        "Chai",
        "Git",
        "GitFlow",
        "GitLab",
        "Jasmine",
        "Karma",
        "Mocha",
        "ReSharper",
        "Selenium",
        "SVN",
        "TSLint",
        "Typescript",
        "WCF"
      ]
    },
    {
      "customer": "OMNINET GmbH",
      "title": "Formula Editor & Library",
      "description": [
        "OMNINET GmbH is developing a business process software called OMNITRACKER. The OMNITRACKER is pretty close to an object oriented programming framework that can be used to model business processes. The backend is written in C++ and the frontend is written in C# and WPF.",
        "For every process step that requires manual input or displays information to the user, the OMNITRACKER requires a formular. A very basic formular can be rendered automatically but it is part of the job of the process designer to provide the required formulars. The formular editor and the formular library that is being used to render the formulars is a central part of the solution. My first task was to develop some features for the new version of the formular editor.",
        "My next task was to provide a concept and a proof of concept for a new formular library based on WPF. One of the major features of this new library was, that it was supposed to be compatible with the web formulars.",
        "OMNITRACKER is providing a scripting interface for VBScript but some colleagues from application development were wishing for something more stand of the art, so I wrote a proof of concept that uses IronPython to allow scripting in Python."
      ],
      "primary_tags": ["C#", "dotNet"],
      "tags": [
        "C++",
        "IronPython",
        "MSTest",
        "Python",
        "ReSharper",
        "TFS",
        "VBScript",
        "WCF",
        "WPF"
      ]
    },
    {
      "customer": "Paessler AG",
      "title": "Custom Sensor Development",
      "description": [
        "The Paessler AG is developing a network monitoring solution called PRTG. It has got a central server and one or more probes that collect data from the target systems. On every probe there is a tree struture that contains folders that contain other folders or devices. Every device can contain a list of sensors that provide the actual meassurements.",
        "Paessler is selling different licenses for PRTG on premise installations and also providing a hosted version that can be booked as a service.",
        "My job was to create new sensor types and improve existing ones. A sensor type is responsible for obtaining meassurements either from a hardware device or from a service. There are various ways of obtaining meassurements. The most common ways in PRTG are SNMP, WMI or web APIs. When developing new sensors, the main task is to learn to handle new target systems and to decide what meassurements are even worth saving. In my time with Paessler I have written more than 100 different sensor types. Testing those sensors with the variety of different target systems is not that easy so I developed a simulator that could import scan data of a system and use it to mock this systems SNMP or HTTP interface. We could also use this simulator as a target for our test cases. Often users were asked for scans after reporting bugs. These scans could then be used to improve the tests cases so the customer would not encounter the same problem again."
      ],
      "primary_tags": ["C#", "dotNet"],
      "tags": [
        "C++",
        "Delphi",
        "Git",
        "GitLab",
        "HTTP",
        "NetFlow",
        "OpenSSL",
        "PerfMon",
        "Powershell",
        "Python",
        "QOS",
        "RESTful",
        "SMTP",
        "SNMP",
        "SSH",
        "VOIP",
        "WMI"
      ]
    }
  ]
};