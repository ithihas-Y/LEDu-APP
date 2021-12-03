import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Address.sol';

pragma solidity ^0.8.0;

contract tokenBridge is Ownable,ReentrancyGuard {

    using Address for address;

    event Deposited(address user,uint256 amount);

    event Withdraw(address _user,uint256 _amount);

    ERC20PresetMinterPauser public Token;

    mapping(address => uint256) public deposits;

    address public validator;

    constructor(ERC20PresetMinterPauser _token,address _validator) {
        Token = _token;
        validator = _validator;
    }

    function deposit(uint256 amt) public nonReentrant {
        require(msg.sender == tx.origin,'Caller is not same as sender');
        Token.burnFrom(msg.sender,amt);
        deposits[msg.sender] += amt;
        emit Deposited(msg.sender,amt);
    }

    function changeValidator(address newValidator) public onlyOwner(){
        validator = newValidator;
    }

    function updateDeposit(address user,uint256 _amt) public {
        require(msg.sender == validator);
        deposits[user] += _amt;
    }

    function withdraw(address user,uint256 amt) public nonReentrant {
        require(msg.sender == tx.origin);
        require(deposits[msg.sender] >= amt);
        Token.mint(user,amt);
        deposits[user] -= amt;
        emit Withdraw(user,amt);
    }
}