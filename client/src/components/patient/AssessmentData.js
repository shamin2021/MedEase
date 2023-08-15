import React from 'react'

    function InputGeneral(props) {
      return (
        <div className="mt-2 text-[14px] ">
          <div
            className={` ${
              props.variant == "3" ? "hidden" : ""
            } text-[#797878]`}
          >
            {props.name}
          </div>
          {props.variant === "1" ? (
            <div className="text-center bg-primary rounded-md p-1">
              {props.data}
            </div>
          ) : props.variant === "2" ? (
            <div className="flex">
              <div className="w-1/2">
                <div>R | {props.dataR} </div>
                <hr></hr>
              </div>
              <div className="w-1/2 ml-4">
                <div>L | {props.dataL} </div>
                <hr></hr>
              </div>
            </div>
          ) : props.variant === "3" ? (
            <>
              <div className="flex mb-1">
                <div className="w-3/4 "> {props.name}</div>
                <div className="w-1/4 flex float-right text-[#797878]">
                  <div
                    className={`mr-1 ${
                      props.data === "true" ? "bg-primary " : ""
                    } pl-1 pr-1 rounded-lg`}
                  >
                    {props.dataP ? props.dataR : "Yes"}
                  </div>
                  <div
                    className={`mr-1 ${
                      props.data === "false"
                        ? "bg-primary "
                        : props.dataP === "true"
                        ? "bg-primary "
                        : ""
                    } pl-1 pr-1 rounded-lg`}
                  >
                    {props.dataP ? props.dataL : "No"}
                  </div>
                </div>
              </div>
              <hr></hr>
            </>
          ) : (
            <>
              <div>{props.data}</div>
              <hr></hr>
            </>
          )}
        </div>
      );
    }
const AssessmentData = () => {
  return (
    <div>AssessmentData</div>
  )
}

export default AssessmentData