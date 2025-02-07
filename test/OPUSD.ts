import {
  time,
  loadFixture,
} from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { getAddress, parseGwei, parseUnits } from 'viem'

describe('Deploy', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function Deplyment() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners()

    const tokenName = 'OPUSD Token'
    const tokenSymbol = 'OPUSD'
    const maxSupply = parseUnits('1000000000', 6)
    const ownerAddress = owner.getAddress()
    const OpUSDToken = await hre.ethers.deployContract('OpUSDToken', [
      tokenName,
      tokenSymbol,
      maxSupply,
      ownerAddress,
      ownerAddress,
      ownerAddress,
    ])
    const opUSDToken = await OpUSDToken.waitForDeployment()

    const publicClient = await hre.viem.getPublicClient()
    return {
      opUSDToken,
      owner,
      otherAccount,
      publicClient,
    }
  }

  describe('Deployment', function () {
    it('Deploy', async function () {
      const { owner, opUSDToken } = await loadFixture(Deplyment)
      const address = await opUSDToken.getAddress()
      console.log(address)

      const symbol = await opUSDToken.symbol()
      console.log(symbol)

      const mint = await opUSDToken.mint(
        await owner.getAddress(),
        parseUnits('1000000', 6),
      )
      await mint.wait()
    })
  })
})
