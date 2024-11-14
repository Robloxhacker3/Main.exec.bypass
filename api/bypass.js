module.exports = async (req, res) => {
  const { apifrxzn } = req.query;

  if (!apifrxzn) {
    return res.status(400).json({ error: "No link provided" });
  }

  // Step 1: Parse the provided link (this could be any link, e.g., a URL)
  let link = apifrxzn;

  // Step 2: Check if the link matches the required pattern for bypassing
  if (link.includes("spdmteam.com/key-system")) {
    // Step 3: Check if we need to proceed with the bypass
    const step = getStepFromLink(link);

    if (!step) {
      return res.status(400).json({ error: "Unable to detect valid step from the link" });
    }

    // Step 4: Perform the bypass (this is an example redirect, in real scenarios you'd modify this behavior)
    const bypassUrl = `https://spdmteam.com/api/keysystem?step=${step}&advertiser=linkvertise&OS=ios`;

    // Return the bypassed URL
    return res.status(200).json({ bypassedLink: bypassUrl });
  } else {
    return res.status(400).json({ error: "Invalid link or no bypass required" });
  }
};

// Helper function to extract the step number from the URL (as per the Arceus X method)
function getStepFromLink(link) {
  // Check if the link contains "key-system" and extract the step number
  const match = link.match(/key-system-(\d+)\?/);
  if (match) {
    return match[1];  // Return the extracted step number (e.g., "1", "2", "3")
  }
  return null;
}
