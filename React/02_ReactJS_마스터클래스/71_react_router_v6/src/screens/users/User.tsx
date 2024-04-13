import { useParams, Outlet, Link } from 'react-router-dom';
import { users } from '../../db';

function User(){
    const {userId} = useParams();
    return (
        <div>
            <h1>
                User with it {userId} is named: {users[Number(userId)-1].name}
            </h1>
            <hr />
            <Link to="followers">See Followers</Link>
            <Outlet 
                context={{
                    nameOfMyuser: users[Number(userId)-1].name,
                }}
            /> 
        </div>

    );
}

export default User;