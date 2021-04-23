import { createContext, useEffect, useState } from "react";

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
  registerNewProfile: (userName: string, password: string, role:string,name:string) => void;
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
}

function ProfileProvider(props: Props) {
  const [profiles, setProfiles] = useState([] as Profile[]);
  const url = "http://localhost:6969";

  async function registerNewProfile(userName: string, password: string, role:string,name:string){
    const body = {
        userName: userName,
        password: password,
        role: role,
        name: name,
    };

    makeRequest(`${url}/api/profiles/`, "POST", body); 
}

  async function deleteProfile(id: string) {
    makeRequest(`${url}/api/profiles/${id}`, "DELETE");
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
