import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");


//useref hook

const passwordRef=useRef(null);


  //usecallback hook...
  const passgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*{}[]~+-*`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numAllowed, charAllowed]);


  const passtoclip = useCallback(()=>{
     passwordRef.current?.select();  //..................for optimize selection
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  },[password])

  //use effect hook...
  useEffect(() => {
    passgenerator();
  }, [setcharAllowed, setnumAllowed, passgenerator, setpassword]);


  

  return (
    <>
      <div className="w-full h-screen flex justify-center py-40 text-center bg-black">
        <div className="h-40 w-3/5 bg-white text-3xl font-bold p-5 ">
          Password Generator
          <div className="w-3/5 ml-40 rounded-md text-black flex gap-2 ">
            <input
              type="text"
              value={password}
              placeholder={"Password"}
              className=" w-full bg-slate-300 text-black border-2px-black border-2 border-black"
              readOnly
              ref={passwordRef}
            />
            <button className="text-black bg-blue-600 border-2 border-black px-1 py-1 rounded-md" onClick={passtoclip}>
              COPY
            </button>
          </div>
          <div className="w-3/5 ml-40 rounded-md text-black flex gap-7">
            <div className="flex">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              <h3 className="text-2xl">length:{length}</h3>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onChange={() => {
                  setnumAllowed((prev) => !prev);
                }}
              />
              <h3 className="text-2xl">Num</h3>
            </div>

            <div className="flex">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onChange={() => {
                  setnumAllowed((prev) => !prev);
                }}
              />
              <h3 className="text-2xl">Char</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
