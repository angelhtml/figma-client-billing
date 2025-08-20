"use client"

import Navbar from "../../componenets/nvabar";
import Form from "../../componenets/form";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Form title="Client Billing" des=" –&nbsp;  A full payment solution for your business, free with company" handel={(i:string) => console.log(i)}/>
    </div>
  );
}
