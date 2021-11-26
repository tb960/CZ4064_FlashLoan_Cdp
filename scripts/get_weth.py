from scripts.helpful_scripts import get_account
from brownie import interface, config, network


def main():
    get_weth()

def get_weth():
    """
    Mints WETH by depositing ETH.
    """
    # we need ABI
    # we need Address of the swap to weth address
    
    account = get_account()
    weth = interface.IWeth(config["networks"][network.show_active()]["weth_token"])
    print(weth)
    
    lending_pool_addresses_provider = interface.ILendingPoolAddressesProvider(
        config["networks"][network.show_active()]["lending_pool_addresses_provider"]
    )
    lending_pool_address = lending_pool_addresses_provider.getLendingPool()
    lending_pool = interface.ILendingPool(lending_pool_address)

    print(lending_pool)
    tx = weth.deposit({"from": account, "value": 0.1 * 10 ** 18})
    tx.wait(1)
    print("Received 1 WETH")
    return tx