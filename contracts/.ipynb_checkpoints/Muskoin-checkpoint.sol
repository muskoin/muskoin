// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/cryptography/ECDSA.sol";

// Inherit from IERC721Enumerable so that all awarded tokens can be 
// displayed in the dApp later. 
contract Muskoin is IERC721Enumerable, ERC721, AccessControl {
    
    // import counter data structure
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Create a role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Create a role identifier for the minter admin role
    bytes32 public constant MINTER_ADMIN_ROLE = keccak256("MINTER_ADMIN_ROLE");

    // Optional mapping from token URIs to index
    mapping (string => uint256) private _URIsToIndex;
    
    // Muskoin contructor sets the name and ticker
    constructor(address minter) ERC721("Muskoin", "EMC2") {
        
        // Grant the minter role to the deploying account
        _setupRole(MINTER_ROLE, minter);
        
        // Grant the minter admin role to the deploying account
        _setupRole(MINTER_ADMIN_ROLE, minter);
        
        // Grant the minter role to the deploying account
        _setRoleAdmin(MINTER_ROLE, MINTER_ADMIN_ROLE);
    }

    /**
     * @dev Returns whether `tokenURI` exists.
     */
    function _uriExists(string memory tokenURI) internal view virtual returns (bool) {
        return !(_URIsToIndex[tokenURI] == 0);
    }
    
    /**
     * @dev Adds to iterable mapping of tokenURI -> tokenId
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURIList(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _URIsToIndex[_tokenURI] = tokenId; 
    }
    
    // Explicit minting by a member of MINTER_ROLE
    function memeAward(address muskovite, string memory memeURI)
        public
        returns (uint256)
    {
        // prevent double minting for same meme
        require(!_uriExists(memeURI), "I've seen that one already!");
        
        // transaction caller must be MINTER_ROLE
        require(hasRole(MINTER_ROLE, msg.sender), "You have no power here!");
        
        // increment the token counter used for the tokenIds
        _tokenIds.increment();

        // get the current tokenId
        uint256 newItemId = _tokenIds.current();
        
        // mint the new award and set the URL where the meme is hosted
        _mint(muskovite, newItemId);
        _setTokenURI(newItemId, memeURI);
        _setTokenURIList(newItemId, memeURI);

        return newItemId;
    }
    
    // implicit ('lazy') minting by the recipient of an NFT in posession of a valid signature
    function lazyMemeAward(address muskovite, string memory memeURI, bytes memory signature)
        public
        returns (uint256)
    {
        // the memeURI is the nonce
        require(!_uriExists(memeURI), "I've seen that one already!");
        
        // transaction caller must be recipient
        require(msg.sender == muskovite, "This isn't yours!");
        
        // require a valid signature from a member of MINTER_ROLE
        require(isValidSignature(muskovite, memeURI, signature), "You have no power here!");
        
        // increment the token counter used for the tokenIds
        _tokenIds.increment();

        // get the current tokenId
        uint256 newItemId = _tokenIds.current();
        
        // mint the new award and set the URL where the meme is hosted
        _mint(muskovite, newItemId);
        _setTokenURI(newItemId, memeURI);
        _setTokenURIList(newItemId, memeURI);

        return newItemId;
    }
    
    // helper function that returns a boolean 
    function isValidSignature(address muskovite, string memory memeURI, bytes memory signature)
        internal
        view
        returns (bool)
    {
        // convert the payload to a 32 byte hash
        bytes32 hash = ECDSA.toEthSignedMessageHash(keccak256(abi.encodePacked(muskovite, memeURI)));
        
        // check that the signature is from MINTER_ROLE
        return hasRole(MINTER_ROLE, ECDSA.recover(hash, signature));
    }
}