import { Lock__factory } from '@ethathon/contracts/typechain-types' // TODO
import { useDeployments } from '@shared/useDeployments'
import { FC } from 'react'
import toast from 'react-hot-toast'
import tw from 'twin.macro'
import { useSigner } from 'wagmi'

const Button = tw.button`m-2 rounded-lg border border-current px-2 py-1 font-semibold text-gray-400 hover:text-white`

export const GreeterContractInteractions: FC = () => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()

  const getOwner = async () => {
    if (!signer || !contracts) return
    const contract = Lock__factory.connect(contracts.Lock.address, signer)
    try {
      const owner = await contract.owner()
      toast.success(owner)
      console.log({ owner })
    } catch (e) {
      toast.error('Error while fetching owner. Try again…')
      console.error(e)
    }
  }

  const withdraw = async () => {
    if (!signer || !contracts) return
    const contract = Lock__factory.connect(contracts.Lock.address, signer)
    try {
      const tsx = await contract.withdraw({ gasLimit: 50000 })
      const receipt = await tsx.wait()
      toast.success('Successfully withdrawn!')
      console.log({ receipt })
    } catch (e: any) {
      toast.error('Error while withdrawal. Try again…')
      console.error(e)
    }
  }

  if (!signer) return null

  return (
    <>
      <div tw="mt-6 flex items-center">
        <div tw="mr-2 text-gray-400">Lock.sol:</div>
        <Button onClick={() => getOwner()}>Get Owner</Button>
        <Button onClick={() => withdraw()}>Withdraw</Button>
      </div>
    </>
  )
}
