// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DateVerificationEscrow {

    uint256 public stakeAmount = 1;

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
    event StakeMade(address participant, uint256 amount);
    event AttendanceConfirmed(address participant);
    event FundsReleased(address participant1, address participant2, uint256 amount);

    // Constructor to initialize participants and stake amount
    constructor() {}

    function initDate(string memory dateId, address participant1, address participant2) external {
        dates[dateId] = Date({
            participant1: participant1, 
            participant2: participant2, 
            participant1Staked: false, 
            participant2Staked: false, 
            participant1Confirmed: false, 
            participant2Confirmed: false});
    }

    // Allow participants to stake ETH
    function stake(string memory dateId) external payable {
        Date memory curr_date = dates[dateId];
        require(msg.sender == curr_date.participant1 || msg.sender == curr_date.participant2, "Not a participant");
        require(msg.value >= stakeAmount, "Not enough stake amount");
        if (msg.sender == curr_date.participant1) {
            require(curr_date.participant1Staked == false, "Stake already made");
            curr_date.participant1Staked == true;
        } else if (msg.sender == curr_date.participant1) {
            require(curr_date.participant1Staked == false, "Stake already made");
            curr_date.participant1Staked == true;
        }

        emit StakeMade(msg.sender, msg.value); // Log the staking event
    }

    // Participants confirm the date
    function confirmAttendance(string memory dateId) external {
        Date memory curr_date = dates[dateId];
        require(msg.sender == curr_date.participant1 || msg.sender == curr_date.participant2, "Not a participant");        

        if (msg.sender == curr_date.participant1) {
            require(curr_date.participant1Staked == true, "Stake not already made");
            curr_date.participant1Confirmed = true;
            emit AttendanceConfirmed(curr_date.participant1); // Log confirmation
        } else if (msg.sender == curr_date.participant2) {
            require(curr_date.participant1Staked == true, "Stake not already made");
            curr_date.participant2Confirmed = true;
            emit AttendanceConfirmed(curr_date.participant2); // Log confirmation
        }

        if (curr_date.participant1Confirmed && curr_date.participant2Confirmed) {
            // Release funds from escrow (the contract itself) back to both participants
            payable(curr_date.participant1).transfer(stakeAmount);
            payable(curr_date.participant2).transfer(stakeAmount);
            emit FundsReleased(curr_date.participant1, curr_date.participant2, stakeAmount); // Log the release of funds
            delete dates[dateId];
        }
    }

    // Add functions for dispute resolution or timeouts if needed
    // For instance, a timeout function that allows withdrawal of stakes after a certain period
    // if one of the participants fails to confirm attendance.
}
