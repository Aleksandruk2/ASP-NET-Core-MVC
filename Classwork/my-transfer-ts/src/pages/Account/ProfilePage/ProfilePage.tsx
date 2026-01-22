import {useAuth} from "../../../hooks/useAuth.ts";

const ProfilePage = () => {
    const {user} = useAuth();
    return (
        <>
            <div className="flex justify-center items-center relative pt-10">
                <div className="font-medium dark:text-gray-200 text-gray-800 w-100">
                    <div className="overflow-hidden w-20 h-20 rounded-full flex justify-center items-center">
                        <img src={user?.image} alt={user?.image} className="h-full object-cover"></img>
                    </div>
                    <div>
                        <div className="border-b border-gray-300 py-2">
                            <h1>{user?.firstName} {user?.lastName}</h1>
                        </div>
                        <div className="dark:text-gray-400 text-gray-600 py-2">
                            {user?.email}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;