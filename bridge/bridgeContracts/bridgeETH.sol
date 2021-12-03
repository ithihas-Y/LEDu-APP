import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Address.sol';

pragma solidity ^0.8.0;

contract tokenBridge is Ownable,ReentrancyGuard {

    using Address for address;

    event Deposited(address user,uint256 amount);

    event Withdraw(address _user,uint256 _amount);

    IERC20 public Token;

    mapping(address => uint256) public deposits;

    address public validator;

    constructor(IERC20 _token,address _validator) {
        validator = _validator;
        Token = _token;
    }

    function deposit(uint256 amt) public nonReentrant {
        require(msg.sender == tx.origin,'Caller is not same as sender');
        require(Token.transferFrom(msg.sender,address(this),amt));
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
        require(Token.transferFrom(address(this),user,amt));
        deposits[user] -= amt;
        emit Withdraw(user,amt);
    }
}