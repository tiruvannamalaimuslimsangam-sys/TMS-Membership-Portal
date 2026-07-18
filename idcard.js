
import { db } from "./firebase-config.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const memberId = params.get("id");

if (!memberId) {
  alert("உறுப்பினர் ID கிடைக்கவில்லை.");
  throw new Error("Member ID missing");
}

async function loadMember() {

  try {

    const docRef = doc(db, "members", memberId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("உறுப்பினர் விவரம் கிடைக்கவில்லை.");
      return;
    }

    const data = docSnap.data();

    document.getElementById("memberNo").textContent =
      data.memberNo || "";

    document.getElementById("memberName").textContent =
      data.name || "";

    document.getElementById("memberMobile").textContent =
      data.mobile || "";

    document.getElementById("memberAddress").textContent =
      data.address || "";

    if (data.designation && data.designation.trim() !== "") {

      document.getElementById("memberDesignation").textContent =
        data.designation;

      document.getElementById("designationBox").style.display =
        "block";

    } else {

      document.getElementById("designationBox").style.display =
        "none";

    }

    if (data.photo) {

      document.getElementById("memberPhoto").src =
        data.photo;

    } else {

      document.getElementById("memberPhoto").src =
        "images/user.png";

    }

  } catch (error) {

    console.error(error);

    alert("பிழை : " + error.message);

  }

}

loadMember();
