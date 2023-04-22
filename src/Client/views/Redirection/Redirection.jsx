import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../App/database/firebase";
import Messages from "../../../App/utils/Messages";
import { serverTimestamp } from "firebase/firestore";
import { getDevice } from "./functions/getDevice";
import { getLink } from "./functions/getLink";
import { getAdress } from "./functions/getAdress";
import Main from "../../../App/components/Main";

export default function Redirection() {
  const { LinkID } = useParams();

  const startLoading = performance.now();
  const statID = "s-" + new Date().getTime();

  const createStat = async () => {
    try {
      const link = await getLink(LinkID);

      const adress = await getAdress();

      if (Object.values(link).length) {
        const stat = {
          LinkID,
          statID,
          adress,
          reference: document.referrer ?? null,
          device: getDevice(),
          performance: performance.now() - startLoading,
          date: serverTimestamp(),
        };

        db.collection("stats").doc(statID).set(stat);

        db.collection("links")
          .doc(LinkID)
          .update({ views: link.views + 1 });

        window.location = link.url;
      }
    } catch (err) {
      console.log(err);
      window.location = "/page404";
    }
  };

  useEffect(() => {
    createStat();
  }, []);

  return (
    <Main className="p-0 display justify-c">
      <Messages loader={true} />
    </Main>
  );
}
