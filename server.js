const http = require("http");

const {
  getEvacPlans,
  getEvacPlan,
  createEvacPlan,
  updateEvacPlan,
  deleteEvacPlan
} = require("./controllers/evacPlanController");
const { logger } = require("./logger.js");

const server = http.createServer((req, res) => {
  if (req.url === "/api/evac" && req.method === "GET") {
    getEvacPlans(req, res);
  } else if (req.url.match(/\/api\/evac\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\d+)/
  ) && req.method === "GET") {
    const id = req.url.split("/")[3];

    getEvacPlan(req, res, id);
  } else if (req.url === "/api/evac" && req.method === "POST") {
    createEvacPlan(req, res);
  } else if (req.url.match(/\/api\/evac\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\d+)/
  ) && req.method === "PUT") {
    const id = req.url.split("/")[3];

    updateEvacPlan(req, res, id);
  } else if (req.url.match(/\/api\/evac\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\d+)/
  ) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteEvacPlan(req, res, id);
  } else {
    res.writeHead(404, { "Contet-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
    logger.error("Route not found");

  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
