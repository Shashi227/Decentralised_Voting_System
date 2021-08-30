import json
from contract_config import contract, web3, collection

def vote(tx_from, vote_to):
    web3.eth.default_account = tx_from
    
    tx = contract.functions.doVote(vote_to).transact()
    tx_hash = (web3.toHex(tx))
    tx_receipt = (web3.eth.waitForTransactionReceipt(tx_hash))  
    tx_block = (web3.eth.blockNumber)
    collection.update_one({ "walletAddress": tx_from }, { "$set": { "transactionHash": tx_hash } })
    

    return tx_hash, tx_receipt, tx_block


   
