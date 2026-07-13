import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("memberForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const members = await getDocs(collection(db, "members"));

    const memberNo =
      "TMS-2026-" + String(members.size + 1).padStart(4, "0");

    await addDoc(collection(db, "members"), {
      memberNo,
      name: document.getElementById("name").value,
      dob: document.getElementById("dob").value,
      mobile: document.getElementById("mobile").value,
      address: document.getElementById("address").value,
      designation: document.getElementById("designation").value,
      createdAt: new Date()
    });

    alert("பதிவு வெற்றிகரமாக முடிந்தது.\nஉறுப்பினர் எண்: " + memberNo);
    form.reset();

  } catch (error) {
    alert("பிழை: " + error.message);
    console.error(error);
  }
});
