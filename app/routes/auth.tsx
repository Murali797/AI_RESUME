import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { usePuterStore } from "~/lib/puter"

export const meta = () => [
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'Log into your account'},

]



const auth = () => {
    const {isLoading, auth} = usePuterStore()
    const location = useLocation()
    const next = location.search.split('next=')[1]
    const navigate = useNavigate()


    useEffect(() => {
        if(auth.isAuthenticated) navigate(next)
    }, [auth.isAuthenticated, next])

  return (
   <main className="bg-[url('/assets/public/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
    <div className='rounded-xl shadow-lg'>
        <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='text-black text-3xl'>Welcome</h1>
                <h2 className='text-gray-400'>Log In to Continue Your Job Journey</h2>
            </div>
            <div className="flex flex-col items-center">
               {isLoading ? (
  <button
    className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg cursor-not-allowed"
    disabled
  >
    <p>Signing you in...</p>
  </button>
) : (
  <>
    {auth.isAuthenticated ? (
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        onClick={auth.signOut}
      >
        <p>Log Out</p>
      </button>
    ) : (
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md cursor-pointer"
        onClick={auth.signIn}
      >
        <p>Log In</p>
      </button>
    )}
  </>
)}

            
            </div>

        </section>

    </div>

   </main>
  )
}

export default auth
