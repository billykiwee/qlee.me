import { useState, useEffect } from "react";
import { db } from "../../../App/database/firebase";
import { useStateValue } from "../../../App/provider/StateProvider";

export function useFetchLinks() {
  const [{ user }] = useStateValue();

  const [links, setLinks] = useState([]);

  useEffect(
    (e) => {
      if (!user) return;

      try {
        db.collection("links").onSnapshot((snapshot) => {
          const fetchedLinks = snapshot.docs.map((doc) => doc.data());

          const userLinks = fetchedLinks.filter((e) => e.user === user.email);

          if (!userLinks.length) setLinks("no_data");
          else setLinks(userLinks);
        });
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  return links;
}

export function useFetchUsersLink_in_bio(user) {
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    const data = db
      .collection("links")
      .where("linkInBio", "==", true)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setLinksData("no_data");
        }

        const fetchedLinks = snapshot.docs.map((doc) => doc.data());

        setLinksData(fetchedLinks);
      });

    return () => data();
  }, [user]);

  return linksData;
}

export function useFetchUsersLink_in_bio_Settings(user) {
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    const data = db
      .collection("link-in-bio")
      .where("user", "==", user?.email)
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setLinksData("no_data");
        }

        const fetchedLinks = snapshot.docs.map((doc) => doc.data());

        setLinksData(fetchedLinks);
      });

    return () => data();
  }, [user]);

  return linksData;
}

/* export function useFetchLinks(user, type) {

    const [linksData, setLinksData] = useState('')

    useEffect(() => {

        const data = query(user, type).onSnapshot(snapshot => {
            if (snapshot.empty) {
                setLinksData("no links")
            }
    
            const fetchedLinks = snapshot.docs.map(doc => doc.data())
    
            setLinksData(fetchedLinks.sort((x, y) => x.date - y.date))

            console.log(fetchedLinks);
        })
    
        return () => data()

    }, [user, type])
  
    return linksData
}


const query = (user, type) => {

    if (user && type === "link-in-bio") {
        return db.collection("links").where("linkInBio", "==", true)
    }

    if (user && type === "link-in-bio_settings") {
        return db.collection("link-in-bio").where("user", "==", user?.email)
    }

    if (type === "stats") {
        return db.collection("stats")
    }
    
    if (user) {
        return db.collection("links").where("user", "==", user?.email)
    }

    return db.collection("links").orderBy("date", "desc")
}
 */
