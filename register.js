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

      // Firestore-ல் பதிவு
      const docRef = await addDoc(collection(db, "members"), {

        memberNo: memberNo,
        name: document.getElementById("name").value.trim(),
        dob: document.getElementById("dob").value,
        mobile: document.getElementById("mobile").value.trim(),
        address: document.getElementById("address").
