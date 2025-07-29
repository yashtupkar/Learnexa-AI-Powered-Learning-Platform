const  TOPIC_IMAGES = {
  // Programming Languages
  javascript:
    "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  python: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  java: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg",
  "c++": "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  "c#": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  php: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
  ruby: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg",
  go: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
  rust: "https://images.pexels.com/photos/3861957/pexels-photo-3861957.jpeg",
  swift: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  kotlin: "https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg",

  // Web Development
  html: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg",
  css: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg",
  react: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
  vue: "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg",
  angular:
    "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg",
  nodejs:
    "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg",
  "web development":
    "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg",
  frontend: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  backend: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",

  // Data & Analytics
  database: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg",
  sql: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  "data science":
    "https://images.pexels.com/photos/7947687/pexels-photo-7947687.jpeg",
  "machine learning":
    "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg",
  "artificial intelligence":
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  analytics: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  "big data":
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  visualization:
    "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",

  // Mathematics
  mathematics:
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
  algebra: "https://images.pexels.com/photos/6238108/pexels-photo-6238108.jpeg",
  geometry:
    "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
  calculus:
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
  statistics:
    "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  permutation:
    "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg",
  probability:
    "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",

  // Sciences
  physics: "https://images.pexels.com/photos/8092/pexels-photo.jpg",
  chemistry:
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
  biology: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg",
  astronomy: "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg",
  medicine:
    "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
  anatomy: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg",
  psychology:
    "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg",
  neuroscience:
    "https://images.pexels.com/photos/8553873/pexels-photo-8553873.jpeg",

  // Languages
  english: "https://images.pexels.com/photos/4050316/pexels-photo-4050316.jpeg",
  spanish: "https://images.pexels.com/photos/3740390/pexels-photo-3740390.jpeg",
  french: "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg",
  german: "https://images.pexels.com/photos/3849168/pexels-photo-3849168.jpeg",
  chinese: "https://images.pexels.com/photos/8993561/pexels-photo-8993561.jpeg",
  japanese: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
  linguistics:
    "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg",

  // Business & Finance
  business: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg",
  finance: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg",
  marketing: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
  economics:
    "https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg",
  accounting:
    "https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg",
  management:
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
  entrepreneurship:
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",

  // Arts & Creative
  art: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg",
  music: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg",
  photography: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
  design: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  "graphic design":
    "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  writing: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg",
  literature:
    "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg",
  poetry: "https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg",

  // Technology
  "cyber security":
    "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
  networking:
    "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg",
  "cloud computing":
    "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  devops: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
  blockchain:
    "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
  cryptocurrency:
    "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg",
  iot: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  robotics:
    "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",

  // Social Sciences
  history:
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  geography: "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg",
  sociology:
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
  anthropology:
    "https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg",
  philosophy:
    "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg",
  politics:
    "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg",
  law: "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg",

  // Data Structures & Algorithms
  array: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  "linked list":
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  "binary tree":
    "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg",
  graph: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
  "hash table":
    "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
  sorting: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg",
  searching: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
  algorithms:
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",

  // Tools & Utilities
  calendar: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg",
  productivity:
    "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  organization:
    "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg",
  planning:
    "https://images.pexels.com/photos/1428171/pexels-photo-1428171.jpeg",

  // Gaming & Entertainment
  gaming: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
  "game development":
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
  animation: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg",
  "3d modeling":
    "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",

  // Health & Fitness
  health:
    "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
  fitness: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
  nutrition:
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  wellness:
    "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg",

  // Environment & Nature
  environment:
    "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg",
  ecology: "https://images.pexels.com/photos/355321/pexels-photo-355321.jpeg",
  sustainability:
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
  "climate change":
    "https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-60013.jpeg",

  // General Categories
  "general knowledge":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
  education: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg",
  research:
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  science: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg",
  technology:
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  engineering:
    "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",

  // Default fallback
  default: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
};

export default TOPIC_IMAGES;