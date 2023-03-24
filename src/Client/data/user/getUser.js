import { useState, useEffect } from "react";
import { db } from "../../../App/database/firebase";

export function useGetUser(userEmail) {
  const [User, setUser] = useState([]);

  useEffect(
    (e) => {
      const data = db.collection("users").onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setUser("no user");
        }

        const fetchedLinks = snapshot.docs.map((doc) => doc.data());

        const user = fetchedLinks.filter((e) => e.email === userEmail)[0];

        setUser(user);
      });

      return () => data();
    },
    [userEmail]
  );

  return User;
}
