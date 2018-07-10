pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract ElfToken is ERC721Token, Ownable {

  mapping(uint256 => string) internal tokenURIs;

  mapping (uint256 => address) internal tokenOwner;

  struct Elf {
    string nickname;
    string description;
  }

  Elf[] public elfs;

  modifier onlyOwnerOf(uint256 _tokenId) {
    require(ownerOf(_tokenId) == msg.sender || owner == msg.sender);
    _;
  }

  function getElf( uint _elfId ) public view returns(string nickname, string description) {
    Elf memory _elf = elfs[_elfId];

    nickname = _elf.nickname;
    description = _elf.description;
  }

  function mint(string _nickname, string _description) public onlyOwner {
    Elf memory _elf = Elf({ nickname: _nickname, description: _description });
    uint256 _elfId = elfs.push(_elf) - 1;
    tokenOwner[_elfId] = msg.sender;

    _mint(msg.sender, _elfId);
    setTokenURI(_elfId, "AWESOME ELF");
  }

  function name() public view returns (string) {
    return "ElfToken";
  }

  function symbol() public view returns (string) {
    return "ELF";
  }

  function tokenURI(uint256 _tokenId) public view returns (string) {
    require(exists(_tokenId));
    return tokenURIs[_tokenId];
  }

  function exists(uint256 _tokenId) public view returns (bool) {
    address owner = tokenOwner[_tokenId];
    return owner != address(0);
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    address owner = tokenOwner[_tokenId];
    require(owner != address(0));
    return owner;
  }

  function setTokenURI(uint256 _tokenId, string _uri) public onlyOwnerOf(_tokenId) {
    require(exists(_tokenId));
    tokenURIs[_tokenId] = _uri;
  }

}
