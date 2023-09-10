import React from 'react'

function Login() {
  return (
    <>
      <div className='container p-3 border border border-secondary'>
        <h1 className='text-center'>Login Page</h1>
        <div className='row mt-5 '>
          <form>
            <div className="form-group  mb-4">
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group  mb-4">
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>

      </div>
    </>
  )
}

export default Login