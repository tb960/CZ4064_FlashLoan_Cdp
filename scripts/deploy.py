from brownie import GetWeth, network, config, interface
from scripts.helpful_scripts import get_account

def main():
    account = get_account()
    weth = interface.IWeth(config["networks"][network.show_active()]["weth_token"])
    GetWeth.deploy(weth, {"from": account})
