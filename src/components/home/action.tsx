import ActionCard from "./action-card"

const data=[
    {img:"https://img.freepik.com/premium-photo/intense-gym-workout-determined-athlete-action_96318-151455.jpg",name:"Fitness"},
    {img:"https://www.vedantu.com/seo/content-images/76de7a0d-03c5-40e3-af09-ab75d118e0f5_Mental_health.png",name:"Health"},
    {img:"https://www.statnews.com/wp-content/uploads/2016/10/AP58865054-1-645x645.jpg",name:"Emotion"},
    {img:"https://media.istockphoto.com/id/1354885010/photo/shot-of-a-young-couple-dancing-together-in-their-kitchen.jpg?s=612x612&w=0&k=20&c=vbqAVyRKxhU6HuMKDSpxnnOmdFPJzUajeK9bcKzWTdw=",name:"Lifestyle"},
]

const Action=()=>{
    return(
        <div className="my-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 container gap-y-14 xl:gay-y-0 gap-6 px-4 justify-center items-center">
            {data.map((item:any,index:number)=>(
                <ActionCard img={item.img} name={item.name} index={index} key={index}/>
            ))}
        </div>
        </div>
    )
}


export default Action