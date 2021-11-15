from brownie import interface, network, config
import eth_account
from scripts.helpful_scripts import get_account
from scripts.get_weth import get_weth
from web3 import Web3


#0.1
amount = Web3.toWei(0.1, "ether")

def main():
    account = get_account()
    erc20_address = config["networks"][network.show_active()]["weth_token"]
    if network.show_active() in ["mainnet-fork"]:
        get_weth()
    # ABI
    # Address
    lending_pool = get_lending_pool()
    # approve erc 20 token
    approve_erc20(amount, lending_pool.address, erc20_address, account)
    # print("Depositing")
    # tx = lending_pool.deposit(erc20_address, amount, account.address, 0, {"from":account})
    # tx.wait(1)
    # print("Deposited")

    #now i want to check the user account in the lending pool
    get_depositedETH_interest(account, lending_pool)

def deposit(lending_pool, erc20_address, amount, account):
    print("Depositing")
    tx = lending_pool.deposit(erc20_address, amount, account.address, 0, {"from": account})
    tx.wait(1)
    print("Deposited")

def get_depositedETH_interest(account, lending_pool):
    # ABI
    # Address
    account_data = lending_pool.getUserAccountData(account)
    print("Your currently deposited ETH plus accrued interest is: ")
    print(Web3.fromWei(account_data[0], "ether"))

def approve_erc20(amount, spender, erc20_address, account):
    print("Approving ERC20 token...")
    erc20 = interface.IERC20(erc20_address)
    tx = erc20.approve(spender, amount, {"from":account})
    tx.wait(1)
    print("Approved!")
    return tx
    


def get_lending_pool():
    # ABI
    # Address
    lending_pool_addresses_provider = interface.ILendingPoolAddressesProvider(
        config["networks"][network.show_active()]["lending_pool_addresses_provider"]
    )
    lending_pool_address = lending_pool_addresses_provider.getLendingPool()
    lending_pool = interface.ILendingPool(lending_pool_address)
    return lending_pool