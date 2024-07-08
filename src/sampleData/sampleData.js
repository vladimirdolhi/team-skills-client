export const coursesSample = [
  {
    id: "1",
    program: "Java Web Development",
    mentor: "Dmitry Vasiliev",
    mentee: "Alexey Ivanov",
    skills: ["Java", "Spring", "Hibernate", "PostgreSQL"],
    start: "01-04-2024",
    finish: "01-09-2024",
    status: "In progress",
  },
  {
    id: "2",
    program: "Spartacus",
    mentor: "Alexey Fedorov",
    mentee: "Andrei Nikolaev",
    skills: ["Spartacus", "Angular", "Typescript", "Hybris", "Commerce APIs"],
    start: "01-05-2024",
    finish: "01-08-2024",
    status: "In progress",
  },
  {
    id: "3",
    program: "Frontend Core",
    mentor: "Emanuel Pantea",
    mentee: "Alexey Ivanov",
    skills: ["HTML", "CSS", "Javascript"],
    start: "01-01-2024",
    finish: "01-05-2024",
    status: "Finished",
  },
  {
    id: "4",
    program: "SAP Commerce Cloud",
    mentor: "Anna Romanova",
    mentee: "Alexey Ivanov",
    skills: ["SAP Commerce Cloud", "Hybris", "Spring", "Java", "Commerce APIs"],
    start: "01-05-2024",
    finish: "01-09-2024",
    status: "Planned",
  },
];

export const courses = [
  {
    id: "1",
    program: "Java Web Development",
    mentor: "Dmitry Vasiliev",
    email: "dmtr@gmail.com",
    mentee: "Alexey Ivanov",
    skills: ["Java", "Spring", "Hibernate", "PostgreSQL"],
    start: "01-05-2024",
    finish: "01-09-2024",
    status: "In progress",
  },
  {
    id: "2",
    program: "Frontend Core",
    mentor: "Emanuel Ristic",
    email: "somesample@gmail.com",
    mentee: "Alexey Ivanov",
    skills: ["HTML", "CSS", "Javascript", "Angular", "React", "Vue"],
    start: "01-01-2024",
    finish: "01-05-2024",
    status: "Finished",
  },
  {
    id: "3",
    program: "SAP Commerce Cloud",
    mentor: "Anna Safonova",
    email: "ann@gmail.com",
    mentee: "Alexey Ivanov",
    skills: [
      "Java",
      "Spring",
      "Hibernate",
      "PostgreSQL",
      "SAP Commerce Cloud",
      "Hybris",
      "Commerce APIs",
    ],
    start: "01-05-2024",
    finish: "01-09-2024",
    status: "Planned",
  },
  {
    id: "4",
    program: "Spartacus",
    mentor: "Alexey Fedorov",
    email: "alex1990@gmail.com",
    skills: ["Spartacus", "Angular", "Typescript", "Hybris", "Commerce APIs"],
    start: "01-05-2024",
    finish: "01-08-2024",
    status: "In progress",
  },
  {
    id: "5",
    program: "Spartacus",
    mentor: "Oleg Bondarev",
    email: "olg_w@gmail.com",
    skills: [
      "Java",
      "Kotlin",
      "Swift",
      "React Native",
      "Android Studio",
      "Xcode",
    ],
    start: "01-05-2024",
    finish: "01-08-2024",
    status: "In progress",
  },
];

export const programs = [
  {
    id: "1",
    name: "Java Web Development",
    description: "Java related stack backend technologies",
    skills: ["Java", "Spring", "Hibernate", "PostgreSQL"],
  },
  {
    id: "2",
    name: "Frontend Core",
    description: "Core rontend technologies",
    skills: ["HTML", "CSS", "Javascript"],
  },
  {
    id: "3",
    name: "Git VCS",
    description: "Git Version Control tool",
    skills: ["Git Core", "Git Bash", "GitLab"],
  },
  {
    id: "4",
    name: "Java Big Data",
    description: "Big Data processing with Java",
    skills: ["Java", "Hadoop", "Spark", "MapReduce", "Hive"],
  },
  {
    id: "5",
    name: "Mobile App Development",
    description: "Building mobile applications",
    skills: [
      "Java",
      "Kotlin",
      "Swift",
      "React Native",
      "Android Studio",
      "Xcode",
    ],
  },
  {
    id: "6",
    name: "Cloud Computing Fundamentals",
    description: "Introduction to cloud technologies",
    skills: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
  },
  {
    id: "7",
    name: "ML Fundamentals",
    description: "Introduction to machine learning concepts",
    skills: ["Python", "TensorFlow", "PyTorch", "Jupyter"],
  },
  {
    id: "8",
    name: "SAP Commerce Cloud",
    description: "E-commerce platform by SAP",
    skills: ["SAP Commerce Cloud", "Hybris", "Spring", "Java", "Commerce APIs"],
  },
  {
    id: "9",
    name: "Spartacus",
    description: "Headless storefront for SAP Commerce Cloud",
    skills: ["Spartacus", "Angular", "Typescript", "Hybris", "Commerce APIs"],
  },
  {
    id: "10",
    name: "Microservices",
    description: "Building scalable microservices architecture",
    skills: [
      "Microservices",
      "Docker",
      "Kubernetes",
      "Spring Boot",
      "RESTful APIs",
      "Service Discovery",
    ],
  },
];

export const skill = [
  {
    id: "1",
    name: "Java",
    description: "Java programming language",
    category: "Backend",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkKOrNAy826b-NcHnh285GT64AQKn8a3GbcKpc9g-yJQ&s",
  },
  {
    id: "2",
    name: "Scala",
    description: "Scala programming language",
    category: "Backend",
    image: "https://cdn-icons-png.flaticon.com/512/6132/6132220.png",
  },
  {
    id: "3",
    name: "PostgreSQL",
    description:
      "Advanced, enterprise-class open-source relational database that supports both SQL (relational) and JSON (non-relational) querying. ",
    category: "Backend",
    image:
      "https://cdn.icon-icons.com/icons2/2415/PNG/512/postgresql_plain_wordmark_logo_icon_146390.png",
  },
  {
    id: "4",
    name: "Hibernate",
    description: "Open source object relational mapping (ORM) tool",
    category: "Backend",
    image: "https://cdn.worldvectorlogo.com/logos/hibernate.svg",
  },
  {
    id: "5",
    name: "Spring",
    description:
      "Application framework and inversion of control container for the Java platform",
    category: "Backend",
    image:
      "https://static-00.iconduck.com/assets.00/spring-icon-256x256-2efvkvky.png",
  },
  {
    id: "6",
    name: "Javascript",
    description: "Javascript programming language",
    category: "Frontend",
    image:
      "https://ih1.redbubble.net/image.815350031.4911/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg",
  },
  {
    id: "7",
    name: "React",
    description: "Library for web and native user interfaces",
    category: "Frontend",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  },
  {
    id: "8",
    name: "Angular",
    description:
      "Platform and framework for building single-page client applications using HTML and TypeScript.",
    category: "Frontend",
    image:
      "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/21_Angular_logo_logos-512.png",
  },
  {
    id: "9",
    name: "Vue",
    description:
      "Open-source model–view–viewmodel front end JavaScript library for building user interfaces and single-page applications.",
    category: "Frontend",
    image:
      "https://static-00.iconduck.com/assets.00/vue-icon-2048x2048-eci1ikst.png",
  },
  {
    id: "10",
    name: "Git",
    description: "Git VSC",
    category: "Version control",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuddR9WAPOLJcZzALuls9appXl2wGORlmaiiiYAgzedA&s",
  },
];

// export const programs = [
//   {id: "1", name: "Java Web Development", description: "Backend technologies", skills : ["Java", "Spring", "Hibernate", "PostgreSQL"]},
//   {id: "2", name: "Frontend Core", description: "Frontend technologies", skills : ["HTML", "CSS", "Javascript"]},
//   {id: "3", name: "Git VCS", description: "Git Version Control tool", skills : ["Git Core", "Git Bash", "GitLab"]},
//   {id: "4", name: "Java Big Data", description: "Big Data processing with Java", skills : ["Java", "Hadoop", "Spark", "MapReduce", "Hive"]},
//   {id: "5", name: "Mobile App Development", description: "Building mobile applications", skills : ["Java", "Kotlin", "Swift", "React Native", "Android Studio", "Xcode"]},
//   {id: "6", name: "Cloud Computing Fundamentals", description: "Introduction to cloud technologies", skills : ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"]},
//   {id: "7", name: "ML Fundamentals", description: "Introduction to machine learning concepts", skills : ["Python", "TensorFlow", "PyTorch", "Jupyter"]},
//   {id: "8", name: "SAP Commerce Cloud", description: "E-commerce platform by SAP", skills : ["SAP Commerce Cloud", "Hybris", "Spring", "Java", "Commerce APIs"]},
//   {id: "9", name: "Spartacus", description: "Headless storefront for SAP Commerce Cloud", skills : ["Spartacus", "Angular", "Typescript", "Hybris", "Commerce APIs"]},
//   {id: "10", name: "Microservices", description: "Building scalable microservices architecture", skills : ["Microservices", "Docker", "Kubernetes", "Spring Boot", "RESTful APIs", "Service Discovery"]}
//  ]
