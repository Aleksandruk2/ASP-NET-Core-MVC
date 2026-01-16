import {useAuth} from "../../../hooks/useAuth.ts";

const ProfilePage = () => {
    const {user} = useAuth();
    return (
        <>
            <div className="flex justify-center items-center relative pt-10">
                <div className="font-medium text-gray-200 w-100">
                    <div className="overflow-hidden">
                        <img src={user?.image} alt={user?.image} width="100" className="rounded-full"></img>
                    </div>
                    <div>
                        <div className="border-b border-gray-300 py-2">
                            <h1>{user?.firstName} {user?.lastName}</h1>
                        </div>
                        <div className="text-gray-400 py-2">
                            {user?.email}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;