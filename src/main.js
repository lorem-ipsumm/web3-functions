require("dotenv").config();
const utils = require("./utils");
const ethers = require("ethers");

async function main() { 

  const addresses = {
    "USDC": "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
    "WETH": "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    "UNISWAP_ROUTER": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
  }

  // get network, provider, and wallet
  const provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_RPC);
  const wallet = new ethers.Wallet(process.env.PROD_PRIVATE_KEY, provider);

  // get the uniswap router
  const router = utils.getRouter(addresses.UNISWAP_ROUTER, wallet);

  // token data
  const tokenAddress = addresses.USDC;
  const token = utils.getToken(tokenAddress, wallet);
  // const decimals = await token.decimals();

  const amountIn = ethers.utils.parseEther('0.005');

  const swapETHForTokens = async () => {
    // make ETH -> TOKEN swap
    let tx = await router.swapExactETHForTokens(
      0,
      [addresses.WETH, tokenAddress],
      wallet.address,
      Math.floor(Date.now() / 1000) + 60 * 20,
      {value: amountIn, gasPrice: 10 * 1e9}
    );

    // wait for tx to finish
    await tx.wait();
  }

  const swapTokensForETH = async () => {
    // get wallet token balance
    const balance = await token.balanceOf(wallet.address);

    // approve the router to spend tokens 
    tx = await token.approve(router.address, balance);
    await tx.wait();

    // make TOKEN -> ETH swap
    await router.swapExactTokensForETH(
      balance,
      0,
      [tokenAddress, addresses.WETH],
      wallet.address,
      Math.floor(Date.now() / 1000) + 60 * 20,
      {gasPrice: 10 * 1e9}
    );
  }

  swapETHForTokens();

}

main();