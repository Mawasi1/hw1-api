const EvacPlan = require("../models/evacPlanModel");

const { getPostData, } = require("../utils");
const { logger } = require("../logger");

// @desc Gets all evacutaion plans.
// @route GET /api/evac
async function getEvacPlans(req, res) {
  try {
    const evacPlans = await EvacPlan.findAll();
    logger.info(evacPlans);
    res.writeHead(200, { "Contet-Type": "application/json" });
    res.end(JSON.stringify(evacPlans));
  } catch (error) {
    logger.error(error);
  }
}

// @desc Gets a single evacutaion plan.
// @route GET /api/evac/:id
async function getEvacPlan(req, res, id) {
  try {
    const evacPlan = await EvacPlan.findById(id);
    if (!evacPlan) {
      logger.info("Evacuation plan not found");
      res.writeHead(404, { "Contet-Type": "application/json" });
      res.end(JSON.stringify({ message: "Evacuation plan not found" }));
    } else {
      logger.info(evacPlan);
      res.writeHead(200, { "Contet-Type": "application/json" });
      res.end(JSON.stringify(evacPlan));
    }
  } catch (error) {
    logger.error(error);
    
  }
}

// @desc Create an evacutaion plan.
// @route POST /api/evac
async function createEvacPlan(req, res) {
  try {
    const body = await getPostData(req);

    const { name, location, description } = JSON.parse(body);

    const evacPlan = {
      name,
      location,
      description,
    };

    const newEvacPlan = await EvacPlan.create(evacPlan);
    logger.info(newEvacPlan);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newEvacPlan));
  } catch (error) {
    logger.error(error);
    
  }
}

// @desc Update an evacutaion plan.
// @route PUT /api/evac
async function updateEvacPlan(req, res, id) {
  try {
    const existingEvacPlan = await EvacPlan.findById(id);

    if (!existingEvacPlan) {
      logger.info("Evacutaion plan not found");
      res.writeHead(404, { "Contet-Type": "application/json" });
      res.end(JSON.stringify({ message: "Evacuation plan not found" }));
    } else {
      const body = await getPostData(req);

      const { name, location, description } = JSON.parse(body);

      const evacPlanData = {
        name: name || existingEvacPlan.name,
        location: location || existingEvacPlan.location, 
        description: description || existingEvacPlan.description
      };

      const updatedEvacPlan = await EvacPlan.update(id,evacPlanData);
      logger.info(updateEvacPlan);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedEvacPlan));
    }
  } catch (error) {
    logger.error(error);
    
  }
}

// @desc Deletes a single evacutaion plan.
// @route DELETE /api/evac/:id
async function deleteEvacPlan(req, res, id) {
  try {
    const evacPlan = await EvacPlan.findById(id);
    if (!evacPlan) {
      logger.info("Evacutaion plan not found");
      res.writeHead(404, { "Contet-Type": "application/json" });
      res.end(JSON.stringify({ message: "Evacuation plan not found" }));
    } else {
      await EvacPlan.remove(id);
      logger.info(`Evacuation plan ${id} removed`);
      res.writeHead(200, { "Contet-Type": "application/json" });
      res.end(JSON.stringify({message: `Evacuation plan ${id} removed`}));
    }
  } catch (error) {
    logger.error(error);
    
  }
}

module.exports = {
  getEvacPlans,
  getEvacPlan,
  createEvacPlan,
  updateEvacPlan,
  deleteEvacPlan
};
