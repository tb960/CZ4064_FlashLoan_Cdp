// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0;

import "../interfaces/IWeth.sol";
import "../interfaces/IAdvancedWeth.sol";

// See interface for documentation.
contract GetWeth is IAdvancedWETH {
    address payable public override immutable weth;

    constructor(address payable weth_) public {
        weth = weth_;
    }

    function deposit() external payable{
        IWeth(weth).deposit{value: msg.value}();
    }

    // See interface for documentation.
    function depositAndTransferFromThenCall(uint amount, address to, bytes calldata data) external override payable {
        if (msg.value > 0) {
            IWeth(weth).deposit{value: msg.value}();
        }
        if (amount > 0) {
            IWeth(weth).transferFrom(msg.sender, address(this), amount);
        }
        uint total = msg.value + amount;
        require(total >= msg.value, 'OVERFLOW'); // nobody should be this rich.
        require(total > 0, 'ZERO_INPUTS');
        IWeth(weth).approve(to, total);
        (bool success,) = to.call(data);
        require(success, 'TO_CALL_FAILED');
        // unwrap and refund any unspent WETH.
        withdrawTo(msg.sender);
    }

    // Only the WETH contract may send ETH via a call to withdraw.
    receive() payable external { require(msg.sender == weth, 'WETH_ONLY'); }

    // See interface for documentation.
    function withdrawTo(address payable to) public override {
        uint wethBalance = IWeth(weth).balanceOf(address(this));
        if (wethBalance > 0) {
            IWeth(weth).withdraw(wethBalance);
            (bool success,) = to.call{value: wethBalance}('');
            require(success, 'WITHDRAW_TO_CALL_FAILED');
        }
    }
}


