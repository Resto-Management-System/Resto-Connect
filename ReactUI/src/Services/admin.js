import axios from "axios";
import { baseUrl } from "./apiconfig";

// // Fetch admin dashboard stats
// export async function fetchAdminStats() {
//   const url = `${baseUrl}/admin`;

//   try {
//     const resp = await axios.get(url); // Simple GET
//     if (resp.status !== 200) {
//       throw new Error("Failed to fetch dashboard stats");
//     }

//     const result = resp.data;
//     if (result.status !== "success") {
//       throw new Error(result.message || "API returned an error");
//     }

//     return result.data; // { total, active, pending, blocked }
//   } catch (err) {
//     console.error("Admin stats fetch error:", err);
//     throw err;
//   }
// }


export async function adminSignUp(adminData) {
  const url = `${baseUrl}/admin/signup`;

  try {
      const resp = await axios.post(url, adminData);

      if (resp.status !== 200)
          throw new Error("Axios API call failed with status " + resp.status);

      const result = resp.data;

      if (result.status !== "success")
          throw new Error(result.message || "API returned an error");

      return result.data;
  } catch (err) {
      console.error("Admin sign-up error:", err);
      throw err;
  }
}