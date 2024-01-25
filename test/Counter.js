const {expect} = require('chai');
const {ethers} = require('hardhat'); 

    //JS is perfecrt because Blockchain is slow and JS accept async funct

describe('Counter', () => {

    let counter
beforeEach(async () => {

    const Counter = await ethers.getContractFactory('Counter') //ethers contract
    counter = await Counter.deploy('My Counter', 1) // deployed smart contract
})

describe('Deployment', ()=> {
 
    it('sets the inital count', async ()=> {

        expect(await counter.count()).to.equal (1)//the actual counter
        //fetch the count
        //check the count to make sure it's what we expect
    })

    it('sets the initial name', async ()=> {
       
        expect(await counter.name()).to.equal ('My Counter')//the actual name

    })   
})

describe('Counting', () => { 
    let transaction

    it('reads the count from the "count" public variable', async () => {
        expect(await counter.count()).to.equal(1)
    })
    it('reads the count from the "getCount()" function', async () => {
        expect(await counter.getCount()).to.equal(1)

    })


    it('increments the count', async ()=> {
        transaction = await counter.increment()
        await transaction.wait()
        expect(await counter.count()).to.equal(2)
    
        transaction = await counter.increment()
        await transaction.wait()
        expect(await counter.count()).to.equal(3)
    })
    it('decrements the count', async ()=> {
        transaction = await counter.decrement()
        await transaction.wait()
        expect(await counter.count()).to.equal(0)

        //cannot decrenent count below 0

        await expect(counter.decrement()).to.be.reverted
    })

    it('reads the count from the "name" public variable', async () => {
        expect(await counter.name()).to.equal('My Counter')
    })
    it('reads the count from the "getName()" function', async () => {
        expect(await counter.getName()).to.equal('My Counter')

    })
    
    it('updates the name', async () => {
        transaction = await counter.setName('New Name')
        await transaction.wait()
        expect(await counter.getName()).to.equal('New Name')

    })
    
 })

})