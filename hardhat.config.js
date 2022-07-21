require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.4"
  },
  networks:{
    hardhat:{
      chainId: 1337
    },
    goerli: {
      url: GOERLI_URL,
      accounts:[PRIVATE_KEY]
    }
  }
};
