import { useOutletContext } from 'react-router-dom';

interface IFollowersContex {
    nameOfMyuser:string;
}

function Followers(){
    const {nameOfMyuser} = useOutletContext<IFollowersContex>();
    console.log(nameOfMyuser);
    return <h1>Here are Followers of {nameOfMyuser}</h1>
}

export default Followers;