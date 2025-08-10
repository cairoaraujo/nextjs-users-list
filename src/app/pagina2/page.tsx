/* eslint-disable @next/next/no-img-element */
'use client'
export default function page(){
    return <div>
        <h1 className="text-4xl">Users</h1>
        <ul className="pt-10">
            <li className="py-2 px-5 text-2xl rounded-t-sm  flex self-center align-middle items-center text-center hover:bg-blue-200 justify-between border-b-gray-300 border-b-2">
                usuario 1
                <div className="flex gap-3">
                    <button
                    onClick={() => console.log('clicado')}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
                    >
                    <img src="/icons/editIcon.svg" alt="editar" className="w-6 h-6" />
                    </button>

                    <button
                    onClick={() => console.log('clicado')}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700"
                    >
                    <img src="/icons/deleteIcon.svg" alt="Excluir" className="w-7 h-7" />
                    </button>
                
                </div>
            </li>
                        <li className="py-2 px-5 text-2xl rounded-t-sm  flex self-center align-middle items-center text-center hover:bg-blue-200 justify-between border-b-gray-300 border-b-2">
                usuario 1
                <div className="flex gap-3">
                    <button
                    onClick={() => console.log('clicado')}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
                    >
                    <img src="/icons/editIcon.svg" alt="editar" className="w-6 h-6" />
                    </button>

                    <button
                    onClick={() => console.log('clicado')}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700"
                    >
                    <img src="/icons/deleteIcon.svg" alt="Excluir" className="w-7 h-7" />
                    </button>
                
                </div>
            </li>
        </ul>
    </div>
}