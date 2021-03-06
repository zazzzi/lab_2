import { createContext, useEffect, useState } from "react";
import { Session } from "../../App";
export interface Profile {
  _id: string;
  userName: string;
  password: string;
  likes: number;
  role: string;
  name: string;
}

interface State {
  profiles: Profile[];
  registerNewProfile: (body: object) => any;
  deleteProfile: (id: string) => void;
  editProfile: (id: string, content: object) => void;
  errorMessage: string;
}

export const ProfileContext = createContext<State>({
  profiles: [],
  registerNewProfile: () => {},
  deleteProfile: () => {},
  editProfile: () => {},
  errorMessage: "",
});

interface Props {
  children: Object;
  session: Session;
}

function ProfileProvider(props: Props) {
  const [profiles, setProfiles] = useState([] as Profile[]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  async function registerNewProfile(body: object) {
    setErrorMessage("");
    const profile = await makeRequest(`/api/profiles/`, "POST", body);
   
    
    if (profile === "Username already in use.") {
      setErrorMessage(profile);      
      return true;
    } else if (props.session.role === "admin" || props.session.role === "plebian") {
      const newProfile = [...profiles, profile];
      setProfiles(newProfile);
      return false;
    } 
    return false;
  }

  async function deleteProfile(id: string) {
    const deleteProfile = await makeRequest(`/api/profiles/${id}`, "DELETE");
    const filteredArray = profiles.filter((p: { _id: string }) => p._id !== id);
    if (props.session.userName === undefined) {
      props.session.userName = "";
    }
    if (
      props.session.role === "admin" ||
      props.session.userName === deleteProfile.userName
    ) {
      setProfiles(filteredArray);
    }
  }

  async function editProfile(id: string, content: any) {
    const profile = profiles.find((p: { _id: string }) => p._id === id);
    const body = content.password
      ? {
          userName: content.userName ? content.userName : profile?.userName,
          name: content.name ? content.name : profile?.name,
          role: content.role ? content.role : profile?.role,
          password: content.password,
        }
      : {
          userName: content.userName ? content.userName : profile?.userName,
          name: content.name ? content.name : profile?.name,
          role: content.role ? content.role : profile?.role,
        };
    const updatedPost = await makeRequest(`/api/profiles/${id}`, "PUT", body);
    if (!props.session.userName) {
      props.session.userName = "";
    }
    if (props.session.role === "admin") {
      setProfiles((prev: Profile[]) => {
        return prev.map((p: Profile) =>
          p.userName === profile!.userName
            ? {
                ...p,
                userName: body.userName,
                password: body.password,
                name: body.name,
                role: body.role,
              }
            : p
        );
      });
    }
    return updatedPost;
  }

  useEffect(() => {
    const loadProfiles = async () => {
      const allProfiles = await makeRequest(`/api/profiles`, "GET");
      setProfiles(allProfiles);
    };
    loadProfiles();
  }, []);

  async function makeRequest(url: RequestInfo, method: string, body?: object) {
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
        errorMessage: errorMessage
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
}

export const ProfileConsumer = ProfileContext.Consumer;
export default ProfileProvider;
