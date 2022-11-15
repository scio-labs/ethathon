import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { Lock__factory } from '@ethathon/contracts/typechain-types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/social/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import toast from 'react-hot-toast'
import tw from 'twin.macro'
import { useSigner } from 'wagmi'

const Button = tw.button`m-2 rounded-lg border border-current px-2 py-1 font-semibold text-gray-400 hover:text-white`

const HomePage: NextPage = () => {
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

  return (
    <>
      {/* Top Bar */}
      <HomeTopBar href="https://inkathon.xyz">
        <div tw="font-bold">INK!athon</div>
        <div tw="hidden sm:inline"> – Substrate-based DApp Boilerplate</div>
      </HomeTopBar>

      <CenterBody>
        {/* Title */}
        <div tw="flex flex-col items-center text-center font-mono">
          <Link
            href="https://github.com/scio-labs/ethathon"
            target="_blank"
            className="group"
            tw="flex cursor-pointer flex-col items-center"
          >
            <Image
              src={githubIcon}
              priority
              width={42}
              alt="Github Logo"
              tw="opacity-50 group-hover:opacity-100"
            />
            <h1 tw="mt-4 font-black text-3xl tracking-tight underline-offset-4 group-hover:underline">
              ETHathon
            </h1>
          </Link>
          <p tw="mt-1 text-gray-400">EVM-based Smart Contract & DApp Development Boilerplate</p>
          <a tw="mt-6" href="https://github.com/scio-labs/ethathon#deployment">
            <Image src={vercelIcon} priority width={92} alt="Deploy with Vercel" />
          </a>
          <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
        </div>

        {/* Rainbowkit Connect Button */}
        <ConnectButton />

        {/* Lock.sol Contract Interactions */}
        {signer && (
          <div tw="mt-6 flex items-center">
            <div tw="mr-2 text-gray-400">Lock.sol:</div>
            <Button onClick={() => getOwner()}>Get Owner</Button>
            <Button onClick={() => withdraw()}>Withdraw</Button>
          </div>
        )}
      </CenterBody>
    </>
  )
}

export default HomePage
