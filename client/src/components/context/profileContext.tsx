import { createContext, useEffect, useState } from "react";
import { Session } from "../../App";

export interface Profile {
  _id: string;
  userName: string;
  password: string;
  likes: number;
  role: string;
  name: string;
  _v: number;
}

interface State {
  profiles: Profile[];
  registerNewProfile: (body: object) => void;
  deleteProfile: (id: string) => void;
  editProfile: (id: string) => void;
}

export const ProfileContext = createContext<State>({
  profiles: [],
  registerNewProfile: () => {},
  deleteProfile: () => {},
  editProfile: () => {},
});

interface Props {
  children: Object;
  session: Session;
}

function ProfileProvider(props: Props) {
  const [profiles, setProfiles] = useState([] as Profile[]);
  const url = "http://localhost:6969";

  async function registerNewProfile(body: object){
    await makeRequest(`${url}/api/profiles/`, "POST", body); 
}

  async function deleteProfile(id: string) {
    const deleteProfile = await makeRequest(`${url}/api/profiles/${id}`, "DELETE");
    const filteredArray = profiles.filter((p: { _id: string; }) => p._id !== id);
    if(props.session.userName === undefined){
      props.session.userName = "";
    } if(props.session.role === "admin" || props.session.userName === deleteProfile.userName){
      setProfiles(filteredArray);
    }
  }

  async function editProfile() {}

  useEffect(() => {
    const loadProfiles= async () => {
      const allProfiles = await makeRequest(`${url}/api/profiles`, "GET");
      setProfiles(allProfiles);
    };
    loadProfiles();
  }, []);

  async function makeRequest(url: RequestInfo, method: any, body?: any) {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  }

  return (
    
    <ProfileContext.Provider
      value={{
        profiles: profiles,
        registerNewProfile: registerNewProfile,
        deleteProfile: deleteProfile,
        editProfile: editProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
}

export const ProfileConsumer = ProfileContext.Consumer;
export default ProfileProvider;
