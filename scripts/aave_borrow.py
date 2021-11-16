from brownie import interface, network, config
from scripts.helpful_scripts import get_account
from scripts.get_weth import get_weth
from web3 import Web3


#0.1
amount = Web3.toWei(0.1, "ether")

def main():
    account = get_account()
    print(account)
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
    borrowable_eth, total_debt = get_borrowable_data(account, lending_pool)
    #borrow(borrowable_eth, account, lending_pool)
    print("Let's borrow!")
    # DAI in terms of ETH
    dai_eth_price = get_asset_price(
        config["networks"][network.show_active()]["dai_eth_price_feed"]
    )
    amount_dai_to_borrow = (1 / dai_eth_price) * (borrowable_eth * 0.95)
    # borrowable_eth -> borrowable_dai * 95%\
    print(f"We are going to borrow {amount_dai_to_borrow} DAI")
    # Now we will borrow!
    dai_address = config["networks"][network.show_active()]["dai_token"]
    borrow_tx = lending_pool.borrow(
        dai_address,
        Web3.toWei(amount_dai_to_borrow, "ether"),
        1,
        0,
        account.address,
        {"from": account},
    )
    borrow_tx.wait(1)
    print("We borrowed some DAI!")
    get_borrowable_data(account, lending_pool)


def get_asset_price(price_feed_address):
    dai_eth_price_feed = interface.AggregatorV3Interface(price_feed_address)
    latest_price = dai_eth_price_feed.latestRoundData()[1]
    converted_latest_price = Web3.fromWei(latest_price, "ether")
    print(f"The DAI/ETH price is {converted_latest_price}")
    return float(converted_latest_price)



def deposit(lending_pool, erc20_address, amount, account):
    print("Depositing")
    tx = lending_pool.deposit(erc20_address, amount, account.address, 0, {"from": account})
    tx.wait(1)
    print("Deposited")

def get_borrowable_data(account, lending_pool):
    # ABI
    # Address
   ( 
       total_collateral_eth,
       total_debt_eth,
       available_borrow_eth,
       current_liquidation_threshold,
       ltv,
       health_factor,
   ) = lending_pool.getUserAccountData(account.address)
   print(lending_pool.getUserAccountData(account.address))
   available_borrow_eth = Web3.fromWei(available_borrow_eth, "ether")
   total_collateral_eth = Web3.fromWei(total_collateral_eth, "ether")
   total_debt_eth = Web3.fromWei(total_debt_eth, "ether")
   print(float(health_factor))
   print(f"You have {total_collateral_eth} worth of eth deposited")
   print(f"your total debt is {total_debt_eth}")
   print(f"your available eth to borrown is {available_borrow_eth}")
   return (float(available_borrow_eth),  float(total_collateral_eth))

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