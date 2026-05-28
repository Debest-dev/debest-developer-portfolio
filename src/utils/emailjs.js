export const sendEmail = async (formData) => {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: "963b401a-03ab-40e0-83df-aaf626119a87", // paste key here
      name: formData.name,
      email: formData.email,
      subject: `Contact Us: ${formData.projectType}`,
      projectType: formData.projectType,
      budget: formData.budget,
      message: formData.message,
    }),
  });

  const result = await response.json();

  if (result.success) {
    return { status: 200 };
  } else {
    throw new Error(result.message || "Submission failed");
  }
};