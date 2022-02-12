
const ERC20 = artifacts.require("ERC20");
//const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const UniswapV2Factory = artifacts.require("UniswapV2Factory");

contract("UniswapV2Factory", (accounts) => {
    const WETH = "0xB972A47f0ED92357A992937C8957c4499184cbEC";
    
    
    let tokenIn;
    let tokenOut;
    let testUniswap;
    it("create Token", async () => {

         tokenIn = await ERC20.new(1000);
         tokenOut = await ERC20.new(10000);

         testUniswap = await UniswapV2Factory.at("0x1077dC51D53c61B8E93b23B1A25378486d4c32cF");
         let pair = await testUniswap.createPair(tokenIn.address,tokenOut.address );
         let pairAddress = await truffleAssert.eventEmitted(pair, 'PairCreated', (ev) => {
            console.log(ev.pair);
            return ev.pair;
          }, 'Contract should return the correct message.');
         let allPairLength = await testUniswap.allPairsLength();
         for (let i = 0; i< allPairLength; i++)
         {
            let allPairResult = await testUniswap.allPairs(i); 
            console.log(allPairResult);
         }
         let getPairData =  await testUniswap.getPair(tokenIn.address,tokenOut.address);
         console.log(getPairData);
    });   
    
});