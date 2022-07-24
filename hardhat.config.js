require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOERLI_API_KEY = process.env.GOERLI_API_KEY;
// Latest contract deployed into Goerli network (refer Address) : 0x938723DcE2178403ee25b286480509E690Ae52a8
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
  },
  etherscan: {
    apiKey: {
      goerli: GOERLI_API_KEY
    }
  }
};
