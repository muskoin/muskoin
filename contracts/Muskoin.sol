// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Inherit from IERC721Enumerable so that all awarded tokens can be 
// displayed in the dApp later. 
contract Muskoin is IERC721Enumerable, ERC721, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
        
    bytes32 public constant MINTER_ADMIN_ROLE = keccak256("MINTER_ADMIN_ROLE");

    constructor(address minter) ERC721("Muskoin", "EMC2") {
        // Grant the minter role to the deploying account
        _setupRole(MINTER_ROLE, minter);
        // Grant the minter admin role to the deploying account
        _setupRole(MINTER_ADMIN_ROLE, minter);
        _setRoleAdmin(MINTER_ROLE, MINTER_ADMIN_ROLE);
    }

    function memeAward(address muskovite, string memory memeURI)
        public
        returns (uint256)
    {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a worthy issuer of immortality.");
        // increment the token counter used for the tokenIds
        _tokenIds.increment();

        // get the current tokenId
        uint256 newItemId = _tokenIds.current();
        
        // mint the new award and set the URL where the meme is hosted
        _mint(muskovite, newItemId);
        _setTokenURI(newItemId, memeURI);

        return newItemId;
    }
}