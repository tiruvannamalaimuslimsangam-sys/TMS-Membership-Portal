
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

    const designationRow = document.getElementById("designationBox");

    if (data.designation && data.designation.trim() !== "") {

      document.getElementById("memberDesignation").textContent =
        data.designation;

      designationRow.style.display = "table-row";

    } else {

      designationRow.style.display = "none";

    }

    const photo = document.getElementById("memberPhoto");

    if (data.photo && data.photo !== "") {

      photo.src = data.photo;

    } else {

      photo.src = "images/user.png";

    }

    document.title =
      data.name + " - உறுப்பினர் அடையாள அட்டை";

  } catch (error) {

    console.error(error);

    alert("பிழை : " + error.message);

  }

}

loadMember();
