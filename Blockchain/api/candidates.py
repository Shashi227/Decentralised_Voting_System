from contract_config import contract

def addC(name):
    contract.functions.addCandidate(name).call()     # #Dummy! prepared for future development
    return {"Candidate added Successfully"}

def allInfo():
    count = (contract.functions.getInfo(1).call())
    arr = []
    for x in range(count):        
        id, name, votes = contract.functions.getCandidates(x+1).call()
        arr.append({ "id":id, "name":name, "votes":votes})
    
    return arr

def info(y):
    arr2 = []
    id, name, votes = contract.functions.getCandidates(y).call()
    arr2.append({ "id":id, "name":name, "votes":votes})
    
    return arr2


        


