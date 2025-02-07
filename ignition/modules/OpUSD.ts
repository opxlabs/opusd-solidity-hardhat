// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import { parseEther, parseUnits } from 'viem'

const OPUSDModule = buildModule('OPUSDModule', (m) => {
  const owner = m.getAccount(0)
  const tokenName = 'OPUSD Token'
  const tokenSymbol = 'OPUSD'
  const maxSupply = parseUnits('1000000000', 6)

  const opusd = m.contract('OPUSDToken', [
    tokenName,
    tokenSymbol,
    maxSupply,
    owner,
    owner,
    owner,
  ])

  const MINT_AMOUNT: bigint = parseUnits('10000000', 6)

  const result = m.call(opusd, 'mint', [owner, MINT_AMOUNT])

  return { opusd }
})

export default OPUSDModule
