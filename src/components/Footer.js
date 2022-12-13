import '../styles/Footer.css';
 
function Footer() {
    return (
        <>
        <div className="bg-slate-800 p-8 w-full footer  text-sm">
            <p className='display flex row flex-wrap justify-around text-purple-200 font-mono font-bold'> DEVELOPERS:
          <a className="hover:text-yellow-400  hover:tracking-wide" href="https://github.com/rachlally" target="_blank" rel="noreferrer">
            Rachel Lally
          </a>
          
          <a className="hover:text-yellow-400 hover:tracking-wide" href="https://github.com/NathanAlexander1" target="_blank" rel="noreferrer">
            Nathan Alexander
          </a>
          
          <a className="hover:text-yellow-400  hover:tracking-wide" href="https://github.com/Sullisters" target="_blank" rel="noreferrer">
            Philip Schreiber
          </a>
          
          <a className="hover:text-yellow-400  hover:tracking-wide" href="https://github.com/amassey42" target="_blank" rel="noreferrer">
            Andrew Massey
          </a>
          
            </p>
        </div>
        </>
    )
}

export default Footer;