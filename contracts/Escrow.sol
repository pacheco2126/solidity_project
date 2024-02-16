// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC721{
    function transferFrom(address _from, address _to, uint256 _id) external;
}
contract Escrow {
    address public nftAddress;
    uint256 public nftID;
    uint256 public purchasePrice;
    uint256 public escrowAmount;
    address payable public seller; //address is address annd solidity of a user 
    address payable public buyer; //payable means that can actually receive ether funds or send
    address public inspector;
    address public lender;

    modifier onlyBuyer() { //make a conditional cleaner and usable in other functions
    require(msg.sender== buyer, "Only buyer can call this function"); //check that the sender is the buyer 
    _; //it just return the function body
    }
       modifier onlyInspector() { //make a conditional cleaner and usable in other functions
    require(msg.sender== inspector, "Only inspector can call this function"); //check that the sender is the buyer 
    _; //it just return the function body
    }

    bool public inspectionPassed = false;
    mapping (address =>  bool) public approval;
    
    //we can add extra logic but for the tutorial its good like this in order to allow receiving ether
    receive() external payable {}

    constructor(
        address _nftAddress,
        uint256 _nftID,
        uint256 _purchasePrice,
        uint256 _escrowAmount,
        address payable _seller,
        address payable _buyer,
        address _inspector,
        address _lender
    ){
        nftAddress = _nftAddress;
        nftID = _nftID;
        purchasePrice = _purchasePrice;
        escrowAmount = _escrowAmount;
        seller = _seller;
        buyer = _buyer;
        inspector = _inspector;
        lender = _lender;
}


//funct that lets call the funct and send in crypto at the same time with payable
function depositEarnest() public payable onlyBuyer {
    require(msg.value >= escrowAmount); //msg global keyword, the value has to be >=
}

function uptdateInspectionStauts(bool _passed) public onlyInspector {
    inspectionPassed = _passed;
}

function approveSale() public { //write the mapping w/ msg sender which is the address is calling the function
    approval[msg.sender] = true;
}

function getBalance() public view returns (uint) {
    return address(this).balance;
}
//cancel the sale handle earnest deposit
//if inspection status is not approved, then refund otherwise send to seller
function cancelSale() public{
    if(inspectionPassed == false) payable(buyer).transfer(address(this).balance);
    else payable(seller).transfer(address(this).balance);
}


    function finalizeSale() public {
        require(inspectionPassed, "Must pass the inspection");
        require(approval[buyer], 'must be approved by buyer');
        require(approval[seller], 'must be approved by seller');
        require(approval[lender], 'must be approved by lender');
        require(address(this).balance >= purchasePrice, 'must have enought ether for sale');
        (bool success, )= payable(seller).call{value: address(this).balance}("");
        require(success); // transfer the funds to the buyer

        //transfer owneership of property
        IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }
}