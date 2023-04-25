import { Link } from "react-router-dom";

const EventDetail = (props) => {
    const { title, date, desc} = props.location.state.event;
    return ( 
        <div className="p-4 shadow-md rounded-xl w-3/5 mx-auto bg-white mt-6 flex flex-col justify-center">
            {/* <div className="">
                <img className="w-full h-36 object-cover rounded-2xl" src={ photo } />
            </div> */}
            <div className="flex flex-col mt-4">
                <h1 className="text-xl text-pink-400 font-bold">{ title }</h1>
                <p>{ date }</p>
                <p>{ desc }</p>
            </div>
        </div>

        // gg
     );
}
 
export default EventDetail;