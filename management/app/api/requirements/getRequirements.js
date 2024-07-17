import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    const requirementPath = path.join(process.cwd(), "lib", "requirement.json");

    // read the requirement.json file
    fs.readFile(requirementPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Failed to read" });
        return;
      }
      // parse the json file
      const requirement = JSON.parse(data);
      res.status(200).json(requirement);
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
