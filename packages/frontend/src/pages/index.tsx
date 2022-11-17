import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { GreeterContractInteractions } from '@components/web3/GreeterContractInteractions'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/social/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import 'twin.macro'

const HomePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar href="https://inkathon.xyz">
        <div tw="font-bold">INK!athon</div>
        <div tw="hidden sm:inline"> – Substrate-based DApp Boilerplate</div>
      </HomeTopBar>

      <CenterBody tw="my-12">
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

        {/* Greeter.sol Contract Interactions */}
        <GreeterContractInteractions />
      </CenterBody>
    </>
  )
}

export default HomePage
