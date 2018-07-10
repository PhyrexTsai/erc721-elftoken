import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const ElfToken = artifacts.require("ElfToken");

contract("Elf token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await ElfToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  it("Should get contract name", async () => {
    let instance = await ElfToken.deployed();
    let name = await instance.name();
    assert.equal(name, "ElfToken");
  });

  it("Should get contract symbol", async () => {
    let instance = await ElfToken.deployed();
    let symbol = await instance.symbol();
    assert.equal(symbol, "ELF");
  });

  it("Should get contract owner", async () => {
    let instance = await ElfToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("Should mint elf", () => {
    it("Creates elf with specified URI", async () => {
      let instance = await ElfToken.deployed();

      let token = await instance.mint(accounts[1], '{name: "Portal Network", description: "A gateway to the decentralized world"}');
      let tokenURI = await instance.tokenURI(0);
      assert.deepEqual(tokenURI, '{name: "Portal Network", description: "A gateway to the decentralized world"}');
    });

    it("Set elf token uri", async () => {
      let instance = await ElfToken.deployed();
      await assertRevert(instance.setTokenURI(0, '{name: "0", description: "Do not work!"}', {from: accounts[2]}));
      await instance.setTokenURI(0, '{name: "0", description: "Do not work!"}', {from: accounts[1]});

      let tokenURI = await instance.tokenURI(0);
      assert.equal(tokenURI, '{name: "0", description: "Do not work!"}');
    });

    it("Get token owner", async () => {
      let instance = await ElfToken.deployed();
      let owner = await instance.ownerOf(0);
      
      assert.equal(owner, accounts[1]);
    });

    it("Should transfer ownership", async () => {
      let instance = await ElfToken.deployed();
      let other = accounts[1];

      let owner = await instance.owner();
      assert.equal(owner, accounts[0]);
      await instance.transferOwnership(other);
      let newOwner = await instance.owner();
      assert.equal(newOwner, accounts[1]);
    });
  });
});
