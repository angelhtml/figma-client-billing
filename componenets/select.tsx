"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface data {
    list: String[],
    selected: Function
}

export default function Select(props: data){
    const [open, setOpen] = useState<Boolean>(false)
    const [selected, setSelected] = useState<String>(props.list[0])

    const options_variant = {
        open: {opacity:1},
        closed: {opacity:0}
    }
    return(
        <div className="w-[100%] xl:w-[36.26%]">
            {/* select button */}
            <button onClick={() => setOpen(!open)} className="bg-white w-[100%] flex items-center justify-between cursor-pointer border-[1px] border-primery5 rounded-[4px]">
                <p className="py-[10px] pl-[15px] text-[15px]">{selected}</p>
                <motion.div initial={{rotateX:0}} animate={{rotateX: open ? 180 : 0}}>
                    <img className="mr-[14px]" width={14} height={14} src="/Down.png" alt="icon"/>
                </motion.div>
                
            </button>

            {/* select options */}
            <motion.div 
            variants={options_variant}
            animate={open ? "open" : "closed"}
            style={{display: open ? "flex" : "none"}}
            className="w-[100%] relative z-10 flex flex-col bg-white border-[1px] border-primery5 rounded-[4px]">
                {props.list.map((item : String) => 
                    <button onClick={() => {setSelected(item); setOpen(false); props.selected(item)}} className="py-[10px] px-[15px] text-[15px] cursor-pointer hover:bg-blue-500 hover:text-white" key={props.list.indexOf(item)}>{item}</button>)
                }
            </motion.div>
        </div>
    )
}