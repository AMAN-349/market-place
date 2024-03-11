import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Providers from './Providers';
import ErrorPage from '../errorPage/ErrorPage'
import axios from 'axios'
import Spinner from "../spinner/Spinner";
import url from '../url'
import {userContext} from '../App';

const Services = () => {

    const {state:{location},dispatch}=useContext(userContext);

    const navigate=useNavigate();
    const loc = useLocation();
    const encodedName = loc.pathname.slice(9);
    const decodedName = decodeURIComponent(encodedName);

    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        searchApi();
    }, []);

    const searchApi = async () => {
        try {
            let work = window.location.href.split('?')[1];
            const response = await axios.get(`${url}/api/client/service?city=${location.city}&pincode=${location.postalCode}&work=${work}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(response);
            setFilteredData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }


    return (
        <div>
            <div>
                <h1 className="text-center text-6xl text-stone-600" style={{ fontFamily: "poppins" }}>{decodedName} Sellers</h1>
            </div>
            <div>
                {isLoading ? (
                     <Spinner/>
                ) : (
                    localStorage.getItem('onLine') > 0 ? (
                        <div className="flex flex-wrap my-5 justify-center">
                            {filteredData.map((item, index) => (
                                <div key={index} className="flex justify-center my-5 mx-10">
                                    <div className="relative flex-col items-center shadow-2xl rounded-[20px] px-2">
                                        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                                            <img src='https://thumbs.dreamstime.com/b/repair-home-service-concept-house-construction-150505168.jpg' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" />
                                            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white ">
                                                <img className="h-full w-full rounded-full" src='https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg' alt="" />
                                            </div>
                                        </div>
                                        <div className="mt-16 mx-20 mb-5  items-center">
                                            <h4 className="text-xl text-center font-bold text-navy-700">
                                                {item.fname + " " + item.lname}
                                            </h4>
                                            <p className="text-base text-center font-normal text-gray-600">State: {item.state}</p>
                                            <p className="text-base text-ellipsis font-normal text-gray-600">City: {item.city}</p>
                                            <p className="text-base text-center font-normal text-gray-600">Pincode: {item.pincode}</p>
                                        </div>
                                        <div className=" flex flex-col">


                                            <div className=" flex justify-center">
                                                <button onClick={()=>{
                                                    dispatch({type:'provider',payload:item})
                                                    navigate(`/chat`);
                                                }} type="button" className="text-gray-900 bg-green-300 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-[#00BFFF]/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#00BFFF]/50 mr-2  mb-4">
                                                    
                                                    Connect
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p><ErrorPage /></p>
                    )
                )}
            </div>
        </div>
    );
}

export default Services;