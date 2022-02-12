const Factory = artifacts.require("UniswapV2Factory");
module.exports = function (deployer, network, addresses) {
    deployer.deploy(Factory, addresses[0]);
   
}
