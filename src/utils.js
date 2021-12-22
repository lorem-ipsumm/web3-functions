const ethers = require("ethers");

// setup and return an ERC20 token based on address
function getToken (address, wallet) {
  // setup the sushiswap contract
  return new ethers.Contract(
    address,
    [
        "function symbol() public view returns (string memory)",
        "function name() public view returns (string memory)",
        "function decimals() public view returns (uint8)",
        "function allowance(address owner, address spender) public view returns (uint256)",
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function transfer(address recipient, uint256 amount) public returns (bool)",
        "function balanceOf(address account) public view returns (uint256)"
    ],
    wallet
  );
}

// setup and return a router based on address
function getRouter (address, wallet) {
  // setup the contract
  return new ethers.Contract(
    address,
    [
      "function WETH() external pure returns (address)",
      "function swapExactETHForTokens(uint amountoutmin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
      "function getAmountsOut(uint amountin, address[] memory path) public view returns (uint[] memory amounts)",
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)",
      "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
    ],
    wallet
  );
}

// setup and return a uniV2-style pair based on address
function getPair (address, wallet) {
  // setup the sushiswap contract
  return new ethers.Contract(
    address,
    [
        "function name() external pure returns (string memory)",
        "function symbol() external pure returns (string memory)",
        "function token0() external view returns (address)",
        "function token1() external view returns (address)",
        "function factory() external view returns (address)",
        "function totalSupply() external view returns (uint)",
        "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
        "event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)",
        "event Transfer(address indexed from, address indexed to, uint value)",
        "event Sync(uint112 reserve0, uint112 reserve1)"
    ],
    wallet
  );
}

module.exports = {
  getPair,
  getRouter,
  getToken
}