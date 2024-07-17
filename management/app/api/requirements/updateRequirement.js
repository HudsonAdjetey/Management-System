import fs from "fs";
import path from "path";

// Set up handler
export default function handler(req, res) {
  if (req.method === "POST") {
    const { feature, enabled } = req.body;

    // path of the requirement
    const requirementPath = path.join(process.cwd(), "lib", "requirement.json");

    // read the requirement
    fs.readFile(requirementPath, "utf8", (er, data) => {
      if (er) {
        res.status(500).json({ error: "Error reading requirement file." });
        return;
      }

      // parse the requirement
      const requirement = JSON.parse(data);

      // update the requirement
      if (requirement[feature] !== undefined) {
        requirement[feature].enabled = enabled;
        fs.writeFile(
          requirementPath,
          JSON.stringify(requirement, null, 2),
          (er) => {
            if (er) {
              res
                .status(500)
                .json({ error: "Error writing requirement file." });
              return;
            }
            res
              .status(200)
              .json({ message: "Requirement updated successfully." });
          }
        );
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
