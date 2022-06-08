// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract vestor is Initializable,OwnableUpgradeable, UUPSUpgradeable{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    event HTLCERC20New(
        uint256 indexed contractId,
        address indexed _tokencontractaddress,
        address[] indexed _investors,
        uint256[] amountperinvestors,
        uint256 _vestingPeriod
    );
    event HTLCERC20Withdraw(address indexed investoraddress,uint256 indexed contractId);
    
    struct vest {
     address _tokencontractaddress;
     address[] investors;
     address tokenvestor;
     uint256 _vestid;
     uint256[] _amountperinvestors;
     uint256 _TotalAmount;
     uint256 _vestingPeriod;
     uint256 _startPeriod;
     uint256 cliffperiod;
    }

    modifier tokenstransferFromable(address _token, address _owner,uint256 _amount) {
        // ensure this contract is approved to transferFrom the designated token
        // so that it is able to honor the claim request later
        require(
            IERC20(_token).allowance(_owner,address(this)) ==_amount,
            "The HTLC must have been designated an approved spender for the tokenId"
        );
        _; 
    }

    uint256 contractfees;
    CountersUpgradeable.Counter private contractid;

    mapping (uint256 => vest) vestcontracts;
    mapping(address =>mapping(uint256 =>uint256))public amountofinvestorsbyindex;

    mapping(address =>mapping(uint256 => uint256))public userclaimingstart;
    mapping(address =>mapping(uint256 => uint256))public timesclaimablebyinvestors;

    mapping(address => uint256[]) public idsbyaddress;
    mapping(address => uint256[])public idcountbyinvestor;

        function initialize() initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    function vestTokens(
     address tokencontractaddress,
     address[]calldata investors,
     uint256 vestingPeriod,
     uint256[]calldata amountperinvestors,
     uint256 startperiod,
     uint256 cliffperiod
    )
    external
    payable
    tokenstransferFromable(tokencontractaddress, msg.sender,addforinvestors(amountperinvestors,vestingPeriod,cliffperiod))
    {

        require(msg.value >= contractfees);

        uint256 totalamount = addforinvestors(amountperinvestors,vestingPeriod,cliffperiod);

             for (uint i = 0; i < investors.length; i++) {

         userclaimingstart[investors[i]][contractid.current()] = block.timestamp;
         timesclaimablebyinvestors[investors[i]][contractid.current()] = amountperinvestors[i];

         idcountbyinvestor[investors[i]].push(contractid.current());
         amountofinvestorsbyindex[investors[i]][contractid.current()] = amountperinvestors[i]*vestingPeriod/cliffperiod;
        }


        idsbyaddress[msg.sender].push(contractid.current());



     vestcontracts[contractid.current()] = vest(
         tokencontractaddress,
         investors,
         msg.sender,
         contractid.current(),
         amountperinvestors,
         totalamount,
         vestingPeriod,
         startperiod,
         cliffperiod     
     );



        IERC20(tokencontractaddress).transferFrom(msg.sender,address(this),totalamount);


        emit HTLCERC20New(
         contractid.current(),
         tokencontractaddress,
         investors,
         amountperinvestors,
         vestingPeriod
        );
        contractid.increment();
     
    }

    function claimtokens(uint256 _contractid)public {
        vest storage c = vestcontracts[_contractid];

   require(isWhitelisted(msg.sender,_contractid)!=false,"you are not elgible for the claim");
   require(block.timestamp >= c._startPeriod , "vesting has not yet began");

   require(amountofinvestorsbyindex[msg.sender][_contractid] > 0," all of your tokens have been claimed");
   require(block.timestamp - userclaimingstart[msg.sender][_contractid] >= c.cliffperiod,"wait for your cliff period to be completed");

   

   uint256 deduct = amountofinvestorsbyindex[msg.sender][_contractid] - timesclaimablebyinvestors[msg.sender][_contractid] ;

   amountofinvestorsbyindex[msg.sender][_contractid] = deduct; 
   userclaimingstart[msg.sender][_contractid] = block.timestamp;
   IERC20(c._tokencontractaddress).transfer(msg.sender,timesclaimablebyinvestors[msg.sender][_contractid]);
   
   emit HTLCERC20Withdraw(msg.sender,_contractid);

    }

    function getContract(uint256 _contractId)
        public
        view
        returns (
     address _tokencontractaddress,
     address tokenvestor,
     uint256 _TotalAmount,
     uint256 _vestingPeriod
          
        )
    {
        if (haveContract(_contractId) == false)
             revert("contractid doesnt exist");
        vest storage c = vestcontracts[_contractId];
        return (
            c._tokencontractaddress,
            c.tokenvestor,
            c._TotalAmount,
            c._vestingPeriod
        );
    }


    function isWhitelisted(address _user,uint256 _Contractid) public view returns (bool) {
        vest storage c = vestcontracts[_Contractid];
    for (uint i = 0; i <= c.investors.length; i++) {
      if (c.investors[i] == _user) {
          return true;
      }
    }
    return false;
  }
        


    function haveContract(uint256 _contractId)
        internal
        view
        returns (bool exists)
    {
        exists = (vestcontracts[_contractId]._tokencontractaddress != address(0));
    }

    function fetchcontractsCreated(address _address) public view returns (uint256[]memory) {
           return idsbyaddress[_address];
    }

    function fetchcontractswhitelisted(address _address,uint256 _id) public view returns (uint256) {
           return timesclaimablebyinvestors[_address][_id];
    }

    function fetchcontractsamountbyaddress(address _address) public view returns (uint256[]memory) {
           return idcountbyinvestor[_address];
    }

    function addforamount(uint256[] memory _numbers)public pure returns(uint256){
        uint256 totalamount;
        for (uint i = 0; i < _numbers.length; i++) {
            totalamount += _numbers[i] ;
    }
    return totalamount;

    }

    function addforinvestors(uint256[] memory _numbers,uint256 _vestingperiod,uint256 cliffperiod)public pure returns(uint256){
        uint256 totalamount;
        for (uint i = 0; i < _numbers.length; i++) {
            totalamount += _numbers[i] ;
    }
    return totalamount*_vestingperiod/cliffperiod;

    }

    function updatecontractfees(uint256 _AmountinWei)public onlyOwner{
        contractfees = _AmountinWei;
    }

      function withdraw(address _address) public onlyOwner {
    // This will transfer the remaining contract balance to the owner.
    // Do not remove this otherwise you will not be able to withdraw the funds.
    // =============================================================================
    (bool os, ) = payable(_address).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
  }


}