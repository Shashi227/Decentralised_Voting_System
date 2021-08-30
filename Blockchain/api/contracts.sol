pragma solidity >=0.7.4;

contract MyContract {
    
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    struct Wallets {
        string govID;
        string addr;
    }
    
    // Store Candidates Count
    uint public candidatesCount;
    
    // Store Wallets Count
    uint public walletsCount;
    
    // Store Candidates / Wallets
    // Fetch Candidate / Wallets
    mapping(uint => Candidate) public candidates;
    mapping(uint => Wallets) public wallet;
    
    // Store accounts that have voted / verified
    mapping(address => bool) public voter;
    mapping(address => bool) public verified;
    
    event voted(uint indexed _candidateId);
    event userVerify(string indexed _addr);
    
    constructor() public{
        addCandidate("candy1");
        addCandidate("candy2");
    }
    
    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
    
    function getCandidates(uint index) public returns(uint, string memory, uint) {
        return (candidates[index].id, candidates[index].name, candidates[index].voteCount);
       
    }
    
    function getInfo(uint _switch) public returns(uint){
        if (_switch == 1) {
            return candidatesCount;
        }
        if (_switch == 2) {
            return walletsCount;
        }
        else {
            return 0;
        }
    }
    
    function doVote(uint _candidateId) public{
        require(verified[msg.sender]);
        require(!voter[msg.sender]);
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        voter[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        
        emit voted(_candidateId);
    }
    
    function addUser(string memory _govID, string memory _addr) public{
        
        walletsCount++;
        wallet[walletsCount] = Wallets(_govID, _addr);
        verified[msg.sender] = true;
        
        emit userVerify(_addr);
        
        
    }
    
    
}

