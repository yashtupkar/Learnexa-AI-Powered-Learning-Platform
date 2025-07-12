const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// Create axios instance with better defaults
const axiosInstance = axios.create({
  timeout: 60000, // 60 seconds timeout
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
  },
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Response received: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    } else if (error.response) {
      console.error(
        `HTTP Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Supported subjects and their topics
const SUBJECTS = {
  aptitude: [
    "percentage",
    "profit-and-loss",
    "simple-interest",
    "compound-interest",
    "ratio-and-proportion",
    "time-and-work",
    "time-and-distance",
    "probability",
    "permutation-and-combination",
    "problems-on-numbers",
    "problems-on-ages",
    "surds-and-indices",
    "clock",
    "calendar",
    "area",
    "volume-and-surface-area",
    "numbers",
    "problems-on-hcf-and-lcm",
    "decimal-fraction",
    "simplification",
    "square-root-and-cube-root",
    "average",
    "bankers-discount",
    "partnership",
    "chain-rule",
    "boats-and-streams",
    "alligation-or-mixture",
    "races-and-games",
    "stock-and-shares",
    "pipes-and-cistern",
    "problems-on-trains",
    "height-and-distance",
  ],
  "verbal-reasoning": [
    "blood-relation-test",
    "syllogism",
    "series-completion",
    "analogy",
    "arithmetic-reasoning",
    "coding-and-decoding",
    "direction-sense-test",
    "number-series",
    "sequential-output-tracing",
    "symbols-and-notations",
    "logical-sequence-of-words",
    "verification-of-truth",
    "classification",
    "data-sufficiency",
    "puzzle-test",
    "logical-venn-diagrams",
    "alphabet-test",
    "sitting-arrangement",
    "decision-making",
    "assertion-and-reason",
    "inserting-the-missing-character",
    "logical-games",
    "statement-and-arguments",
    "statement-and-assumptions",
    "statement-and-conclusions",
    "course-of-action",
    "cause-and-effect",
  ],
  "logical-reasoning": [
    "number-series",
    "letter-and-symbol-series",
    "logical-problems",
    "essential-part",
    "artificial-language",
    "matching-definitions",
    "making-judgments",
    "theme-detection",
    "verbal-classification",
    "analyzing-arguments",
    "logical-deduction",
    "letter-series",
    "statement-and-conclusion",
    "cause-and-effect",
    "logical-problems",
  ],
};

// Validate subject and topic
function validateSubjectAndTopic(subject, topic) {
  if (!SUBJECTS[subject]) {
    throw new Error(
      `Invalid subject. Supported subjects: ${Object.keys(SUBJECTS).join(", ")}`
    );
  }

  if (!SUBJECTS[subject].includes(topic)) {
    throw new Error(
      `Invalid topic for ${subject}. Supported topics: ${SUBJECTS[subject].join(
        ", "
      )}`
    );
  }

  return true;
}

async function scrapeQuestionsFromPage($) {
  const questions = [];

  // Find all question containers
  $(".bix-div-container").each((index, container) => {
    const question = {};
    const $container = $(container);

    // Extract question number and text
    const questionText = $container.find(".bix-td-qtxt").text().trim();
    const questionParts = questionText.split(".", 2);

    if (questionParts.length > 1) {
      question.number = questionParts[0].trim();
      question.text = questionText
        .substring(questionText.indexOf(".") + 1)
        .trim();
    } else {
      question.text = questionText.trim();
    }

    // Extract options
    question.options = [];
    $container.find(".bix-opt-row").each((i, opt) => {
      const $opt = $(opt);
      const letter = $opt
        .find('span[class^="option-svg-letter-"]')
        .attr("class")
        ?.replace("option-svg-letter-", "")
        .toUpperCase();
      const text = $opt.find(".bix-td-option-val").text().trim();

      if (letter && text) {
        question.options.push({
          letter,
          text,
        });
      }
    });

    // Extract correct answer
    const correctAnswer = $container.find(".jq-hdnakq").val();
    if (correctAnswer) {
      question.correctAnswer = correctAnswer;
    }

    // Extract explanation
    const explanation = $container.find(".bix-ans-description").text().trim();
    if (explanation) {
      question.explanation = explanation;
    }

    // Only add question if it has content
    if (question.text || question.options.length > 0) {
      questions.push(question);
    }
  });

  return questions;
}

async function detectPaginationPattern(subject, topic) {
  try {
    validateSubjectAndTopic(subject, topic);
    console.log(
      `Detecting pagination pattern for subject: ${subject}, topic: ${topic}`
    );

    const baseUrl = "https://www.indiabix.com";
    const apiKey =
      process.env.SCRAPER_API_KEY || "55b758ce8ab981769fee7f5ceb83d71c";
    const topicUrl = `${baseUrl}/${subject}/${topic}/`;
    const proxyUrl = `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(
      topicUrl
    )}&render=false&session_number=1`;

    const response = await axiosInstance.get(proxyUrl);
    const htmlContent =
      typeof response.data === "string"
        ? response.data
        : response.data.body || response.data.html;
    const $ = cheerio.load(htmlContent);

    // Look for pagination links that match the pattern /subject/topic/XXXXXX
    const paginationLinks = $('a[href*="/' + topic + '/"]');
    const pageNumbers = [];

    paginationLinks.each((i, link) => {
      const href = $(link).attr("href");
      const regex = new RegExp(`/${subject}/${topic}/(\\d{6})/?$`);
      const match = href.match(regex);

      if (match) {
        pageNumbers.push(parseInt(match[1]));
      }
    });

    if (pageNumbers.length > 0) {
      // Sort to find the pattern
      pageNumbers.sort((a, b) => a - b);
      const uniquePageNumbers = [...new Set(pageNumbers)]; // Remove duplicates
      const baseNumber = uniquePageNumbers[0];
      console.log(
        `Found pagination pattern for ${topic}: starts at ${baseNumber}`
      );
      console.log(`All page numbers found: ${uniquePageNumbers.join(", ")}`);

      return {
        hasPages: true,
        baseNumber: baseNumber,
        allPageNumbers: uniquePageNumbers,
        increment:
          uniquePageNumbers.length > 1
            ? uniquePageNumbers[1] - uniquePageNumbers[0]
            : 1,
      };
    }

    // If no pagination links found, check for other indicators
    const nextLinks = $("a").filter(function () {
      const text = $(this).text().toLowerCase();
      const href = $(this).attr("href") || "";
      return (
        (text.includes("next") || text.includes("»") || text.includes("2")) &&
        href.includes(topic)
      );
    });

    if (nextLinks.length > 0) {
      console.log(`Found potential next page indicators for ${topic}`);
      nextLinks.each((i, link) => {
        console.log(
          `Next link: ${$(link).attr("href")} - Text: "${$(link).text()}"`
        );
      });
    }

    return {
      hasPages: false,
      baseNumber: null,
      allPageNumbers: [],
      increment: 1,
    };
  } catch (error) {
    console.error("Error detecting pagination pattern:", error.message);
    return {
      hasPages: false,
      baseNumber: null,
      allPageNumbers: [],
      increment: 1,
    };
  }
}

async function getPageContent(
  subject,
  topic,
  page = 1,
  paginationPattern = null
) {
  validateSubjectAndTopic(subject, topic);

  const baseUrl = "https://www.indiabix.com";
  const apiKey =
    process.env.SCRAPER_API_KEY || "55b758ce8ab981769fee7f5ceb83d71c";

  // Construct the topic URL with pagination
  let topicUrl;
  if (page === 1) {
    topicUrl = `${baseUrl}/${subject}/${topic}/`;
  } else {
    if (paginationPattern && paginationPattern.baseNumber) {
      // Use the detected pattern
      const pageNumber =
        paginationPattern.baseNumber + (page - 2) * paginationPattern.increment;
      const pageNumberStr = String(pageNumber).padStart(6, "0");
      topicUrl = `${baseUrl}/${subject}/${topic}/${pageNumberStr}`;
    } else {
      // Fallback to common patterns, we'll try to detect on the fly
      console.log(
        `No pagination pattern provided for page ${page}, attempting to detect...`
      );
      return null;
    }
  }

  // Build the ScraperAPI URL with proper encoding
  const proxyUrl = `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(
    topicUrl
  )}&render=false&session_number=1`;

  try {
    console.log(
      `Fetching content for subject: ${subject}, topic: ${topic}, page: ${page}`
    );
    console.log(`Target URL: ${topicUrl}`);

    const response = await axiosInstance.get(proxyUrl);
    const data = response.data;

    // Handle different response formats from ScraperAPI
    let htmlContent;
    if (typeof data === "string") {
      htmlContent = data;
    } else if (data.body) {
      htmlContent = data.body;
    } else if (data.html) {
      htmlContent = data.html;
    } else {
      htmlContent = JSON.stringify(data);
    }

    const $ = cheerio.load(htmlContent);
    const questions = await scrapeQuestionsFromPage($);

    // Improved pagination detection for IndiaBix
    let hasNextPage = false;
    let maxPageNumber = 1;

    // If we have a pagination pattern, use it to determine if there are more pages
    if (paginationPattern && paginationPattern.allPageNumbers.length > 0) {
      maxPageNumber = paginationPattern.allPageNumbers.length;
      hasNextPage = page < maxPageNumber;
    } else {
      // Try to detect pagination on this page
      const paginationLinks = $('a[href*="/' + topic + '/"]');
      const pageNumbers = [];

      paginationLinks.each((i, link) => {
        const href = $(link).attr("href");
        const regex = new RegExp(`/${subject}/${topic}/(\\d{6})/?$`);
        const match = href.match(regex);

        if (match) {
          pageNumbers.push(parseInt(match[1]));
        }
      });

      if (pageNumbers.length > 0) {
        maxPageNumber = pageNumbers.length + 1; // +1 for the current page
        hasNextPage = page < maxPageNumber;
      }
    }

    // Also check for "Next" button or pagination indicators
    const nextButton = $("a").filter(function () {
      const text = $(this).text().toLowerCase();
      const href = $(this).attr("href") || "";
      return (
        (text.includes("next") || text.includes("»")) && href.includes(topic)
      );
    });

    if (nextButton.length > 0) {
      hasNextPage = true;
    }

    return {
      success: true,
      subject: subject,
      topic: topic,
      currentPage: page,
      hasNextPage: hasNextPage,
      maxPageNumber: maxPageNumber,
      questions: questions,
      questionsCount: questions.length,
      url: topicUrl,
    };
  } catch (error) {
    console.error(`Error fetching page ${page} content:`, error.message);
    throw error;
  }
}

async function getAllPagesContent(subject, topic, maxPages = 50) {
  validateSubjectAndTopic(subject, topic);

  let allQuestions = [];
  let currentPage = 1;
  let hasMorePages = true;
  let consecutiveEmptyPages = 0;
  const maxConsecutiveEmptyPages = 3;
  let paginationPattern = null;

  console.log(
    `Starting to fetch all pages for subject: ${subject}, topic: ${topic}`
  );

  // First, detect the pagination pattern
  console.log(`\n--- Detecting pagination pattern ---`);
  paginationPattern = await detectPaginationPattern(subject, topic);

  if (paginationPattern.hasPages) {
    console.log(
      `✓ Pagination pattern detected: base=${paginationPattern.baseNumber}, increment=${paginationPattern.increment}`
    );
    console.log(
      `✓ Found ${
        paginationPattern.allPageNumbers.length
      } page numbers: ${paginationPattern.allPageNumbers.join(", ")}`
    );
  } else {
    console.log(`⚠ No pagination pattern detected, will try sequential pages`);
  }

  while (hasMorePages && currentPage <= maxPages) {
    try {
      console.log(`\n--- Fetching page ${currentPage} ---`);
      const result = await getPageContentWithRetry(
        subject,
        topic,
        currentPage,
        paginationPattern
      );

      if (!result) {
        console.log(
          `Page ${currentPage} could not be fetched (no pagination pattern)`
        );
        break;
      }

      if (result.questions.length === 0) {
        consecutiveEmptyPages++;
        console.log(
          `Page ${currentPage} has no questions. Empty pages count: ${consecutiveEmptyPages}`
        );

        if (consecutiveEmptyPages >= maxConsecutiveEmptyPages) {
          console.log(
            `Stopping after ${maxConsecutiveEmptyPages} consecutive empty pages`
          );
          break;
        }
      } else {
        consecutiveEmptyPages = 0; // Reset counter if we found questions
        allQuestions = [...allQuestions, ...result.questions];
        console.log(
          `Page ${currentPage}: Found ${result.questions.length} questions. Total so far: ${allQuestions.length}`
        );
      }

      // Check if we've reached the end based on pagination pattern
      if (
        paginationPattern.hasPages &&
        currentPage >= paginationPattern.allPageNumbers.length + 1
      ) {
        console.log(
          `Reached end of known pages (${
            paginationPattern.allPageNumbers.length + 1
          } total)`
        );
        break;
      }

      currentPage++;

      // Add delay between requests to be respectful
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to fetch page ${currentPage}:`, error.message);

      // If we get an error, it might mean we've reached the end or there's a temporary issue
      if (consecutiveEmptyPages > 0 || currentPage > 5) {
        console.log(
          `Stopping due to error on page ${currentPage} (likely reached end)`
        );
        hasMorePages = false;
      } else {
        console.log(
          `Continuing to next page despite error on page ${currentPage}`
        );
        currentPage++;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  }

  console.log(`\n=== Scraping Complete ===`);
  console.log(`Subject: ${subject}`);
  console.log(`Topic: ${topic}`);
  console.log(`Total pages processed: ${currentPage - 1}`);
  console.log(`Total questions found: ${allQuestions.length}`);

  return {
    success: true,
    subject: subject,
    topic: topic,
    totalPages: currentPage - 1,
    totalQuestions: allQuestions.length,
    paginationPattern: paginationPattern,
    questions: allQuestions,
  };
}

async function getPageContentWithRetry(
  subject,
  topic,
  page = 1,
  paginationPattern = null,
  maxRetries = 3
) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Attempt ${attempt}/${maxRetries} for subject: ${subject}, topic: ${topic}, page: ${page}`
      );
      const result = await getPageContent(
        subject,
        topic,
        page,
        paginationPattern
      );
      if (result) {
        return result;
      } else {
        throw new Error("No result returned from getPageContent");
      }
    } catch (error) {
      lastError = error;
      console.log(
        `Attempt ${attempt} failed for subject ${subject}, topic ${topic}, page ${page}:`,
        error.message
      );

      if (attempt === maxRetries) {
        break;
      }

      // Wait before retry (exponential backoff)
      const delay = Math.min(2000 * Math.pow(2, attempt - 1), 30000);
      console.log(`Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

async function analyzePagination(subject, topic) {
  try {
    validateSubjectAndTopic(subject, topic);
    console.log(
      `Analyzing pagination structure for subject: ${subject}, topic: ${topic}`
    );
    const result = await getPageContent(subject, topic, 1);

    const baseUrl = "https://www.indiabix.com";
    const apiKey =
      process.env.SCRAPER_API_KEY || "55b758ce8ab981769fee7f5ceb83d71c";
    const topicUrl = `${baseUrl}/${subject}/${topic}/`;
    const proxyUrl = `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(
      topicUrl
    )}&render=false&session_number=1`;

    const response = await axiosInstance.get(proxyUrl);
    const htmlContent =
      typeof response.data === "string"
        ? response.data
        : response.data.body || response.data.html;
    const $ = cheerio.load(htmlContent);

    // Look for all pagination-related links
    const allLinks = $('a[href*="/' + topic + '/"]');
    console.log(`Found ${allLinks.length} topic-related links`);

    const pageLinks = [];
    allLinks.each((i, link) => {
      const href = $(link).attr("href");
      const text = $(link).text().trim();
      if (href && href.includes(topic)) {
        pageLinks.push({ href, text });
      }
    });

    console.log("Pagination links found:", pageLinks);

    // Look for specific pagination patterns
    const paginationContainer = $(".pagination, .page-navigation, .page-links");
    if (paginationContainer.length > 0) {
      console.log("Pagination container found:", paginationContainer.html());
    }

    return { pageLinks, paginationContainer: paginationContainer.html() };
  } catch (error) {
    console.error("Error analyzing pagination:", error.message);
    return { pageLinks: [], paginationContainer: null };
  }
}

// Test function to validate the content fetching
async function testContentFetch(subject = "aptitude", topic = "probability") {
  try {
    validateSubjectAndTopic(subject, topic);
    console.log(
      `Testing content fetch with subject: '${subject}', topic: '${topic}'...`
    );

    const result = await getAllPagesContent(subject, topic);
    console.log("Test successful! Total questions:", result.totalQuestions);

    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Save all questions to JSON
    const filename = path.join(outputDir, `${subject}_${topic}_questions.json`);
    fs.writeFileSync(filename, JSON.stringify(result.questions, null, 2));
    console.log(`Saved all questions to ${filename}`);

    // Save summary
    const summary = {
      subject: result.subject,
      topic: result.topic,
      totalPages: result.totalPages,
      totalQuestions: result.totalQuestions,
      paginationPattern: result.paginationPattern,
      scrapedAt: new Date().toISOString(),
    };

    const summaryFilename = path.join(
      outputDir,
      `${subject}_${topic}_summary.json`
    );
    fs.writeFileSync(summaryFilename, JSON.stringify(summary, null, 2));
    console.log(`Saved scraping summary to ${summaryFilename}`);

    return result;
  } catch (error) {
    console.error("Test failed:", error.message);
    throw error;
  }
}

// Function to get all supported subjects and topics
function getSupportedSubjects() {
  return SUBJECTS;
}

module.exports = {
  getPageContent: getPageContentWithRetry,
  getAllPagesContent,
  getPageContentDirect: getPageContent,
  detectPaginationPattern,
  testContentFetch,
  analyzePagination,
  scrapeQuestionsFromPage,
  getSupportedSubjects,
  validateSubjectAndTopic,
};