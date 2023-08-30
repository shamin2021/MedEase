import "../../styles/Table.css";
import Doc from "../../assets/patient.jpg";
import { Link } from "react-router-dom";
const Table = ({ data }) => {
    return (
        <>
            <div className=" h-3/4 m-1 ml-9">
                <div className=" flex mt-4 text-[17px] font-medium sticky top-3 p-1">
                    <div className="w-1/5 m-1">Name</div>
                    <div className="w-1/5 m-1">Surname</div>
                    <div className="w-1/5 m-1">Email</div>
                    <div className="w-1/5 m-1">Gender</div>
                    <div className="w-2/5 m-1 text-center">Manage</div>
                </div>
                <hr className="w-7/8 mx-auto mt-1 mb-0" />
                <div>
                    <div className=" h-96 overflow-y-scroll mb-2">
                        {data.map((item) => (
                            <>
                                <Link to={`/PatientProfile/${item.id}`}>
                                    <div className=" flex mt-4 text-[15px] font-medium hover:bg-primary p-1 rounded-lg hover:">
                                        <div className="w-1/5 m-1 flex ">
                                            <img
                                                className="rounded-[100px] mx-auto h-[40px] w-[40px] bg-black"
                                                src={Doc}
                                            />
                                            <div className="w-3/4 ml-6">{item.first_name}</div>
                                        </div>
                                        <div className="w-1/5 m-1">{item.last_name}</div>
                                        <div className="w-1/5 m-1">{item.email}</div>
                                        <div className="w-1/5 m-1">{item.gender}</div>
                                        <div className="w-2/5 m-1 text-center">
                                            <Link to={"/AddLifestyle"}>
                                                <button className="p-2 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white">
                                                    Lifestyle Tips
                                                </button>
                                            </Link>
                                            <Link to={"/AddPrescription"}>
                                                <button
                                                    href={"/patient"}
                                                    className="p-2 ml-3 bg-primary hover:bg-[#7ebcef] hover:text-white rounded-md border-4 border-white"
                                                >
                                                    Medical instruction
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;