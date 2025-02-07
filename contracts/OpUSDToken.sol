// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^0.8.22
pragma solidity ^0.8.22;

import {BasicToken} from "./Basic/BasicToken.sol";

contract OPUSDToken is BasicToken {
    uint256 public maxSupply;

    event MaxSupplyUpdated(uint256 oldMaxSupply, uint256 newMaxSupply);

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _maxSupply,
        address defaultAdmin,
        address pauser,
        address minter
    ) BasicToken(tokenName, tokenSymbol, defaultAdmin, pauser, minter) {
        require(_maxSupply > 0, "Max supply must be greater than 0");
        maxSupply = _maxSupply;
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    function mint(address to, uint256 amount) public override onlyRole(MINTER_ROLE) {
        require(totalSupply() + amount <= maxSupply, "Minting exceeds max supply");
        super.mint(to, amount);
    }

    function updateMaxSupply(uint256 newMaxSupply) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newMaxSupply >= totalSupply(), "New max supply must be greater than or equal to current total supply");
        uint256 oldMaxSupply = maxSupply;
        maxSupply = newMaxSupply;
        emit MaxSupplyUpdated(oldMaxSupply, newMaxSupply);
    }
}
