const simpleGit = require("simple-git");

/**
 * Retrieves a summary of staged changes in a Git repository compared to the last commit.
 *
 * @param {string} repoPath The file path of the repository.
 * @returns {Promise<Array|null>} An array of change summaries for each file or null if no changes.
 */
async function getStagedChangesDiff(repoPath) {
  const git = simpleGit(repoPath); // Initialize git with a specific repository path

  try {
    // Check if there is at least one commit to compare the staged changes against
    const logSummary = await git.log({ maxCount: 1 });
    if (logSummary.total < 1) {
      console.error("No commits found in the repository.");
      return null;
    }

    // Get diff of staged changes against the last commit
    const summary = await git.diffSummary(["HEAD"]);
    if (summary.files.length === 0) {
      console.error("No staged changes to compare.");
      return null;
    }

    // Map the diff summary to a more structured format
    return summary.files.map((file) => ({
      file: file.file,
      changes: file.changes,
      insertions: file.insertions,
      deletions: file.deletions,
    }));
  } catch (error) {
    console.error("Error getting staged changes diff:", error);
    return null; // Ensure the function returns null in case of error to maintain consistency
  }
}

module.exports = { getStagedChangesDiff };
