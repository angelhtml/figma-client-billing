"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Toast from "./toast";
import Select from "./select";

interface data {
    title : String,
    des: String,
    handel: Function
}

export default function Form(props: data){
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [step, setStep] = useState<number>(1)
    const [showTost, setShowToast] = useState<boolean>(false)
    const [accept, setAccept] = useState<boolean>(false)
    const [width, setWidth] = useState(0);

     useEffect(() => {
        // This code runs only on the client-side after mounting
        setWidth(window.innerWidth);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    // popup variant animation
    const variant = {
        open: {opacity:1,scale:1,translateY:"0rem"},
        closed: {opacity:0,scale:.6,translateY:"-20rem"}
    }

    // container variant animation
    const variant2 = {
        open: {translateY:"30px",opacity:1},
        closed: {translateY: width >= 1200 ? "-100px" : "-250px",opacity:1}
    }

    // pgae 2 (step 2) transation variant
    const page2_var = {
        open : {translateX:"-700px",opacity:0},
        closed: {translateX:0,opacity:1}
    }
    // pgae 3 (step 3) transation variant
    const page3_var = {
        open : {translateX:0,opacity:1},
        closed: {translateX:"700px",opacity:0}
    }

    // toast variant animation
    const toast_var = {
        open: {translateX:"30px",translateY:"-330px"},
        closed: {translateX:"-3000px",translateY:"-330px"},
    }

    // step navbar variant
    const nav_var = {
        open: {opacity: 1,translateX:0},
        closed: {opacity: 0,translateX:"-2000px"}
    }

    // navbar config in step 3 variant
    const conf_var = {
        open: {opacity: 1,translateX:0},
        closed: {opacity: 0,translateX:"-2000px"}
    }

    // get started button
    const GetStarted = () => {
        setStep(2)
        setShowToast(true)

        // timer to hide the toast
        setTimeout(() => {
            setShowToast(false)
        }, 1000 * 4);
        
    }

    // finish setup button
    const FinishSetup = () => {
        if(accept){
            setStep(3)
            // step will go to 4
            Process()
        }
    }

    // process (5 sec loading screen show in step 3 and then it will go to the step 4)
    function Process() : void {
        setTimeout(() => {
            setStep(4)
        }, 1000 * 5);
    }

    return(
        <div>
            {/* Title */}
            <div className="w-[80%] flex flex-col border-b-1 border-gray-200 mx-auto mt-[45px]
            xl:flex-row xl:h-[54px] xl:w-[58.33%]">

                <div className="py-5 text-[18px] font-strong
                xl:flex xl:gap-4 xl:py-0">
                    <b>{props.title} </b>
                    <p className="font-blod text-[18px] space-[.29px] text-grey">{props.des}</p>
                </div>

                <button className="flex flex-1 items-start gap-[5px] m-[4px]
                xl:justify-end" onClick={() => props.handel("hi")}>
                    <p className="leading-[17px] text-[13px] font-blod">Docs</p>
                    <img width={16} height={16} alt="doc" src="/doc.png"/>
                </button>
            </div>

            {/* popup */}
            <AnimatePresence>
                 <motion.div 
                initial={{opacity:0,scale:.6,translateY:"-20rem"}} 
                animate={isOpen ? "open" : "closed"} 
                variants={variant} 
                transition={{duration:1, delay:isOpen ? 1 : 0, type:"spring"}}
                className="bg-normalblue w-[80%] mx-auto mt-[30px] flex flex-col gap-[30px] rounded-[16px] py-[16px] px-[8px] items-center
                xl:flex-row xl:h-[101px] xl:w-[58.33%]">
                    <img width={61} height={61} alt="doc" src="/Large.png" className="ml-[25px]"/>
                    <div className="flex flex-col px-8
                    xl:p-0 xl:gap-[5px]">
                        <h3 className="text-[18px] font-bold">Upgrade to pay 0% transaction fee</h3>
                        <p className="text-primery2 text-[15px]">Pay 0% transaction fee and get added benefits by upgrading your account.</p>
                    </div>
                    <div className="flex flex-1 justify-end items-center 
                    xl:m-[30px]">
                        <button onClick={() => setIsOpen(!isOpen)} className="h-[40px] bg-sea px-[25px] rounded-[4px] text-white cursor-pointer">Upgrade</button>
                    </div>
                </motion.div>
            </AnimatePresence>


            {/* container */}
            <AnimatePresence>
            <motion.div 
            initial={{opacity:0,translateY:"30px"}} 
            animate={isOpen ? "open" : "closed"} 
            variants={variant2} 
            transition={{duration:1}}
            style={{backgroundColor: step == 3 ? "#F2F2F2" : "white"}}
            className="w-[80%] mx-auto p-[30px] rounded-[15px] mb-[145px] overflow-x-hidden
            xl:w-[58.33%]">
                {/* page title (it'll be hide in steap 3) */}
                <AnimatePresence>
                    <motion.div style={{display: step == 3 ? "none" : "flex"}} variants={conf_var} animate={step == 3 ? "closed" : "open"} transition={{duration:1,type:"spring"}} className="justify-between mb-[30px]">
                        <p className="font-bold text-[15px] leading-[.26px]">Getting Started</p>
                        {/* pages number (it doesnot show in step 3)*/}
                        <div className="flex">
                            <p className="text-[13px] font-bold leading-[.26px]">Step {step > 2 ? "2" : String(step)} 0f 2</p>
                            <div style={{background: step == 1 ? "#333333" : "#aaaaaa"}} className="w-1 h-1 rounded-full ml-[15px]"></div>
                            <div style={{background: step == 2 || step == 3 || step == 4 ? "#333333" : "#aaaaaa"}} className="w-1 h-1 rounded-full ml-[10px]"></div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                {/* page title for step 4 */}
                <AnimatePresence>
                    <motion.div style={{display: step == 3 ? "flex" : "none"}} variants={nav_var} animate={step == 3 ? "open" : "closed"} transition={{duration:1,type:"spring"}}  className="flex xl:flex-row flex-col items-center xl:items-start gap-4 xl:gap-0 justify-between mb-[30px]">
                        <div className="flex xl:flex-row flex-col items-center xl:items-start gap-4">
                            <button className="text-blod text-[13px] text-tiny cursor-pointer flex items-center gap-[4px]">
                                Overview
                            </button>
                            <button className="text-blod text-[13px] text-tiny cursor-pointer flex items-center gap-[4px]">
                                <img width={16} height={16} alt="logo" src="/clients.png"/>Clients
                            </button>
                            <button className="text-blod text-[13px] text-tiny cursor-pointer flex items-center gap-[4px]">
                                <img width={10} height={10} alt="logo" src="/products.png"/>Products & Services
                            </button>
                            <button className="text-blod text-[13px] text-tiny cursor-pointer flex items-center gap-[4px]">
                                <img width={16} height={16} alt="logo" src="/invo.png"/>Invoices
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-blod text-[13px] cursor-pointer flex items-center gap-[4px] bg-primery5 rounded-[4px] px-[10px] py-[7px]">
                                <img width={16} height={16} alt="logo" src="/config.png"/>Configure
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
                 
                 {/* page */}
                 <div className="overflow-x-hidden bg-primery4 rounded-[4px]">
                    {/* step 1 */}
                    <AnimatePresence>
                        <motion.div 
                        initial={"closed"}
                        variants={page2_var}
                        animate={step == 2 ? "open" : "closed"} 
                        transition={{duration:1, type:"spring"}}
                        className="mx-auto flex flex-col items-center"
                        style={{display:step == 1 ? "flex" : "none"}}
                        >
                        <img className="mt-[80px]" width={150} height={150} alt="logo" src="/Products Copy.png"/>
                        <p className="font-bold text-2xl leadinf-[.26px] mt-[30px]">Connect Stripe Account</p>
                        <p className="w-[80%] xl:w-[52.52%] text-center text-[15px] text-tiny mt-[10px]">Client Billing requires a free Stripe account, connect your existing account or create a new one to get started.</p>
                        <div className="w-[95%] xl:w-[40.4%] bg-white rounded-[10px] mt-[20px]">
                            <div className="flex flex-row justify-between mx-[30px] my-[15px] font-black text-[18px]">
                                <p>Transaction Fee</p>
                                <p>5%</p>
                            </div>
                        </div>
                        <button onClick={GetStarted} className="bg-sea rounded-[4px] py-[12.5px] px-[65px] mt-[30px] text-white text-[13px] font-bold cursor-pointer">Get Started</button>
                        <button className="text-sea mt-[20px] text-[13px] flex items-center gap-[5px] mb-[60px] cursor-pointer">Find out more about Client Billing
                            <img width={16} height={16} src="/doc-blue.png" alt="doc"/>
                        </button>
                        </motion.div>
                    </AnimatePresence>

                    {/* step 2 */}
                    <AnimatePresence>
                        {step == 2 &&
                        <motion.div 
                        initial={"closed"}
                        variants={page3_var}
                        animate={step == 2 ? "open" : "closed"} 
                        transition={{duration:1, type:"spring"}}
                        className="p-4 xl:p-0"
                        >
                            <button onClick={() => {setStep(1); setAccept(false)}} className="flex items-center gap-[8px] m-[30px] cursor-pointer">
                                <img width={25} height={25} src="/Back Icon.png" alt='back_icon'/>
                                <p className="text-tiny text-[13px]">Back</p>
                            </button>
                            <div className="flex flex-col items-center">
                                <h1 className="text-[24px] font-bold">Choose Billing Currency</h1>
                                <p className="text-[15px] text-tiny mt-[10px]">Select the currency you want to use to bill your clients.</p>
                                {/* warning */}
                                <div className="w-[100%] xl:w-[60.6%] flex justify-center items-start py-[15px] px-[20px] bg-primery6 mt-[30px] rounded-[4px]">
                                    <img width={16} height={15} src="/warning.png" alt='warning'/>
                                    <p className="text-[13px] ml-[5px]">Note: Billing currency cannot be changed in the future. Please make sure you select the correct currency.</p>
                                </div>
                                <div className="mt-[20px]"></div>
                                {/* select option */}
                                <Select list={["USD - United States Dollars","EUR - Euro Europe"]} selected={(i : String) => console.log(i)}/>
                                <div className="mt-[40px] flex items-center">
                                    <input onClick={(i) => setAccept(!accept)} className="w-[1rem] h-[1rem]" type="checkbox"/>
                                    <p className="text-blod text-[15px] ml-[10px]">I am aware that I cannot change currency later</p>
                                </div>
                                <button onClick={FinishSetup} style={accept ? {background:"#286EF1",color:"white",cursor:"pointer"} : {background:"transparent",color:"#6B6B6B",cursor:"not-allowed"}} className="text-[13px] text-primery7 tetx-blod mt-[20px] mb-[80px] py-[14px] px-[25px] rounded-[4px] border-[1px] border-primery5">Finish Setup</button>
                            </div>
                        </motion.div>
                        }
                    </AnimatePresence>

                    {/* step 3 */}
                    <AnimatePresence>
                        {step == 3 &&
                        <motion.div 
                        initial={"closed"}
                        variants={page3_var}
                        animate={step == 3 ? "open" : "closed"} 
                        transition={{duration:1, type:"spring"}}
                        className="flex flex-col items-center mt-[178px] px-10 xl:p-0"
                        >
                            <img className={"loading"} width={44} height={44} src="/Loading.png" alt="loading"/>
                            <h1 className="text-[24px] font-bold mt-[30px]">Importing Stripe Configurations</h1>
                            <p className="text-[15px] text-tiny mt-[10px] mb-[178px]">Please wait while we are importing your Stripe configurations. It will only take a few seconds…</p>
                        </motion.div>
                        }
                    </AnimatePresence>

                    {/* step 4 */}
                    <AnimatePresence>
                        {step == 4 &&
                        <motion.div 
                        initial={"closed"}
                        variants={page3_var}
                        animate={step == 4 ? "open" : "closed"} 
                        transition={{duration:1, type:"spring"}}
                        className="flex flex-col items-center"
                        >
                            <img className="mt-[80px]" width={150} height={150} alt="logo" src="/Products Copy.png"/>
                            <p className="font-bold text-2xl leadinf-[.26px] mt-[30px] xl:px-0 px-4">Connect Stripe Account</p>
                            <div className="w-[90%] xl:w-[50.5%] flex justify-between my-[30px] rounded-[10px] bg-white">
                                <div className="flex flex-col py-[15px] pl-[30px]">
                                    <p className="text-[15px] font-bold">name Stripe Account</p>
                                    <p className="text-[13px] text-tiny">email</p>
                                </div>
                                <div className="flex items-center mr-[30px] gap-[10px]">
                                    <p className="text-[15px] font-blod">Connected </p>
                                     <img width={18} height={18} src="/circle_confirm.png" alt='confirm'/>
                                </div>
                            </div>
                            <button className="bg-sea rounded-[4px] py-[12.5px] px-[47.5px] mt-[42.5px] mb-[80px] text-white text-[13px] font-bold cursor-pointer">Continue</button>
                        </motion.div>}
                    </AnimatePresence>
                    
                 </div>
                  
                
            </motion.div>
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                <motion.div className="absolute" initial={{translateX:"-3000px",translateY:"-330px"}} animate={showTost ? "open" : "closed"} variants={toast_var} transition={{duration:2}}>
                    <Toast />
                </motion.div>
            </AnimatePresence>
            

        </div>
    )
}