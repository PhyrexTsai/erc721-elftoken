const ElfToken = artifacts.require("ElfToken");
const util = require("util");
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);

module.exports = async function(deployer) {
  const elfToken = await deployer.deploy(ElfToken);
  // const addresses = {
  //   tokenAddress: elfToken.address
  // };

  // await writeFile(
  //   path.join(__dirname, "..", "front", "src", "addresses.json"),
  //   JSON.stringify(addresses)
  // );
};
