// const axios = require("axios");
// const News = require("../models/newsModel"); // Make sure this matches your model import
// require("dotenv").config();

// const fetchCurrentAffairs = async () => {
//   try {
//     // Fetch top headlines from India using GNews API
//     const response = await axios.get(
//       `https://gnews.io/api/v4/top-headlines?country=in&max=20&apikey=${process.env.GNEWS_API_KEY}`
//     );

//     console.log(`Fetched ${response.data.articles.length} articles`);

//     for (const article of response.data.articles) {
//       try {
//         // Validate required fields
//         if (!article.url || !article.title || !article.image) {
//           console.log("Skipping incomplete article:", article.url || "No URL");
//           continue;
//         }

//         // Check for duplicates
//         const exists = await News.findOne({ url: article.url });
//         if (exists) {
//           console.log(`Already exists: ${article.title}`);
//           continue;
//         }

//         // Save to database
//         const saved = await News.create({
//           title: article.title,
//           description: article.description || "No description",
//           content: article.content || "No content",
//           url: article.url,
//           urlToImage: article.image,
//           publishedAt: new Date(article.publishedAt || Date.now()),
//           source: article.source?.name || "Unknown",
//           category: "india",
//         });

//         console.log(`✅ Saved: ${saved.title}`);
//       } catch (err) {
//         console.error("Error processing article:", err.message);
//       }
//     }
//   } catch (error) {
//     console.error("API fetch failed:", error.message);
//     console.error("API response:", error.response?.data);
//   }
// };

// module.exports = fetchCurrentAffairs;


const axios = require("axios");
const News = require("../models/newsModel");
require("dotenv").config();

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

        const response = await axios.get(
          `https://gnews.io/api/v4/top-headlines?country=in&category=${category}&max=15&apikey=${process.env.GNEWS_API_KEY}`
        );

        if (response.data.articles) {
          allArticles = [
            ...allArticles,
            ...response.data.articles.map((article) => ({
              ...article,
              fetchCategory: category,
            })),
          ];
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (categoryError) {
        console.error(`Error fetching ${category}:`, categoryError.message);
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
              fetchCategory: "search",
              searchQuery: query,
            })),
          ];
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (searchError) {
        console.error(`Error searching for ${query}:`, searchError.message);
      }
    }

    // Remove duplicates based on URL
    const uniqueArticles = allArticles.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.url === article.url)
    );

    console.log(`Total unique articles fetched: ${uniqueArticles.length}`);

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

    console.log(`Exam relevant articles: ${examRelevantArticles.length}`);

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
        content.includes("fiscal")
      ) {
        return "Economics";
      }

      // International Relations
      if (
        content.includes("international") ||
        content.includes("foreign policy") ||
        content.includes("diplomacy") ||
        content.includes("treaty") ||
        content.includes("summit") ||
        content.includes("bilateral") ||
        content.includes("multilateral")
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
        content.includes("ecological")
      ) {
        return "Environment";
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
        content.includes("digital")
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
        content.includes("election")
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
        content.includes("national security")
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
        content.includes("river")
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
        content.includes("recognition")
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
        content.includes("monument")
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
        content.includes("farming")
      ) {
        return "Agriculture & Rural Development";
      }

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
      ];
      if (
        reliableSources.some((source) =>
          (article.source?.name || "").toLowerCase().includes(source)
        )
      ) {
        score += 2;
      }

      // Recent news gets priority
      const publishedDate = new Date(article.publishedAt);
      const daysDiff = (new Date() - publishedDate) / (1000 * 60 * 60 * 24);
      if (daysDiff <= 1) score += 2;
      else if (daysDiff <= 3) score += 1;

      return Math.min(score, 10); // Cap at 10
    };

    // Save articles to database
    let savedCount = 0;
    const summary = {
      total: 0,
      categories: {},
    };

    for (const article of examRelevantArticles) {
      try {
        // Validate required fields
        if (!article.url || !article.title) {
          console.log("Skipping incomplete article:", article.url || "No URL");
          continue;
        }

        // Check for duplicates
        const exists = await News.findOne({ url: article.url });
        if (exists) {
          console.log(`Already exists: ${article.title.substring(0, 50)}...`);
          continue;
        }

        // Determine category
        const examCategory = categorizeForExams(article);
        const importanceScore = calculateImportanceScore(article);

        // Only save articles with importance score >= 2
        if (importanceScore < 2) {
          console.log(
            `Low importance, skipping: ${article.title.substring(0, 50)}...`
          );
          continue;
        }

        // Save to database using your existing schema
        const saved = await News.create({
          title: article.title,
          description: article.description || "No description available",
          url: article.url,
          urlToImage: article.image || null,
          publishedAt: new Date(article.publishedAt || Date.now()),
          source: article.source?.name || "Unknown",
          category: examCategory,
        });

        console.log(
          `✅ Saved [${examCategory}] [Score: ${importanceScore}]: ${saved.title.substring(
            0,
            60
          )}...`
        );
        savedCount++;

        // Update summary
        summary.total++;
        if (!summary.categories[examCategory]) {
          summary.categories[examCategory] = 0;
        }
        summary.categories[examCategory]++;
      } catch (err) {
        console.error("Error processing article:", err.message);
      }
    }

    // Print summary
    console.log(`\n📊 COMPETITIVE EXAM CURRENT AFFAIRS SUMMARY:`);
    console.log(`═══════════════════════════════════════════════`);
    console.log(`Total articles processed: ${uniqueArticles.length}`);
    console.log(`Exam relevant articles: ${examRelevantArticles.length}`);
    console.log(`Successfully saved: ${savedCount}\n`);

    console.log(`📚 CATEGORY BREAKDOWN:`);
    Object.entries(summary.categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} articles`);
    });

    console.log(`\n🎯 Focus Areas for Competitive Exams:`);
    console.log(`  • Government Policies & Schemes`);
    console.log(`  • Economic Developments`);
    console.log(`  • International Relations`);
    console.log(`  • Scientific & Technological Advances`);
    console.log(`  • Constitutional & Legal Updates`);
    console.log(`  • Awards & Appointments`);
    console.log(`  • Sports Achievements`);
    console.log(`  • Environmental Issues`);

    return {
      totalProcessed: uniqueArticles.length,
      examRelevant: examRelevantArticles.length,
      saved: savedCount,
      categories: summary.categories,
    };
  } catch (error) {
    console.error("API fetch failed:", error.message);
    if (error.response) {
      console.error("API response:", error.response.data);
    }
    throw error;
  }
};

module.exports = fetchCurrentAffairs;