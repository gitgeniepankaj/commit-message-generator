const { getStagedChangesDiff } = require("./git/gitService");
const { generateCommitMessage } = require("./ai/aiService");

async function main() {
  // Get repository path from command line arguments or environment variable
  const repoPath = process.argv[2] || process.env.REPO_PATH;
  if (!repoPath) {
    console.error("Error: Please provide a repository path.");
    return;
  }

  try {
    const diffSummary = await getStagedChangesDiff(repoPath);
    if (diffSummary) {
      // Convert diff summary object to string for processing
      const commitMessage = await generateCommitMessage(
        JSON.stringify(diffSummary)
      );
      console.log("Generated Commit Message:", commitMessage);
    } else {
      console.log("No diff available to generate a commit message.");
    }
  } catch (error) {
    console.error("Failed to generate commit message due to an error:", error);
  }
}

main();
