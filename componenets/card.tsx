import Image from "next/image";

export default function Card(){
    return(
        <div className="w-[393px] flex flex-col items-center">
            <Image width={393} height={444} alt="alt" src="/Rectangle 1.png"/>
            <div className="w-[77px] h-[77px] mt-[30px] bg-circle-bg rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25),0px_-5px_4px_rgba(255,255,255,0.25)] flex justify-center items-center">
                <Image width={53} height={53} alt="shild" src="/Shield.png"/>
            </div>
            <h1 className="w-[282px] font-inter text-black font-bold mt-[28px] text-[28px] text-center">Non-contact Deliveries</h1>
            <p className="mt-[15px] w-[276px] text-center text-gray-400">Search icons by name or scroll through the entire list.</p>
        </div>
    )
}

///* Ellipse 1 */box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px -5px 4px rgba(255, 255, 255, 0.25);

/* Non-contact Deliveries */
/*
position: absolute;
width: 282px;
height: 70px;
left: 55px;
top: 571px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 28px;
line-height: 34px;
text-align: center;

color: #000000;

*/