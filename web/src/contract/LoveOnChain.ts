const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			}
		],
		"name": "AttendanceConfirmed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant2",
				"type": "address"
			}
		],
		"name": "DateMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant1",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant2",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsReleased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "StakeMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "dateId",
				"type": "string"
			}
		],
		"name": "confirmAttendance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "dates",
		"outputs": [
			{
				"internalType": "address",
				"name": "participant1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participant2",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "participant1Staked",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "participant2Staked",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "participant1Confirmed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "participant2Confirmed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "dateId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "participant1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participant2",
				"type": "address"
			}
		],
		"name": "initDate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "dateId",
				"type": "string"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
] as const;

export default abi;