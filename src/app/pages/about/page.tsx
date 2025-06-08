"use client"

export default function PageOrComponent() {
  return (
    <div className=" mx-auto p-6 h-screen">
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
          { name: 'Next.js' },
          { name: 'React'},
          { name: 'Tailwind CSS'},
          { name: 'DaisyUI'},
          { name: 'Jodit React'},
          { name: 'MongoDB'},
          { name: 'NextAuth.js'},
          { name: 'FontAwesome'},
          { name: 'React Hot Toast' },
          { name: 'React Icons' },
        ].map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center bg-base-100 rounded-xl shadow-md p-4 transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl border border-base-200"
          >

            <span className="font-medium text-base text-center mt-1">{tech.name}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-gray-500 text-sm">Made with ❤️ for simplicity and productivity.</p>
    </div>
  );
}