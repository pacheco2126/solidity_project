pragma solidity ^0.8.0; // SPDX-License-Identifier: UNLICENSED

contract Counter {
 //Contract code goes here

    uint public count = 1; // can be store directly to the Blockchain
    string public name = "My Name";
    // store any numerical value
    // increase the count 
    // decrease the count
    // store a name / set a name

    // CRUD

    constructor (string memory _name, uint _initialCount){
        name= _name;
        count = _initialCount;
    }

    function increment() public returns (uint newCount) {
        count ++; 
     return count;
    }
    function decrement() public returns (uint newCount) { //right to the blockchain, you pay the gas
        count --; 
     return count;
    }
    function getCount() public view returns (uint) { //view is a read function

        return count;
    }

    function getName() public view returns (string memory currentName){// read function not pay gas
        return name;
   } 

    function setName(string memory _newName) public returns (string memory newName){// read function not pay gas
        name = _newName;
        return name;
   } 

}