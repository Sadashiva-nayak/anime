import React from 'react'

const Alert = ({alert}) => {
  return (
   <div>
    {alert && (alert.type=="error" ||alert.type=="sorry")&& <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{alert.type}!</strong>
  <span className="block sm:inline">{alert.msg}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  </span>
</div>}
    {alert && (alert.type=="success" || alert.type=="congratulations") && <div className="bg-green-100 border border-green-400 text-black px-4 py-3 rounded relative" role="alert">
  <strong className="font-bold">{alert.type}! </strong>
  <span className="block sm:inline">{alert.msg}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  </span>
</div>}
    </div>
  )
}

export default Alert
