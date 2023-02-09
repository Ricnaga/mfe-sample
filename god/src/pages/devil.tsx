import dynamic from 'next/dynamic'

const Page = dynamic(() => import('devil/pages/devil'), {ssr:true})

export default Page