// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IERC721{
    function transferFrom(address _from, address _to, uint256 _id) external;
}
contract Escrow {
    address public nftAddress;
    uint256 public nftID;
    address payable public seller; //address is address annd solidity of a user 
    address payable public buyer; //payable means that can actually receive ether funds or send

    constructor(
        address _nftAddress,
        uint256 _nftID,
        address payable _seller,
        address payable _buyer
    ){
        nftAddress = _nftAddress;
        nftID = _nftID;
        seller = _seller;
        buyer = _buyer;
}

    function finalizeSale() public {
        //transfer owneership of property
        IERC721(nftAddress).transferFrom(seller, buyer, nftID);
    }
}