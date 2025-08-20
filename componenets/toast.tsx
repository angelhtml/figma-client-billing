import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Toast(){
    return(
        <div className="flex items-center w-[300px] bg-primery5 rounded-[4px]">
            <Image className="ml-[21px]" width={30} height={30} src="/confirm.png" alt="confirm"/>
            <div className="flex flex-col gap-1 py-[11.5px] pl-[13px] pr-[21px]">
                <p className="text-[13px] font-blod">Stripe account connected successfully!</p>
                <span className="text-tiny text-[9px]">A SECOND AGO</span>
            </div>
        </div>
    )
}