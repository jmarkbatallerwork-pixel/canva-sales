import { supabase } from "./supabaseClient.js"

const loginBtn = document.getElementById("loginBtn")
const dashboard = document.getElementById("dashboard")
const loginSection = document.getElementById("loginSection")

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    loginSection.style.display = "none"
    dashboard.style.display = "block"
    loadData("today")
  }
})

window.loadData = async (range) => {
  let startDate = new Date()

  if (range === "today") startDate.setHours(0,0,0,0)
  if (range === "7") startDate.setDate(startDate.getDate() - 7)
  if (range === "30") startDate.setDate(startDate.getDate() - 30)
  if (range === "month") startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
  if (range === "year") startDate = new Date(startDate.getFullYear(), 0, 1)

  const { data, error } = await supabase
    .from("sales")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    alert(error.message)
    return
  }

  let totalRevenue = 0
  document.getElementById("salesTable").innerHTML = ""

  for (const sale of data) {
    totalRevenue += Number(sale.amount_paid)

    const { data: urlData } = await supabase
      .storage
      .from("receipts")
      .createSignedUrl(sale.receipt_path, 60)

    document.getElementById("salesTable").innerHTML += `
      <tr>
        <td>${sale.full_name}</td>
        <td>${sale.email}</td>
        <td>${sale.plan}</td>
        <td>$${sale.amount_paid}</td>
        <td>${new Date(sale.created_at).toLocaleDateString()}</td>
        <td><a href="${urlData?.signedUrl}" target="_blank">View</a></td>
      </tr>
    `
  }

  document.getElementById("totalSales").textContent = data.length
  document.getElementById("totalRevenue").textContent = totalRevenue.toFixed(2)
}
