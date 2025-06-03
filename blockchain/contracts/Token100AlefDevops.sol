// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Token100AlefDevops is Initializable, ERC20Upgradeable, OwnableUpgradeable {
    uint256 public constant MAX_SUPPLY = 100 * 10 ** 18;
    uint256 public constant COOLDOWN_TIME = 24 hours;

    mapping(address => uint256) public lastMintTime;

    function initialize() public initializer {
        __ERC20_init("Token100 AlefDevops", "TAD100");
        __Ownable_init(msg.sender);

        // Mint 50 tokens para o owner
        _mint(msg.sender, 50 * 10 ** decimals());
    }

    // Mint público: 1 token por wallet a cada 24h
    function publicMint() public {
        require(block.timestamp - lastMintTime[msg.sender] >= COOLDOWN_TIME, "Wait 24h before minting again");
        require(totalSupply() + 1 * 10 ** decimals() <= MAX_SUPPLY, "Max supply exceeded");

        lastMintTime[msg.sender] = block.timestamp;
        _mint(msg.sender, 1 * 10 ** decimals());
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}