let evacPlans = require("../data/evac_plan.json");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(evacPlans);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const evacPlan = evacPlans.find((evac) => evac.id === id);
    resolve(evacPlan);
  });
}
function create(evacPlan) {
  return new Promise((resolve, reject) => {
    const newEvacPlan = { id: uuidv4(), ...evacPlan };
    evacPlans.push(newEvacPlan);
    writeDataToFile("./data/evac_plan.json", evacPlans);
    resolve(newEvacPlan);
  });
}

function update(id, evacPlan) {
  return new Promise((resolve, reject) => {
    const index = evacPlans.findIndex((evac) => evac.id === id);
    evacPlans[index] = { id, ...evacPlan };

    writeDataToFile("./data/evac_plan.json", evacPlans);
    resolve(evacPlans[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
   evacPlans = evacPlans.filter((evac)=> evac.id !== id);

    writeDataToFile("./data/evac_plan.json", evacPlans);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
