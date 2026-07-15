import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("memberForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      // உறுப்பினர் எண்ணை உருவாக்குதல்
      const snapshot = await getDocs(collection(db, "members"));

      const memberNo =
        "TMS-2026-" +
        String(snapshot.size + 1).padStart(4, "0");

      // Firestore-ல் பதிவு சேமித்தல்
      const docRef = await addDoc(collection(db, "members"), {

        memberNo: memberNo,
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
        designation: document.getElementById("designation").value,
        createdAt: new Date()

      });

      // வெற்றி செய்தி
      alert(
  "பதிவு வெற்றிகரமாக முடிந்தது.\n\n" +
  "உறுப்பினர் எண்: " + memberNo
);

const url = "idcard.html?id=" + docRef.id;
alert(url);

window.location.href = url;

    } catch (error) {

      console.error(error);

      alert("பிழை ஏற்பட்டுள்ளது.\n\n" + error.message);

    }

  });

});
