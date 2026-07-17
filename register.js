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

      // Photo-வை Base64 ஆக மாற்றுதல்
      const photoInput = document.getElementById("photo");

      let photo = "";

      if (photoInput.files.length > 0) {

        photo = await new Promise((resolve) => {

          const reader = new FileReader();

          reader.onload = (e) => resolve(e.target.result);

          reader.readAsDataURL(photoInput.files[0]);

        });

      }
            // Firestore-ல் உறுப்பினர் விவரங்களை சேமித்தல்
      const docRef = await addDoc(collection(db, "members"), {

        memberNo: memberNo,
        name: document.getElementById("name").value.trim(),
        dob: document.getElementById("dob").value,
        mobile: document.getElementById("mobile").value.trim(),
        address: document.getElementById("address").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        photo: photo,
        createdAt: new Date()

      });
            // பதிவு வெற்றி
      alert("உறுப்பினர் பதிவு வெற்றிகரமாக முடிந்தது!");

      // ID Card பக்கத்திற்கு செல்ல
      window.location.href =
        "idcard.html?id=" + docRef.id;

    } catch (error) {

      console.error(error);

      alert("பதிவு செய்யும்போது பிழை ஏற்பட்டது!");

    }

  });

});
