const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => ethers.parseUnits(n.toString(), 'ether')
  

  const ether = tokens
  
describe('RealEstate', () => { 
    let realEstate, escrow
    let deployer, seller
    let nftID = 1
    let purchasePrice = ether(100)
    let escrowAmount = ether(20)
    beforeEach(async () => {
        // Setup accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]
        inspector = accounts[2]
        lender = accounts[3]

   // Load contracts
   const RealEstate = await ethers.getContractFactory('RealEstate')
   const Escrow = await ethers.getContractFactory('Escrow')

    //Deploy contracts
    realEstate = await RealEstate.deploy()
    escrow = await Escrow.deploy(
     realEstate.getAddress(), 
     nftID,
     purchasePrice,
     escrowAmount,
     seller,
     buyer,
     inspector.address,
     lender.address
    )

    //seller approves NFT

    transaction = await realEstate.connect(seller).approve(escrow.getAddress(), nftID)
    await transaction.wait()
}) 


describe('Deployment', async () => { 
    
    it('sends an NFT to the seller / deployer', async () => {
        expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
    }) 
}) 

describe('Selling real Estate', async () => { 
let transaction, balance
    it('execute a successful transaction', async () => {
        // Excpects sellter to be nft owner before the sale
        expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
      
        //check escrow balance before transaction
        balance = await escrow.getBalance()
        console.log("escrow balance:", ethers.formatEther(balance))



        //buyer deposit earnest
        transaction = await escrow.connect(buyer).depositEarnest({ value: ether(20) })
        console.log("Buyer deposits earnest money")

        //check escrow balance
        balance = await escrow.getBalance()
        console.log("escrow balance:", ethers.formatEther(balance))

        //inspector updates status

        transaction = await escrow.connect(inspector).uptdateInspectionStauts(true)
        await transaction.wait()
        console.log("inspector updates status")

        //buyer approves the sale
        transaction = await escrow.connect(buyer).approveSale()
        await transaction.wait()
        console.log('buyer approves sale')

         //seller approves the sale
        transaction = await escrow.connect(seller).approveSale()
        await transaction.wait()
        console.log('seller approves sale')
       
         //lender funds sale. 
        transaction = await lender.sendTransaction({
            to: escrow.getAddress(), 
            value: ether(80)
        })

        //lender approves the sale
        transaction = await escrow.connect(lender).approveSale()
        await transaction.wait()
        console.log('lender approves sale')

        //finalize sale

        transaction = await escrow.connect(buyer).finalizeSale()
            await transaction.wait()
            console.log("buyer finalizes sale")

        // Excpects buyer to be nft owner after the sale
        expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address)

    })
    
    })

 })