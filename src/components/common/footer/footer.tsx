"use client"
import { useState } from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface ListItem {
  title: string;
  listItems: string[];
}

const FooterDataItems=[
  {title:"ABOUT", listItems:["Our Blog", "Press"]},
  {title:"TEAMS", listItems:["My Account", "Payment"]},
  {title:"OTHERS", listItems:["Support", "Tutorial"]},
  {title:"CONTACT", listItems:["vfit699@gmail.com", "+069 999 7378"]},
]

const Footer = () => {
  return (
    <footer className="page-footer py-8">
      <div className="border-b-2 border-gray-300">
        <div className="grid sm:grid-cols-2 grid-cols-1 container">
          <div className="flex gap-8 py-6 items-start lg:items-center flex-col lg:flex-row">
            <div>
              <h3 className="text-white font-bold text-lg">STAY CONNECTED</h3>
              <h3 className="text-white font-bold text-lg">WITH US</h3>
            </div>
            <div className="flex gap-4">
              <FaSquareInstagram color="white" size={30} />
              <FaSquareXTwitter color="white" size={30} />
              <FaSquareFacebook color="white" size={30} />
              <FaSquareYoutube color="white" size={30} />
            </div>
          </div>
          <div className="sm:border-l-2 border-gray-300 py-6 gap-8 flex items-start sm:items-end lg:items-center justify-end flex-col lg:flex-row">
            <div>
              <h3 className="text-white font-bold text-lg text-left sm:text-right lg:text-left">
                JOIN
              </h3>
              <h3 className="text-white font-bold text-lg">NEWSLETTER</h3>
            </div>
            <div className="flex border-2 border-gray-300 rounded-lg p-1 h-16">
              <input
                placeholder="Your e-mail"
                className="outline-none p-2  bg-transparent w-40 text-white"
              />
              <button className="px-4 text-black bg-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 py-20">
        <div className="container grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-6 md:gap-0 md:grid-cols-5">
          <div className="hidden md:flex justify-start items-start flex-col">
            <GiMuscleUp size={80} color="white" />
          </div>
          {
            FooterDataItems.map((item:ListItem, index:number)=>(
              
                <FooterListItem FooterData={item} key={index}/>
     
            ))
          }
        </div>
      </div>
      <div className="py-4 ">
        <div className="container flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <h3 className="text-white text-center text-sm">
            © 2024 Wardo Ventures | All Rights Reserved
          </h3>

          <div className="flex gap-2">
            <img src="/img/stock/visa.svg" alt="visa" className="w-12" />
            <img
              src="/img/stock/a-express.svg"
              alt="a-express"
              className="w-12"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterListItemMobile = ({ FooterData }: { FooterData: ListItem }) => {
  const [isOpen,setIsOpen]=useState<boolean>(false);
  return (
    <div>
    <ul className="text-white flex flex-col gap-4 xs:hidden list-none">
      <li className="text-lg font-bold xs:underline underline-offset-4 flex items-center justify-between" key="footer-title">
        {FooterData.title}
        {
          isOpen?
          <IoIosArrowUp className="block xs:hidden" onClick={()=>{setIsOpen(!isOpen)}}/>
          :
          <IoIosArrowDown className="block xs:hidden" onClick={()=>{setIsOpen(!isOpen)}}/>
        }
      </li>
      {isOpen &&
        FooterData.listItems.map((item:string, index)=>(
          <li className="text-sm" key={index}>
            {item}
          </li>
        ))
      }
    </ul>
    <div className="w-full h-0.5 bg-white block xs:hidden mt-2"></div>
    </div>
  );
};

const FooterListItemDesktop = ({ FooterData }: { FooterData: ListItem }) => {
  return (
    <div>
    <ul className="text-white flex flex-col gap-4 list-none">
      <li className="text-lg font-bold underline underline-offset-4 flex items-center justify-between" key="title">
        {FooterData.title}
      </li>
      {
        FooterData.listItems.map((item:string, index)=>(
          <li className="text-sm" key={index}>
            {item}
          </li>
        ))
      }
    </ul>
    <div className="w-full h-0.5 bg-white block xs:hidden mt-2"></div>
    </div>
  );
};

const FooterListItem=({ FooterData }: { FooterData: ListItem })=>{
  return(
    <div>
    <div className="block xs:hidden">
      <FooterListItemMobile FooterData={FooterData} key="footer-item-mobile"/>
    </div>
    <div className="hidden xs:block">
    <FooterListItemDesktop FooterData={FooterData} key="footer-item-desktop"/>
    </div>
    </div>
  )
}