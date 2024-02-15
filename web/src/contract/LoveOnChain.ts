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
		"stateMutability": "payable",
		"type": "fallback"
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
				"name": "dateId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "confirmAttendanceInt",
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
				"internalType": "address",
				"name": "_stakerAddress",
				"type": "address"
			}
		],
		"name": "launch",
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
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "stakeInt",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
] as const;

export default abi;