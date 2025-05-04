import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Tout Spécial - E-commerce de Moda</title>
        <meta name="description" content="E-commerce de moda desenvolvido com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Tout Spécial
        </h1>
        <p className="mt-4 text-center text-gray-600">
          E-commerce de moda em desenvolvimento
        </p>
      </main>
    </div>
  )
}

export default Home 