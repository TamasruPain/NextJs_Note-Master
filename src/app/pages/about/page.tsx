"use client"

import Image from "next/image";

export default function PageOrComponent() {
  return (
    <div className=" mx-auto p-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">About Note Master</h1>
          <p className="mb-4">
            <b>Note Master</b> is a simple, web-based note-taking app designed for users who want a clean, beautiful, and easy-to-use interface. With Note Master, you can create, read, update, and delete notes, format your text, and even generate PDF summaries. It&apos;s perfect for anyone who wants a straightforward note app that looks great and just works.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Key Features</h2>
          <ul className="list-disc list-inside mb-4">
            <li>CRUD operations for notes</li>
            <li>Rich text formatting</li>
            <li>PDF summary generation</li>
            <li>Modern, responsive design</li>
            <li>Simple and intuitive user experience</li>
          </ul>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-4">Tech Stack</h2>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 gap-6">
        {[
          { name: 'Next.js', img: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
          { name: 'React', img: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
          { name: 'Tailwind CSS', img: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
          { name: 'DaisyUI', img: 'https://daisyui.com/images/daisyui-logo/svg/daisyui-logo.svg' },
          { name: 'Jodit React', img: 'https://xdsoft.net/jodit/files/artio.jpg' },
          { name: 'MongoDB', img: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
          { name: 'NextAuth.js', img: 'https://github.com/nextauthjs/next-auth/raw/main/docs/static/img/logo/logo.png' },
          { name: 'FontAwesome', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Font_Awesome_5_brands_fontawesome.svg' },
          { name: 'React Hot Toast', img: 'https://react-hot-toast.com/favicon.ico' },
          { name: 'React Icons', img: 'https://seeklogo.com/images/R/react-icons-logo-AEAE236C31-seeklogo.com.png' },
        ].map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center bg-base-100 rounded-xl shadow-md p-4 transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl border border-base-200"
          >
            <Image src={tech.img} alt={tech.name} className="h-12 w-12 mb-2 object-contain rounded" />
            <span className="font-medium text-base text-center mt-1">{tech.name}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-gray-500 text-sm">Made with ❤️ for simplicity and productivity.</p>
    </div>
  );
}