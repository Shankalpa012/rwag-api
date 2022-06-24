import { Button, ButtonGroup } from '@chakra-ui/react'

function Navbar() {
  return (
    <div className="w-[100%] border-b-2 border-slate-200 shadow-md shadow-red bg-slate-50 sticky top-0 z-10 ">
        <div className="md:w-[60%] w-[90%] m-auto flex justify-between p-3 ">
          <div>
            <h1 className='font-headingFont text-4xl font-medium tracking-wider '>InstaKilo</h1>
          </div>

          <div>
            <Button colorScheme='green'>Add Post</Button>
          </div>
        </div>
    </div>
  )
}

export default Navbar