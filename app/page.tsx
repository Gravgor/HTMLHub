import Link from 'next/link';
import Image from 'next/image';

export default function Page(){
    return (
    <main className="container mx-auto px-6 py-4">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">HTMLHub</h1>
    <p className="text-gray-600 mb-8">Welcome to our HTML rendering platform! With our app, you can upload your HTML files and view them directly in the browser. You can also edit the HTML code in real-time and see the changes reflected in the rendered output. Plus, you can create your own account to save and manage your HTML files. Give it a try and see how easy it is to work with HTML on our platform</p>
    <p className="text-gray-600 mb-8">Dont miss out on the benefits of our HTML rendering platform! By creating an account, you ll be able to save and manage your HTML files, as well as access advanced features like real-time editing and customization options. Plus, its easy and free to register. Dont wait – create your account now and start exploring the full potential of our platform!</p>
    <div className="flex items-center justify-center">
      <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full mr-4">Sign In</Link>
      <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full">Register</Link>
    </div>
    <div className="mt-8 flex flex-wrap items-center justify-center text-gray-600">
    <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript logo" width={48} height={48}  className="w-12 h-12 mr-2"/>
    <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React logo" width={48} height={48}  className="w-12 h-12 mr-2"/>
    <Image src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js logo" width={48} height={48}  className="w-12 h-12 mr-2"/>
</div>
</main>
    );
}