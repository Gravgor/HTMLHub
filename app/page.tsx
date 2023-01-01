import Link from 'next/link';


export default function Page(){
    return (
        <main className="container mx-auto my-auto px-6 py-4">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to React-html-reader</h1>
    <p className="text-gray-600 mb-8">
        There you can log in to your account and start using the app. If you dont have an account, you can create one. Its free! This app is built with React, Tailwind CSS and TypeScript. It uses the Next JS framework and is deployed on Vercel.
    </p>
    <p className="text-gray-600 mb-8">
        This app is built for user to upload html files and read them in a browser. It is a simple app that can be used to read html files on the go.
    </p>
    <div className="flex items-center justify-center">
      <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full mr-4">
        Get started
      </Link>
    </div>
    </main>
    );
}