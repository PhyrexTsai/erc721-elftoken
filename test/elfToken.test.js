import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

const ElfToken = artifacts.require("ElfToken");

contract("Elf token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await ElfToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  describe("mint elf", () => {
    it("creates elf with specified nickname and description", async () => {
      let instance = await ElfToken.deployed();
      let owner = await instance.owner();

      let token = await instance.mint("Portal", "Network");
      let tokens = await instance.tokensOf(owner);
      let elfs = await instance.getElf(tokens[0]);
      assert.deepEqual(elfs, ["Portal", "Network"]);
    });

    it("get elf token uri", async () => {
      let instance = await ElfToken.deployed();
      let tokens = await instance.tokensOf(accounts[0]);
      let elfURI = await instance.tokenURI(tokens[0]);
      assert.equal(elfURI, "AWESOME ELF");
    });

    it("set elf token uri", async () => {
      let instance = await ElfToken.deployed();
      let tokens = await instance.tokensOf(accounts[0]);
      await assertRevert(instance.setTokenURI(tokens[0], "HERO", {from: accounts[1]}));
      await instance.setTokenURI(tokens[0], "HERO");

      let elfURI = await instance.tokenURI(tokens[0]);
      assert.equal(elfURI, "HERO");
    });

    it("allows to mint only to owner", async () => {
      let instance = await ElfToken.deployed();
      let other = accounts[1];

      let owner = await instance.owner();
      assert.equal(owner, accounts[0]);
      await instance.transferOwnership(other);
      let newOwner = await instance.owner();
      assert.equal(newOwner, accounts[1]);
      await assertRevert(instance.mint("Portal", "Network"));
    });
  });
});
