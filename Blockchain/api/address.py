from contract_config import contract, web3, collection


def adr(govID):
    count = (contract.functions.getInfo(2).call())
    address = web3.eth.accounts[count]
    web3.eth.default_account = address

    tx = contract.functions.addUser(govID, address).transact()
    tx_hash = (web3.toHex(tx))
    tx_receipt = (web3.eth.waitForTransactionReceipt(tx_hash))  
    collection.update_one({ "voterID": govID }, { "$set": { "walletAddress": address } })
    collection.update_one({ "voterID": govID }, { "$set": { "verificationHash": tx_hash } })
    print ("New wallet called: {}".format(address))
    
    return address,tx_hash, tx_receipt

