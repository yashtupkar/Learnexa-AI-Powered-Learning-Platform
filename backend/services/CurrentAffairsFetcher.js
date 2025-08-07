// const axios = require("axios");
// const News = require("../models/newsModel");
// require("dotenv").config();

// const fetchCurrentAffairs = async () => {
//   try {
//     // Keywords relevant for all competitive exams
//     const examRelevantKeywords = [
//       "government",
//       "policy",
//       "parliament",
//       "supreme court",
//       "high court",
//       "election",
//       "economy",
//       "budget",
//       "gdp",
//       "inflation",
//       "rbi",
//       "banking",
//       "finance",
//       "international",
//       "diplomacy",
//       "foreign policy",
//       "treaty",
//       "summit",
//       "environment",
//       "climate change",
//       "renewable energy",
//       "pollution",
//       "biodiversity",
//       "science",
//       "technology",
//       "isro",
//       "space",
//       "research",
//       "innovation",
//       "ai",
//       "defense",
//       "military",
//       "border",
//       "security",
//       "cyber",
//       "terrorism",
//       "education",
//       "health",
//       "social welfare",
//       "employment",
//       "unemployment",
//       "agriculture",
//       "farmer",
//       "rural development",
//       "infrastructure",
//       "transport",
//       "constitutional",
//       "amendment",
//       "judiciary",
//       "law",
//       "act",
//       "bill",
//       "ordinance",
//       "awards",
//       "appointment",
//       "resignation",
//       "cabinet",
//       "minister",
//       "governor",
//       "sports",
//       "olympics",
//       "world cup",
//       "championship",
//       "medal",
//       "achievement",
//       "culture",
//       "heritage",
//       "festival",
//       "tradition",
//       "unesco",
//       "archaeological",
//       "disaster",
//       "cyclone",
//       "earthquake",
//       "flood",
//       "drought",
//       "emergency",
//       "scheme",
//       "mission",
//       "initiative",
//       "program",
//       "welfare",
//       "subsidy",
//       "census",
//       "population",
//       "demographics",
//       "migration",
//       "urbanization",
//       "trade",
//       "export",
//       "import",
//       "wto",
//       "fta",
//       "economic cooperation",
//     ];

//     // Categories to fetch for comprehensive coverage
//     const categories = [
//       "general",
//       "politics",
//       "business",
//       "science",
//       "technology",
//       "health",
//       "sports",
//     ];

//     let allArticles = [];

//     // Fetch from multiple categories
//     for (const category of categories) {
//       try {
//         console.log(`Fetching ${category} articles...`);

//         const response = await axios.get(
//           `https://gnews.io/api/v4/top-headlines?country=in&category=${category}&max=15&apikey=${process.env.GNEWS_API_KEY}`
//         );

//         if (response.data.articles) {
//           allArticles = [
//             ...allArticles,
//             ...response.data.articles.map((article) => ({
//               ...article,
//               fetchCategory: category,
//             })),
//           ];
//         }

//         // Add delay to avoid rate limiting
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       } catch (categoryError) {
//         console.error(`Error fetching ${category}:`, categoryError.message);
//       }
//     }

//     // Important search queries for competitive exams
//     const importantSearchQueries = [
//       "government scheme india",
//       "supreme court judgment",
//       "parliament session",
//       "international agreement india",
//       "economic survey india",
//       "space mission india",
//       "defense agreement india",
//       "environmental policy india",
//       "new law india",
//       "indian award winner",
//       "sports achievement india",
//       "scientific discovery india",
//       "infrastructure project india",
//       "banking policy rbi",
//       "international summit india",
//     ];

//     // Fetch specific searches
//     for (const query of importantSearchQueries) {
//       try {
//         console.log(`Searching for: ${query}`);

//         const response = await axios.get(
//           `https://gnews.io/api/v4/search?q=${encodeURIComponent(
//             query
//           )}&country=in&max=5&apikey=${process.env.GNEWS_API_KEY}`
//         );

//         if (response.data.articles) {
//           allArticles = [
//             ...allArticles,
//             ...response.data.articles.map((article) => ({
//               ...article,
//               fetchCategory: "search",
//               searchQuery: query,
//             })),
//           ];
//         }

//         // Add delay to avoid rate limiting
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       } catch (searchError) {
//         console.error(`Error searching for ${query}:`, searchError.message);
//       }
//     }

//     // Remove duplicates based on URL
//     const uniqueArticles = allArticles.filter(
//       (article, index, self) =>
//         index === self.findIndex((a) => a.url === article.url)
//     );

//     console.log(`Total unique articles fetched: ${uniqueArticles.length}`);

//     // Filter articles for competitive exam relevance
//     const examRelevantArticles = uniqueArticles.filter((article) => {
//       const titleAndDescription = (
//         article.title +
//         " " +
//         (article.description || "")
//       ).toLowerCase();

//       // Check if article contains exam-relevant keywords
//       const hasRelevantKeywords = examRelevantKeywords.some((keyword) =>
//         titleAndDescription.includes(keyword.toLowerCase())
//       );

//       // Filter by reliable sources
//       const reliableSources = [
//         "the hindu",
//         "indian express",
//         "times of india",
//         "hindustan times",
//         "business standard",
//         "economic times",
//         "livemint",
//         "moneycontrol",
//         "pib",
//         "government",
//         "ministry",
//         "prs india",
//         "observer research foundation",
//         "news18",
//         "ndtv",
//         "zee news",
//         "india today",
//         "firstpost",
//         "scroll",
//       ];

//       const isFromReliableSource = reliableSources.some((source) =>
//         (article.source?.name || "").toLowerCase().includes(source)
//       );

//       // Exclude entertainment, celebrity gossip, and sports scores unless major achievement
//       const excludeKeywords = [
//         "bollywood",
//         "celebrity",
//         "film",
//         "movie",
//         "gossip",
//       ];
//       const shouldExclude = excludeKeywords.some((keyword) =>
//         titleAndDescription.includes(keyword.toLowerCase())
//       );

//       return (hasRelevantKeywords || isFromReliableSource) && !shouldExclude;
//     });

//     console.log(`Exam relevant articles: ${examRelevantArticles.length}`);

//     // Categorize articles for different exam subjects
//     const categorizeForExams = (article) => {
//       const content = (
//         article.title +
//         " " +
//         (article.description || "")
//       ).toLowerCase();

//       // Economics & Finance
//       if (
//         content.includes("economy") ||
//         content.includes("gdp") ||
//         content.includes("inflation") ||
//         content.includes("budget") ||
//         content.includes("banking") ||
//         content.includes("rbi") ||
//         content.includes("finance") ||
//         content.includes("monetary") ||
//         content.includes("fiscal")
//       ) {
//         return "Economics";
//       }

//       // International Relations
//       if (
//         content.includes("international") ||
//         content.includes("foreign policy") ||
//         content.includes("diplomacy") ||
//         content.includes("treaty") ||
//         content.includes("summit") ||
//         content.includes("bilateral") ||
//         content.includes("multilateral")
//       ) {
//         return "International Relations";
//       }

//       // Environment & Ecology
//       if (
//         content.includes("environment") ||
//         content.includes("climate") ||
//         content.includes("pollution") ||
//         content.includes("renewable") ||
//         content.includes("biodiversity") ||
//         content.includes("conservation") ||
//         content.includes("ecological")
//       ) {
//         return "Environment";
//       }

//       // Science & Technology
//       if (
//         content.includes("science") ||
//         content.includes("technology") ||
//         content.includes("isro") ||
//         content.includes("space") ||
//         content.includes("research") ||
//         content.includes("innovation") ||
//         content.includes("artificial intelligence") ||
//         content.includes("digital")
//       ) {
//         return "Science & Technology";
//       }

//       // Polity & Governance
//       if (
//         content.includes("government") ||
//         content.includes("policy") ||
//         content.includes("parliament") ||
//         content.includes("constitutional") ||
//         content.includes("judiciary") ||
//         content.includes("supreme court") ||
//         content.includes("high court") ||
//         content.includes("election")
//       ) {
//         return "Polity & Governance";
//       }

//       // Defense & Security
//       if (
//         content.includes("security") ||
//         content.includes("defense") ||
//         content.includes("military") ||
//         content.includes("border") ||
//         content.includes("terrorism") ||
//         content.includes("cyber security") ||
//         content.includes("national security")
//       ) {
//         return "Defense & Security";
//       }

//       // Geography & Disaster Management
//       if (
//         content.includes("geography") ||
//         content.includes("disaster") ||
//         content.includes("cyclone") ||
//         content.includes("earthquake") ||
//         content.includes("flood") ||
//         content.includes("drought") ||
//         content.includes("mountain") ||
//         content.includes("river")
//       ) {
//         return "Geography & Disaster Management";
//       }

//       // Sports & Awards
//       if (
//         content.includes("sports") ||
//         content.includes("olympics") ||
//         content.includes("award") ||
//         content.includes("medal") ||
//         content.includes("championship") ||
//         content.includes("achievement") ||
//         content.includes("recognition")
//       ) {
//         return "Sports & Awards";
//       }

//       // Art & Culture
//       if (
//         content.includes("culture") ||
//         content.includes("heritage") ||
//         content.includes("tradition") ||
//         content.includes("festival") ||
//         content.includes("unesco") ||
//         content.includes("archaeological") ||
//         content.includes("monument")
//       ) {
//         return "Art & Culture";
//       }

//       // Agriculture & Rural Development
//       if (
//         content.includes("agriculture") ||
//         content.includes("farmer") ||
//         content.includes("rural") ||
//         content.includes("crop") ||
//         content.includes("irrigation") ||
//         content.includes("farming")
//       ) {
//         return "Agriculture & Rural Development";
//       }

//       return "General Studies";
//     };

//     // Calculate importance score for prioritization
//     const calculateImportanceScore = (article) => {
//       let score = 0;
//       const content = (
//         article.title +
//         " " +
//         (article.description || "")
//       ).toLowerCase();

//       // High importance indicators
//       const highImportanceKeywords = [
//         "supreme court",
//         "parliament",
//         "constitution",
//         "amendment",
//         "policy",
//         "international treaty",
//         "budget",
//         "economic survey",
//         "rbi policy",
//         "space mission",
//         "defense deal",
//         "diplomatic",
//         "summit",
//         "award",
//         "appointment",
//         "resignation",
//         "new law",
//         "scheme launch",
//       ];

//       highImportanceKeywords.forEach((keyword) => {
//         if (content.includes(keyword)) score += 3;
//       });

//       // Medium importance indicators
//       const mediumImportanceKeywords = [
//         "government",
//         "minister",
//         "scheme",
//         "technology",
//         "innovation",
//         "environment",
//         "climate",
//         "international",
//         "agreement",
//         "cooperation",
//       ];

//       mediumImportanceKeywords.forEach((keyword) => {
//         if (content.includes(keyword)) score += 2;
//       });

//       // Source reliability boost
//       const reliableSources = [
//         "the hindu",
//         "indian express",
//         "pib",
//         "government",
//         "ministry",
//       ];
//       if (
//         reliableSources.some((source) =>
//           (article.source?.name || "").toLowerCase().includes(source)
//         )
//       ) {
//         score += 2;
//       }

//       // Recent news gets priority
//       const publishedDate = new Date(article.publishedAt);
//       const daysDiff = (new Date() - publishedDate) / (1000 * 60 * 60 * 24);
//       if (daysDiff <= 1) score += 2;
//       else if (daysDiff <= 3) score += 1;

//       return Math.min(score, 10); // Cap at 10
//     };

//     // Save articles to database
//     let savedCount = 0;
//     const summary = {
//       total: 0,
//       categories: {},
//     };

//     for (const article of examRelevantArticles) {
//       try {
//         // Validate required fields
//         if (!article.url || !article.title) {
//           console.log("Skipping incomplete article:", article.url || "No URL");
//           continue;
//         }

//         // Check for duplicates
//         const exists = await News.findOne({ url: article.url });
//         if (exists) {
//           console.log(`Already exists: ${article.title.substring(0, 50)}...`);
//           continue;
//         }

//         // Determine category
//         const examCategory = categorizeForExams(article);
//         const importanceScore = calculateImportanceScore(article);

//         // Only save articles with importance score >= 2
//         if (importanceScore < 2) {
//           console.log(
//             `Low importance, skipping: ${article.title.substring(0, 50)}...`
//           );
//           continue;
//         }

//         // Save to database using your existing schema
//         const saved = await News.create({
//           title: article.title,
//           description: article.description || "No description available",
//           url: article.url,
//           urlToImage: article.image || null,
//           publishedAt: new Date(article.publishedAt || Date.now()),
//           source: article.source?.name || "Unknown",
//           category: examCategory,
//         });

//         console.log(
//           `✅ Saved [${examCategory}] [Score: ${importanceScore}]: ${saved.title.substring(
//             0,
//             60
//           )}...`
//         );
//         savedCount++;

//         // Update summary
//         summary.total++;
//         if (!summary.categories[examCategory]) {
//           summary.categories[examCategory] = 0;
//         }
//         summary.categories[examCategory]++;
//       } catch (err) {
//         console.error("Error processing article:", err.message);
//       }
//     }

//     // Print summary
//     console.log(`\n📊 COMPETITIVE EXAM CURRENT AFFAIRS SUMMARY:`);
//     console.log(`═══════════════════════════════════════════════`);
//     console.log(`Total articles processed: ${uniqueArticles.length}`);
//     console.log(`Exam relevant articles: ${examRelevantArticles.length}`);
//     console.log(`Successfully saved: ${savedCount}\n`);

//     console.log(`📚 CATEGORY BREAKDOWN:`);
//     Object.entries(summary.categories).forEach(([category, count]) => {
//       console.log(`  ${category}: ${count} articles`);
//     });

//     console.log(`\n🎯 Focus Areas for Competitive Exams:`);
//     console.log(`  • Government Policies & Schemes`);
//     console.log(`  • Economic Developments`);
//     console.log(`  • International Relations`);
//     console.log(`  • Scientific & Technological Advances`);
//     console.log(`  • Constitutional & Legal Updates`);
//     console.log(`  • Awards & Appointments`);
//     console.log(`  • Sports Achievements`);
//     console.log(`  • Environmental Issues`);

//     return {
//       totalProcessed: uniqueArticles.length,
//       examRelevant: examRelevantArticles.length,
//       saved: savedCount,
//       categories: summary.categories,
//     };
//   } catch (error) {
//     console.error("API fetch failed:", error.message);
//     if (error.response) {
//       console.error("API response:", error.response.data);
//     }
//     throw error;
//   }
// };

// module.exports = fetchCurrentAffairs;

const axios = require("axios");
const News = require("../models/newsModel");
require("dotenv").config(); // Ensure your GNEWS_API_KEY is in .env

const fetchCurrentAffairs = async () => {
  try {
    // Keywords relevant for all competitive exams
    const examRelevantKeywords = [
      "government",
      "policy",
      "parliament",
      "supreme court",
      "high court",
      "election",
      "economy",
      "budget",
      "gdp",
      "inflation",
      "rbi",
      "banking",
      "finance",
      "international",
      "diplomacy",
      "foreign policy",
      "treaty",
      "summit",
      "environment",
      "climate change",
      "renewable energy",
      "pollution",
      "biodiversity",
      "science",
      "technology",
      "isro",
      "space",
      "research",
      "innovation",
      "ai",
      "defense",
      "military",
      "border",
      "security",
      "cyber",
      "terrorism",
      "education",
      "health",
      "social welfare",
      "employment",
      "unemployment",
      "agriculture",
      "farmer",
      "rural development",
      "infrastructure",
      "transport",
      "constitutional",
      "amendment",
      "judiciary",
      "law",
      "act",
      "bill",
      "ordinance",
      "awards",
      "appointment",
      "resignation",
      "cabinet",
      "minister",
      "governor",
      "sports",
      "olympics",
      "world cup",
      "championship",
      "medal",
      "achievement",
      "culture",
      "heritage",
      "festival",
      "tradition",
      "unesco",
      "archaeological",
      "disaster",
      "cyclone",
      "earthquake",
      "flood",
      "drought",
      "emergency",
      "scheme",
      "mission",
      "initiative",
      "program",
      "welfare",
      "subsidy",
      "census",
      "population",
      "demographics",
      "migration",
      "urbanization",
      "trade",
      "export",
      "import",
      "wto",
      "fta",
      "economic cooperation",
    ];

    // Categories to fetch for comprehensive coverage
    const categories = [
      "general",
      "politics",
      "business",
      "science",
      "technology",
      "health",
      "sports",
    ];

    let allArticles = [];

    // Fetch from multiple categories
    for (const category of categories) {
      try {
        console.log(`Fetching ${category} articles...`);

        // GNews API 'max' parameter is typically 10 for free plans.
        // Using 15 might result in fewer articles than expected or errors if not on a paid plan.
        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?country=in&category=${category}&max=15&apikey=${process.env.GNEWS_API_KEY}`
        );

        if (response.data.articles) {
          allArticles = [
            ...allArticles,
            ...response.data.articles.map((article) => ({
              ...article,
              fetchCategory: category, // Keep track of the category it was fetched under
            })),
          ];
        }

        // Add delay to avoid rate limiting (GNews free tier is 100 requests/day, 1 request/second)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (categoryError) {
        console.error(
          `Error fetching ${category} articles:`,
          categoryError.message
        );
        if (categoryError.response) {
          console.error(
            `API Response for ${category}:`,
            categoryError.response.data
          );
        }
      }
    }

    // Important search queries for competitive exams
    const importantSearchQueries = [
      "government scheme india",
      "supreme court judgment",
      "parliament session",
      "international agreement india",
      "economic survey india",
      "space mission india",
      "defense agreement india",
      "environmental policy india",
      "new law india",
      "indian award winner",
      "sports achievement india",
      "scientific discovery india",
      "infrastructure project india",
      "banking policy rbi",
      "international summit india",
    ];

    // Fetch specific searches
    for (const query of importantSearchQueries) {
      try {
        console.log(`Searching for: ${query}`);

        // GNews API 'max' parameter is typically 10 for free plans.
        // Using 5 is generally safe.
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            query
          )}&country=in&max=5&apikey=${process.env.GNEWS_API_KEY}`
        );

        if (response.data.articles) {
          allArticles = [
            ...allArticles,
            ...response.data.articles.map((article) => ({
              ...article,
              fetchCategory: "search", // Mark as from a search query
              searchQuery: query,
            })),
          ];
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (searchError) {
        console.error(`Error searching for "${query}":`, searchError.message);
        if (searchError.response) {
          console.error(
            `API Response for "${query}":`,
            searchError.response.data
          );
        }
      }
    }

    // Remove duplicates based on URL collected from all fetches
    // This is a client-side filter before saving to reduce DB operations.
    const uniqueArticles = allArticles.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.url === article.url)
    );

    console.log(
      `Total unique articles collected from API calls: ${uniqueArticles.length}`
    );

    // Filter articles for competitive exam relevance
    const examRelevantArticles = uniqueArticles.filter((article) => {
      const titleAndDescription = (
        article.title +
        " " +
        (article.description || "")
      ).toLowerCase();

      // Check if article contains exam-relevant keywords
      const hasRelevantKeywords = examRelevantKeywords.some((keyword) =>
        titleAndDescription.includes(keyword.toLowerCase())
      );

      // Filter by reliable sources
      const reliableSources = [
        "the hindu",
        "indian express",
        "times of india",
        "hindustan times",
        "business standard",
        "economic times",
        "livemint",
        "moneycontrol",
        "pib",
        "government",
        "ministry",
        "prs india",
        "observer research foundation",
        "news18",
        "ndtv",
        "zee news",
        "india today",
        "firstpost",
        "scroll",
      ];

      const isFromReliableSource = reliableSources.some((source) =>
        (article.source?.name || "").toLowerCase().includes(source)
      );

      // Exclude entertainment, celebrity gossip, and sports scores unless major achievement
      const excludeKeywords = [
        "bollywood",
        "celebrity",
        "film",
        "movie",
        "gossip",
      ];
      const shouldExclude = excludeKeywords.some((keyword) =>
        titleAndDescription.includes(keyword.toLowerCase())
      );

      return (hasRelevantKeywords || isFromReliableSource) && !shouldExclude;
    });

    console.log(
      `Articles passing initial relevance filter: ${examRelevantArticles.length}`
    );

    // Categorize articles for different exam subjects
    const categorizeForExams = (article) => {
      const content = (
        article.title +
        " " +
        (article.description || "")
      ).toLowerCase();

      // Economics & Finance
      if (
        content.includes("economy") ||
        content.includes("gdp") ||
        content.includes("inflation") ||
        content.includes("budget") ||
        content.includes("banking") ||
        content.includes("rbi") ||
        content.includes("finance") ||
        content.includes("monetary") ||
        content.includes("fiscal") ||
        content.includes("tax") ||
        content.includes("investment") ||
        content.includes("trade")
      ) {
        return "Economics & Finance";
      }

      // International Relations
      if (
        content.includes("international") ||
        content.includes("foreign policy") ||
        content.includes("diplomacy") ||
        content.includes("treaty") ||
        content.includes("summit") ||
        content.includes("bilateral") ||
        content.includes("multilateral") ||
        content.includes("un") ||
        content.includes("global") ||
        content.includes("geopolitics")
      ) {
        return "International Relations";
      }

      // Environment & Ecology
      if (
        content.includes("environment") ||
        content.includes("climate") ||
        content.includes("pollution") ||
        content.includes("renewable") ||
        content.includes("biodiversity") ||
        content.includes("conservation") ||
        content.includes("ecological") ||
        content.includes("forest") ||
        content.includes("wildlife") ||
        content.includes("sustainability")
      ) {
        return "Environment & Ecology";
      }

      // Science & Technology
      if (
        content.includes("science") ||
        content.includes("technology") ||
        content.includes("isro") ||
        content.includes("space") ||
        content.includes("research") ||
        content.includes("innovation") ||
        content.includes("artificial intelligence") ||
        content.includes("digital") ||
        content.includes("biotechnology") ||
        content.includes("it") ||
        content.includes("startup")
      ) {
        return "Science & Technology";
      }

      // Polity & Governance
      if (
        content.includes("government") ||
        content.includes("policy") ||
        content.includes("parliament") ||
        content.includes("constitutional") ||
        content.includes("judiciary") ||
        content.includes("supreme court") ||
        content.includes("high court") ||
        content.includes("election") ||
        content.includes("law") ||
        content.includes("act") ||
        content.includes("bill") ||
        content.includes("ordinance") ||
        content.includes("governance") ||
        content.includes("administration")
      ) {
        return "Polity & Governance";
      }

      // Defense & Security
      if (
        content.includes("security") ||
        content.includes("defense") ||
        content.includes("military") ||
        content.includes("border") ||
        content.includes("terrorism") ||
        content.includes("cyber security") ||
        content.includes("national security") ||
        content.includes("army") ||
        content.includes("navy") ||
        content.includes("air force")
      ) {
        return "Defense & Security";
      }

      // Geography & Disaster Management
      if (
        content.includes("geography") ||
        content.includes("disaster") ||
        content.includes("cyclone") ||
        content.includes("earthquake") ||
        content.includes("flood") ||
        content.includes("drought") ||
        content.includes("mountain") ||
        content.includes("river") ||
        content.includes("climate event") ||
        content.includes("natural calamity")
      ) {
        return "Geography & Disaster Management";
      }

      // Sports & Awards
      if (
        content.includes("sports") ||
        content.includes("olympics") ||
        content.includes("award") ||
        content.includes("medal") ||
        content.includes("championship") ||
        content.includes("achievement") ||
        content.includes("recognition") ||
        content.includes("trophy") ||
        content.includes("winner")
      ) {
        return "Sports & Awards";
      }

      // Art & Culture
      if (
        content.includes("culture") ||
        content.includes("heritage") ||
        content.includes("tradition") ||
        content.includes("festival") ||
        content.includes("unesco") ||
        content.includes("archaeological") ||
        content.includes("monument") ||
        content.includes("art") ||
        content.includes("history") ||
        content.includes("museum")
      ) {
        return "Art & Culture";
      }

      // Agriculture & Rural Development
      if (
        content.includes("agriculture") ||
        content.includes("farmer") ||
        content.includes("rural") ||
        content.includes("crop") ||
        content.includes("irrigation") ||
        content.includes("farming") ||
        content.includes("food security") ||
        content.includes("msps")
      ) {
        return "Agriculture & Rural Development";
      }

      // Social Issues & Welfare
      if (
        content.includes("education") ||
        content.includes("health") ||
        content.includes("social welfare") ||
        content.includes("employment") ||
        content.includes("unemployment") ||
        content.includes("poverty") ||
        content.includes("gender") ||
        content.includes("child") ||
        content.includes("scheme") ||
        content.includes("program") ||
        content.includes("mission")
      ) {
        return "Social Issues & Welfare";
      }

      // Miscellaneous / General Studies (fallback)
      return "General Studies";
    };

    // Calculate importance score for prioritization
    const calculateImportanceScore = (article) => {
      let score = 0;
      const content = (
        article.title +
        " " +
        (article.description || "")
      ).toLowerCase();

      // High importance indicators
      const highImportanceKeywords = [
        "supreme court",
        "parliament",
        "constitution",
        "amendment",
        "policy",
        "international treaty",
        "budget",
        "economic survey",
        "rbi policy",
        "space mission",
        "defense deal",
        "diplomatic",
        "summit",
        "award",
        "appointment",
        "resignation",
        "new law",
        "scheme launch",
        "gdp growth",
        "election commission",
        "cabinet decision",
        "bilateral talks",
      ];

      highImportanceKeywords.forEach((keyword) => {
        if (content.includes(keyword)) score += 3;
      });

      // Medium importance indicators
      const mediumImportanceKeywords = [
        "government",
        "minister",
        "scheme",
        "technology",
        "innovation",
        "environment",
        "climate",
        "international",
        "agreement",
        "cooperation",
        "infrastructure",
        "banking",
        "finance",
        "research",
        "health policy",
        "education reform",
        "agricultural policy",
        "urban development",
      ];

      mediumImportanceKeywords.forEach((keyword) => {
        if (content.includes(keyword)) score += 2;
      });

      // Source reliability boost
      const reliableSources = [
        "the hindu",
        "indian express",
        "pib",
        "government",
        "ministry",
        "prs india",
        "observer research foundation",
        "livemint",
        "business standard",
      ];
      if (
        reliableSources.some((source) =>
          (article.source?.name || "").toLowerCase().includes(source)
        )
      ) {
        score += 2;
      }

      // Recent news gets priority (more recent = higher score)
      const publishedDate = new Date(article.publishedAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
      const diffHours = diffTime / (1000 * 60 * 60);

      if (diffHours <= 6) score += 3; // Very recent
      else if (diffHours <= 24) score += 2; // Within today
      else if (diffHours <= 72) score += 1; // Within last 3 days

      return Math.min(score, 15); // Cap at a reasonable score
    };

    // Save articles to database
    let savedCount = 0;
    let skippedCount = 0; // To track articles skipped due to low importance or existing
    const summary = {
      totalProcessedForSaving: 0,
      saved: 0,
      skipped: 0,
      categories: {},
    };

    for (const article of examRelevantArticles) {
      summary.totalProcessedForSaving++;
      try {
        // Validate required fields
        if (!article.url || !article.title) {
          console.warn(
            "Skipping incomplete article (missing URL or title):",
            article.url || "No URL"
          );
          skippedCount++;
          continue;
        }

        // Determine category and importance score
        const examCategory = categorizeForExams(article);
        const importanceScore = calculateImportanceScore(article);

        // Only save articles with importance score >= 2
        if (importanceScore < 2) {
          console.log(
            `Low importance (score ${importanceScore}), skipping: ${article.title.substring(
              0,
              50
            )}...`
          );
          skippedCount++;
          continue;
        }

        // Prepare article data for saving
        const articleData = {
          title: article.title,
          description: article.description || "No description available",
          url: article.url,
          urlToImage: article.image || null, // GNews uses 'image' field for URL to image
          publishedAt: new Date(article.publishedAt || Date.now()), // Ensure it's a Date object
          source: article.source?.name || "Unknown",
          category: examCategory, // Use the categorized value
          // You might add importanceScore to your News schema if you want to store it
          // importanceScore: importanceScore,
        };

        // Use findOneAndUpdate with upsert: true for atomic insert/update and duplicate prevention
        const result = await News.findOneAndUpdate(
          { url: articleData.url }, // Query by unique URL
          { $set: articleData }, // Set all fields
          {
            upsert: true, // Create if not found
            new: true, // Return the updated/new document
            setDefaultsOnInsert: true, // Apply schema defaults on insert
          }
        );

        // Check if the document was actually new or existing
        if (result && result._id) {
          // Check if a document was returned
          // Mongoose's findOneAndUpdate with upsert doesn't directly return `isNew` like `create` might.
          // A common pattern to check if it was an insert is to look at `result.isNew` if it's a new document
          // or compare `result.createdAt` with `result.updatedAt` if they are very close.
          // For simplicity, we'll assume if it was found, it's not a 'new' save for our count.
          // If you strictly want to count only *newly inserted* articles, you'd need a different approach
          // like `insertMany` with `ordered: false` and error handling for duplicates,
          // or `findOne` then `create` with proper locking/retry logic, which is more complex.
          // For now, we'll count it as saved if it was either inserted or updated.
          // To strictly count only new inserts, you'd need to fetch and then create,
          // or use `insertMany` and catch duplicate errors.
          // For this use case, `findOneAndUpdate` is generally preferred for robustness.

          // Simplified check: if `result.createdAt` is very close to `result.updatedAt`, it's likely new.
          const wasInserted =
            result.createdAt &&
            result.updatedAt &&
            Math.abs(result.createdAt.getTime() - result.updatedAt.getTime()) <
              5000; // within 5 seconds

          if (wasInserted) {
            console.log(
              `✅ Saved NEW [${examCategory}] [Score: ${importanceScore}]: ${result.title.substring(
                0,
                60
              )}...`
            );
            savedCount++;
          } else {
            console.log(
              `🔄 Updated EXISTING [${examCategory}] [Score: ${importanceScore}]: ${result.title.substring(
                0,
                60
              )}...`
            );
            skippedCount++; // Count as skipped for new inserts, as it was already there
          }
        } else {
          console.warn(`Could not save/update article: ${article.url}`);
          skippedCount++;
        }

        // Update summary
        if (!summary.categories[examCategory]) {
          summary.categories[examCategory] = 0;
        }
        summary.categories[examCategory]++;
      } catch (err) {
        // Handle specific duplicate key error if it somehow occurs (e.g., race condition before upsert)
        if (err.code === 11000) {
          console.warn(
            `Duplicate key error (URL already exists), skipping: ${article.url}`
          );
          skippedCount++;
        } else {
          console.error(
            `Error processing article (${article.url}):`,
            err.message
          );
          skippedCount++;
        }
      }
    }

    // Print summary
    console.log(`\n📊 COMPETITIVE EXAM CURRENT AFFAIRS SUMMARY:`);
    console.log(`═══════════════════════════════════════════════`);
    console.log(`Total articles collected from API: ${allArticles.length}`);
    console.log(
      `Total unique articles after client-side dedupe: ${uniqueArticles.length}`
    );
    console.log(
      `Articles passing relevance filter: ${examRelevantArticles.length}`
    );
    console.log(`Successfully saved/updated: ${savedCount}`);
    console.log(`Skipped (existing/low importance/errors): ${skippedCount}\n`);

    console.log(`📚 CATEGORY BREAKDOWN:`);
    Object.entries(summary.categories).forEach(([category, count]) => {
      console.log(`   • ${category}: ${count} articles`);
    });

    console.log(`\n🎯 Focus Areas for Competitive Exams:`);
    console.log(`   • Government Policies & Schemes`);
    console.log(`   • Economic Developments`);
    console.log(`   • International Relations`);
    console.log(`   • Scientific & Technological Advances`);
    console.log(`   • Constitutional & Legal Updates`);
    console.log(`   • Awards & Appointments`);
    console.log(`   • Sports Achievements`);
    console.log(`   • Environmental Issues`);
    console.log(`   • Social Issues & Welfare`);
    console.log(`   • Defense & Security`);
    console.log(`   • Geography & Disaster Management`);
    console.log(`   • Art & Culture`);
    console.log(`   • Agriculture & Rural Development`);

    return {
      totalCollected: allArticles.length,
      uniqueCollected: uniqueArticles.length,
      examRelevant: examRelevantArticles.length,
      savedOrUpdated: savedCount,
      skipped: skippedCount,
      categories: summary.categories,
    };
  } catch (error) {
    console.error(
      "Critical error during current affairs fetch process:",
      error.message
    );
    if (error.response) {
      console.error("API response data:", error.response.data);
    }
    throw error; // Re-throw to be caught by the cron job handler
  }
};

module.exports = fetchCurrentAffairs;