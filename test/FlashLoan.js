const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => ethers.parseUnits(n.toString(), 'ether')
  

  const ether = tokens

  describe('FlashLoan', () => {
beforeEach(async () => {

    //setup accounts 
    accounts = await ethers.getSigners()
    deployer = accounts[0]

    //Load accounts
    const FlashLoan = await ethers.getContractFactory('FlashLoan')
    const FlashLoanReceiver = await ethers.getContractFactory('FlashLoanReceiver')
    const Token = await ethers.getContractFactory('Token')
//deploye token
    token= await Token.deploy('Dapp, URV', 'DAPP', '100000')

    //deploy flash loan pool.
    flashLoan = await FlashLoan.deploy(token.address)

})
describe('Deployment', () => {
    it('Works', () => {
        expect(1+1).to.equal(2)
    })
})

})