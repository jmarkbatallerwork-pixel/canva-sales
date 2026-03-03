import { supabase } from "./supabaseClient.js"

const form = document.getElementById("saleForm")
const message = document.getElementById("message")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const full_name = document.getElementById("full_name").value
  const email = document.getElementById("email").value
  const plan = document.getElementById("plan").value
  const amount_paid = document.getElementById("amount_paid").value
  const file = document.getElementById("receipt").files[0]

  try {
    const filePath = `${Date.now()}_${file.name}`

    const { error: uploadError } = await supabase
      .storage
      .from("receipts")
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { error: insertError } = await supabase
      .from("sales")
      .insert([{
        full_name,
        email,
        plan,
        amount_paid,
        receipt_path: filePath
      }])

    if (insertError) throw insertError

    message.textContent = "Submission successful!"
    form.reset()

  } catch (err) {
    message.textContent = "Error: " + err.message
  }
})
