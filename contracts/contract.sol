// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract DateVerificationEscrow {

    uint256 stakeAmount = 100;
    address stakerAddress;

    struct Date {
        address participant1;
        address participant2;
        bool participant1Staked;
        bool participant2Staked;
        bool participant1Confirmed;
        bool participant2Confirmed;
    }

    mapping(string => Date) public dates;

    // Event declarations for logging actions
    event DateMade(address participant1, address participant2);
    event StakeMade(address participant, uint256 amount);
    event AttendanceConfirmed(address participant);
    event FundsReleased(address participant1, address participant2, uint256 amount);

    // Constructor to initialize participants and stake amount
    constructor(address _stakerAddress) {
        stakerAddress = _stakerAddress;
    }

    function initDate(string memory dateId, address participant1, address participant2) external {
        dates[dateId] = Date({
            participant1: participant1,
            participant2: participant2,
            participant1Staked: false,
            participant2Staked: false,
            participant1Confirmed: false,
            participant2Confirmed: false});

        emit DateMade(participant1, participant2);
    }

    // Allow participants to stake ETH
    function stake(string memory dateId) external payable{
        stakeInt(dateId, msg.sender, msg.value);
    }

    function stakeInt(string memory dateId, address sender, uint value) public payable  {
        Date storage curr_date = dates[dateId];
        require(sender == curr_date.participant1 || sender == curr_date.participant2, "Not a participant");
        require(value >= stakeAmount, "Not enough stake amount");
        Staker staker = Staker(stakerAddress);
        if (sender == curr_date.participant1) {
            require(curr_date.participant1Staked == false, "Stake already made");
            curr_date.participant1Staked = true;
        } else if (sender == curr_date.participant2) {
            require(curr_date.participant2Staked == false, "Stake already made");
            curr_date.participant2Staked = true;
        }
        staker.stake{value: 2 * stakeAmount}();
        emit StakeMade(msg.sender, stakeAmount); // Log the staking event
    }

    // Participants confirm the date
    function confirmAttendance(string memory dateId) external {
        confirmAttendanceInt(dateId, msg.sender);
    }

    function confirmAttendanceInt(string memory dateId, address sender) public {
        Date storage curr_date = dates[dateId];
        require(sender == curr_date.participant1 || sender == curr_date.participant2, "Not a participant");

        if (sender == curr_date.participant1) {
            require(curr_date.participant1Staked, "Stake not already made");
            curr_date.participant1Confirmed = true;
            emit AttendanceConfirmed(curr_date.participant1); // Log confirmation
        } else if (sender == curr_date.participant2) {
            require(curr_date.participant2Staked, "Stake not already made");
            curr_date.participant2Confirmed = true;
            emit AttendanceConfirmed(curr_date.participant2); // Log confirmation
        }

        if (curr_date.participant1Confirmed && curr_date.participant2Confirmed) {
            // Release funds from escrow (the contract itself) back to both participants
            Staker staker = Staker(stakerAddress);
            staker.funstake();

            payable(curr_date.participant1).transfer(stakeAmount);
            payable(curr_date.participant2).transfer(stakeAmount);
            emit FundsReleased(curr_date.participant1, curr_date.participant2, stakeAmount); // Log the release of funds
            delete dates[dateId];
        }
    }

    fallback() external payable {
        // Do nothing
    }

    receive() external payable {
        // Do nothing
    }

    // Add functions for dispute resolution or timeouts if needed
    // For instance, a timeout function that allows withdrawal of stakes after a certain period
    // if one of the participants fails to confirm attendance.
    // TODO: deploy
}

contract Staker {

    mapping(address => uint256) stakes;

    constructor() { }

    function stake() external payable{
        stakes[msg.sender] = msg.value;
    }

    function funstake() external {
        uint256 amount = stakes[msg.sender] * 2;
        require(amount > 0, "No stake to withdraw");
        stakes[msg.sender] = 0;
        payable(msg.sender).transfer(2 * amount);
    }
}
