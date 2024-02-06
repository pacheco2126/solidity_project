const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('RealEstate', () => { 
    let realEstate, escrow
    let deployer, seller
    let nftID = 1
    
    beforeEach(async () => {
        // Setup accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]

   // Load contracts
   const RealEstate = await ethers.getContractFactory('RealEstate')
   const Escrow = await ethers.getContractFactory('Escrow')

    //Deploy contracts
    realEstate = await RealEstate.deploy()
    escrow = await Escrow.deploy(
     realEstate.getAddress(), 
     nftID,
     seller,
     buyer
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

    it('execute a successful transaction', async () => {
        // Excpects sellter to be nft owner before the sale
        expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
        
        //finalize sale

        transaction = await escrow.connect(buyer).finalizeSale()
            await transaction.wait()
            console.log("buyer finalizes sale")

        // Excpects buyer to be nft owner after the sale
        expect(await realEstate.ownerOf(nftID)).to.equal(buyer.address)

    })
    
    })

 })